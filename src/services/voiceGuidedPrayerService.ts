
import { voiceReadingService } from './voiceReadingService';
import { prayerNotificationService } from './prayerNotificationService';

interface VoiceAnnouncementSettings {
  enabled: boolean;
  language: 'en' | 'ar';
  includeSupplication: boolean;
  reminderMinutes: number;
}

class VoiceGuidedPrayerService {
  private settings: VoiceAnnouncementSettings = {
    enabled: true,
    language: 'en',
    includeSupplication: true,
    reminderMinutes: 10
  };

  private prayerSupplications = {
    en: {
      fajr: "It's time for Fajr prayer. O Allah, bless us in the early morning hours.",
      dhuhr: "It's time for Dhuhr prayer. May Allah accept our prayers and guide us.",
      asr: "It's time for Asr prayer. Let us remember Allah in the afternoon.",
      maghrib: "It's time for Maghrib prayer. We thank Allah for this blessed day.",
      isha: "It's time for Isha prayer. May Allah grant us peaceful rest tonight."
    },
    ar: {
      fajr: "حان وقت صلاة الفجر. اللهم بارك لنا فيما رزقتنا",
      dhuhr: "حان وقت صلاة الظهر. ربنا تقبل منا إنك أنت السميع العليم", 
      asr: "حان وقت صلاة العصر. اللهم أعنا على ذكرك وشكرك وحسن عبادتك",
      maghrib: "حان وقت صلاة المغرب. الحمد لله رب العالمين",
      isha: "حان وقت صلاة العشاء. اللهم أنت ربي لا إله إلا أنت"
    }
  };

  private reminderMessages = {
    en: {
      reminder: "Prayer time is approaching in {minutes} minutes. Please prepare for prayer.",
      generic: "Time for prayer. May Allah accept your worship."
    },
    ar: {
      reminder: "موعد الصلاة خلال {minutes} دقائق. استعد للصلاة",
      generic: "حان وقت الصلاة. تقبل الله منكم"
    }
  };

  initialize() {
    // Listen for prayer notifications and add voice announcements
    this.setupPrayerVoiceNotifications();
  }

  private setupPrayerVoiceNotifications() {
    // Override the existing notification system to add voice
    const originalShowNotification = (prayerNotificationService as any).showNotification;
    
    if (originalShowNotification) {
      (prayerNotificationService as any).showNotification = (
        prayerName: string,
        type: 'reminder' | 'adhan',
        settings: any,
        location: any
      ) => {
        // Call original notification
        originalShowNotification.call(prayerNotificationService, prayerName, type, settings, location);
        
        // Add voice announcement
        if (this.settings.enabled) {
          this.announceWithVoice(prayerName, type);
        }
      };
    }
  }

  private announceWithVoice(prayerName: string, type: 'reminder' | 'adhan') {
    if (!this.settings.enabled) return;

    let message = '';
    const lang = this.settings.language;
    
    if (type === 'reminder') {
      message = this.reminderMessages[lang].reminder.replace(
        '{minutes}', 
        this.settings.reminderMinutes.toString()
      );
    } else {
      if (this.settings.includeSupplication && this.prayerSupplications[lang][prayerName as keyof typeof this.prayerSupplications.en]) {
        message = this.prayerSupplications[lang][prayerName as keyof typeof this.prayerSupplications.en];
      } else {
        message = `${this.reminderMessages[lang].generic} ${prayerName}`;
      }
    }

    // Use voice reading service to announce
    voiceReadingService.speak(message, {
      onStart: () => console.log('Voice prayer announcement started'),
      onEnd: () => console.log('Voice prayer announcement completed')
    });
  }

  updateSettings(newSettings: Partial<VoiceAnnouncementSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem('voice-prayer-settings', JSON.stringify(this.settings));
  }

  getSettings(): VoiceAnnouncementSettings {
    const saved = localStorage.getItem('voice-prayer-settings');
    if (saved) {
      try {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      } catch (error) {
        console.error('Error loading voice prayer settings:', error);
      }
    }
    return this.settings;
  }

  testAnnouncement(prayerName: string) {
    this.announceWithVoice(prayerName, 'adhan');
  }

  announceCustomMessage(message: string) {
    if (this.settings.enabled) {
      voiceReadingService.speak(message);
    }
  }
}

export const voiceGuidedPrayerService = new VoiceGuidedPrayerService();
export type { VoiceAnnouncementSettings };
