
import { prayerTimesApi } from './prayerTimesApi';
import { locationService, LocationData } from './locationService';

interface NotificationSettings {
  enabled: boolean;
  beforeMinutes: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  persistentNotification: boolean;
  customMessage: string;
}

interface PrayerNotificationConfig {
  fajr: NotificationSettings;
  dhuhr: NotificationSettings;
  asr: NotificationSettings;
  maghrib: NotificationSettings;
  isha: NotificationSettings;
}

interface ScheduledNotification {
  id: string;
  prayerName: string;
  scheduledTime: Date;
  type: 'reminder' | 'adhan';
  timeoutId: number;
}

class PrayerNotificationService {
  private storageKey = 'prayer-notification-settings';
  private scheduledNotifications: Map<string, ScheduledNotification> = new Map();
  private isInitialized = false;

  private defaultSettings: NotificationSettings = {
    enabled: true,
    beforeMinutes: 10,
    soundEnabled: true,
    vibrationEnabled: true,
    persistentNotification: false,
    customMessage: ''
  };

  private defaultConfig: PrayerNotificationConfig = {
    fajr: { ...this.defaultSettings, beforeMinutes: 15 },
    dhuhr: { ...this.defaultSettings, beforeMinutes: 10 },
    asr: { ...this.defaultSettings, beforeMinutes: 10 },
    maghrib: { ...this.defaultSettings, beforeMinutes: 15 },
    isha: { ...this.defaultSettings, beforeMinutes: 10 }
  };

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }

      // Subscribe to location updates
      locationService.subscribeToLocationUpdates((location) => {
        this.updatePrayerSchedule(location);
      });

      this.isInitialized = true;
      console.log('Prayer notification service initialized');
    } catch (error) {
      console.error('Failed to initialize prayer notification service:', error);
    }
  }

  getNotificationConfig(): PrayerNotificationConfig {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        return { ...this.defaultConfig, ...JSON.parse(stored) };
      } catch (error) {
        console.error('Error parsing notification config:', error);
      }
    }
    return this.defaultConfig;
  }

  updateNotificationConfig(config: Partial<PrayerNotificationConfig>): void {
    const currentConfig = this.getNotificationConfig();
    const newConfig = { ...currentConfig, ...config };
    localStorage.setItem(this.storageKey, JSON.stringify(newConfig));
    
    // Reschedule notifications with new config
    this.rescheduleAllNotifications();
  }

  updatePrayerSettings(prayer: keyof PrayerNotificationConfig, settings: Partial<NotificationSettings>): void {
    const config = this.getNotificationConfig();
    config[prayer] = { ...config[prayer], ...settings };
    this.updateNotificationConfig({ [prayer]: config[prayer] });
  }

  private async updatePrayerSchedule(location: LocationData): Promise<void> {
    try {
      const prayerData = await prayerTimesApi.getPrayerTimes(location.latitude, location.longitude);
      const config = this.getNotificationConfig();

      // Clear existing notifications
      this.clearAllNotifications();

      // Schedule new notifications
      const prayers: (keyof PrayerNotificationConfig)[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
      
      prayers.forEach(prayerName => {
        const prayerTime = prayerData.data.timings[prayerName.charAt(0).toUpperCase() + prayerName.slice(1) as keyof typeof prayerData.data.timings];
        const settings = config[prayerName];
        
        if (settings.enabled && prayerTime) {
          this.schedulePrayerNotifications(prayerName, prayerTime, settings, location);
        }
      });

    } catch (error) {
      console.error('Error updating prayer schedule:', error);
    }
  }

  private schedulePrayerNotifications(
    prayerName: keyof PrayerNotificationConfig, 
    prayerTime: string, 
    settings: NotificationSettings,
    location: LocationData
  ): void {
    const [hours, minutes] = prayerTime.split(':').map(Number);
    const now = new Date();
    const prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    // If prayer time has passed today, schedule for tomorrow
    if (prayerDate <= now) {
      prayerDate.setDate(prayerDate.getDate() + 1);
    }

    // Schedule reminder notification
    if (settings.beforeMinutes > 0) {
      const reminderTime = new Date(prayerDate.getTime() - settings.beforeMinutes * 60000);
      if (reminderTime > now) {
        this.scheduleNotification(
          `${prayerName}-reminder`,
          prayerName,
          reminderTime,
          'reminder',
          settings,
          location
        );
      }
    }

    // Schedule adhan notification
    this.scheduleNotification(
      `${prayerName}-adhan`,
      prayerName,
      prayerDate,
      'adhan',
      settings,
      location
    );
  }

  private scheduleNotification(
    id: string,
    prayerName: keyof PrayerNotificationConfig,
    scheduledTime: Date,
    type: 'reminder' | 'adhan',
    settings: NotificationSettings,
    location: LocationData
  ): void {
    const delay = scheduledTime.getTime() - Date.now();
    
    if (delay <= 0) return; // Don't schedule past notifications

    const timeoutId = window.setTimeout(() => {
      this.showNotification(prayerName, type, settings, location);
      this.scheduledNotifications.delete(id);
    }, delay);

    this.scheduledNotifications.set(id, {
      id,
      prayerName,
      scheduledTime,
      type,
      timeoutId
    });
  }

  private showNotification(
    prayerName: keyof PrayerNotificationConfig,
    type: 'reminder' | 'adhan',
    settings: NotificationSettings,
    location: LocationData
  ): void {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const prayerDisplayName = prayerName.charAt(0).toUpperCase() + prayerName.slice(1);
    
    let title: string;
    let body: string;
    let icon = '/favicon.ico';

    if (type === 'reminder') {
      title = `🕐 Prayer Reminder`;
      body = settings.customMessage || 
             `${prayerDisplayName} prayer in ${settings.beforeMinutes} minutes in ${location.city}`;
    } else {
      title = `🕌 Prayer Time`;
      body = settings.customMessage || 
             `Time for ${prayerDisplayName} prayer in ${location.city}`;
    }

    const notification = new Notification(title, {
      body,
      icon,
      badge: icon,
      tag: `prayer-${prayerName}-${type}`,
      requireInteraction: settings.persistentNotification,
      silent: !settings.soundEnabled
    });

    // Vibration support
    if (settings.vibrationEnabled && 'navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate(type === 'adhan' ? [200, 100, 200] : [100, 50, 100]);
    }

    // Auto-close notification after 10 seconds if not persistent
    if (!settings.persistentNotification) {
      setTimeout(() => notification.close(), 10000);
    }

    console.log(`Prayer notification shown: ${title} - ${body}`);
  }

  private clearAllNotifications(): void {
    this.scheduledNotifications.forEach(notification => {
      clearTimeout(notification.timeoutId);
    });
    this.scheduledNotifications.clear();
  }

  private rescheduleAllNotifications(): void {
    locationService.getCurrentLocation().then(location => {
      this.updatePrayerSchedule(location);
    }).catch(error => {
      console.error('Error rescheduling notifications:', error);
    });
  }

  getScheduledNotifications(): ScheduledNotification[] {
    return Array.from(this.scheduledNotifications.values());
  }

  async testNotification(prayerName: keyof PrayerNotificationConfig): Promise<void> {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }

    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission denied');
      }
    }

    const location = await locationService.getCurrentLocation();
    const config = this.getNotificationConfig();
    const settings = config[prayerName];

    this.showNotification(prayerName, 'adhan', settings, location);
  }

  disable(): void {
    this.clearAllNotifications();
    const config = this.getNotificationConfig();
    Object.keys(config).forEach(prayer => {
      config[prayer as keyof PrayerNotificationConfig].enabled = false;
    });
    this.updateNotificationConfig(config);
  }

  enable(): void {
    const config = this.getNotificationConfig();
    Object.keys(config).forEach(prayer => {
      config[prayer as keyof PrayerNotificationConfig].enabled = true;
    });
    this.updateNotificationConfig(config);
  }
}

export const prayerNotificationService = new PrayerNotificationService();
export type { NotificationSettings, PrayerNotificationConfig, ScheduledNotification };
