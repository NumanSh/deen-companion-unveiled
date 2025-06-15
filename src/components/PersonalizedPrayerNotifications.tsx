import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  Settings, 
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
  Play
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { prayerNotificationService, NotificationSettings, PrayerNotificationConfig } from '@/services/prayerNotificationService';
import { locationService, LocationData } from '@/services/locationService';

const PersonalizedPrayerNotifications = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<PrayerNotificationConfig | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<{
    notification: string;
    location: string;
  }>({
    notification: 'default',
    location: 'prompt'
  });

  const prayerNames = {
    fajr: { display: 'Fajr - الفجر', emoji: '🌅' },
    dhuhr: { display: 'Dhuhr - الظهر', emoji: '☀️' },
    asr: { display: 'Asr - العصر', emoji: '🌇' },
    maghrib: { display: 'Maghrib - المغرب', emoji: '🌆' },
    isha: { display: 'Isha - العشاء', emoji: '🌙' }
  };

  useEffect(() => {
    initializeService();
  }, []);

  const initializeService = async () => {
    try {
      setIsLoading(true);
      
      // Initialize services
      await prayerNotificationService.initialize();
      
      // Get current config
      const currentConfig = prayerNotificationService.getNotificationConfig();
      setConfig(currentConfig);

      // Check permissions
      await checkPermissions();

      // Get location
      try {
        const currentLocation = await locationService.getCurrentLocation();
        setLocation(currentLocation);
      } catch (error) {
        console.error('Location error:', error);
        toast({
          title: 'Location Access',
          description: 'Unable to get location. Please enable location access for accurate prayer times.',
          variant: 'destructive'
        });
      }

    } catch (error) {
      console.error('Initialization error:', error);
      toast({
        title: 'Initialization Error',
        description: 'Failed to initialize notification service.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkPermissions = async () => {
    // Check notification permission
    const notificationPermission = 'Notification' in window ? Notification.permission : 'denied';
    
    // Check location permission
    const locationPermission = await locationService.checkLocationPermission();
    
    setPermissionStatus({
      notification: notificationPermission,
      location: locationPermission.granted ? 'granted' : 
                locationPermission.denied ? 'denied' : 'prompt'
    });
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast({
        title: 'Not Supported',
        description: 'Notifications are not supported in this browser.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(prev => ({ ...prev, notification: permission }));
      
      if (permission === 'granted') {
        toast({
          title: 'Permission Granted',
          description: 'You will now receive prayer time notifications.',
        });
      } else {
        toast({
          title: 'Permission Denied',
          description: 'You can enable notifications in your browser settings.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const currentLocation = await locationService.getCurrentLocation();
      setLocation(currentLocation);
      setPermissionStatus(prev => ({ ...prev, location: 'granted' }));
      
      toast({
        title: 'Location Updated',
        description: `Location set to ${currentLocation.city}, ${currentLocation.country}`,
      });
    } catch (error) {
      toast({
        title: 'Location Error',
        description: 'Unable to access location. Please check your browser settings.',
        variant: 'destructive'
      });
    }
  };

  const updatePrayerSettings = (prayer: keyof PrayerNotificationConfig, settings: Partial<NotificationSettings>) => {
    if (!config) return;

    const newConfig = {
      ...config,
      [prayer]: { ...config[prayer], ...settings }
    };
    
    setConfig(newConfig);
    prayerNotificationService.updatePrayerSettings(prayer, settings);
    
    toast({
      title: 'Settings Updated',
      description: `${prayerNames[prayer].display} notification settings saved.`,
    });
  };

  const testNotification = async (prayer: keyof PrayerNotificationConfig) => {
    try {
      await prayerNotificationService.testNotification(prayer);
      toast({
        title: 'Test Notification Sent',
        description: `Check your notifications for ${prayerNames[prayer].display}`,
      });
    } catch (error) {
      toast({
        title: 'Test Failed',
        description: 'Unable to send test notification. Please check permissions.',
        variant: 'destructive'
      });
    }
  };

  const getPermissionIcon = (status: string) => {
    switch (status) {
      case 'granted': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'denied': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  if (isLoading || !config) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            Personalized Prayer Notifications
          </CardTitle>
          <p className="text-sm text-gray-600">
            Get customized prayer time reminders based on your location and preferences
          </p>
        </CardHeader>
      </Card>

      {/* Permissions Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Permissions & Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Notification Permission */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getPermissionIcon(permissionStatus.notification)}
                  <span className="font-medium">Notifications</span>
                </div>
                <Badge variant={permissionStatus.notification === 'granted' ? 'default' : 'destructive'}>
                  {permissionStatus.notification}
                </Badge>
              </div>
              {permissionStatus.notification !== 'granted' && (
                <Button size="sm" onClick={requestNotificationPermission}>
                  Enable Notifications
                </Button>
              )}
            </div>

            {/* Location Permission */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getPermissionIcon(permissionStatus.location)}
                  <span className="font-medium">Location</span>
                </div>
                <Badge variant={permissionStatus.location === 'granted' ? 'default' : 'destructive'}>
                  {permissionStatus.location}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {location ? `${location.city}, ${location.country}` : 'No location detected'}
              </div>
              {permissionStatus.location !== 'granted' && (
                <Button size="sm" onClick={requestLocationPermission}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Enable Location
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prayer Notification Settings */}
      <div className="space-y-4">
        {Object.entries(prayerNames).map(([prayer, info]) => {
          const settings = config[prayer as keyof PrayerNotificationConfig];
          
          return (
            <Card key={prayer}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{info.emoji}</span>
                    <span>{info.display}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.enabled}
                      onCheckedChange={(enabled) => 
                        updatePrayerSettings(prayer as keyof PrayerNotificationConfig, { enabled })
                      }
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => testNotification(prayer as keyof PrayerNotificationConfig)}
                      disabled={!settings.enabled || permissionStatus.notification !== 'granted'}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              {settings.enabled && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Reminder Time */}
                    <div>
                      <Label className="text-sm font-medium">Remind me before</Label>
                      <Select
                        value={settings.beforeMinutes.toString()}
                        onValueChange={(value) => 
                          updatePrayerSettings(prayer as keyof PrayerNotificationConfig, { 
                            beforeMinutes: parseInt(value) 
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">At prayer time</SelectItem>
                          <SelectItem value="5">5 minutes before</SelectItem>
                          <SelectItem value="10">10 minutes before</SelectItem>
                          <SelectItem value="15">15 minutes before</SelectItem>
                          <SelectItem value="30">30 minutes before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sound & Vibration */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {settings.soundEnabled ? 
                            <Volume2 className="w-4 h-4 text-green-600" /> : 
                            <VolumeX className="w-4 h-4 text-gray-400" />
                          }
                          <Label className="text-sm">Sound</Label>
                        </div>
                        <Switch
                          checked={settings.soundEnabled}
                          onCheckedChange={(soundEnabled) => 
                            updatePrayerSettings(prayer as keyof PrayerNotificationConfig, { soundEnabled })
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Vibrate className="w-4 h-4" />
                          <Label className="text-sm">Vibration</Label>
                        </div>
                        <Switch
                          checked={settings.vibrationEnabled}
                          onCheckedChange={(vibrationEnabled) => 
                            updatePrayerSettings(prayer as keyof PrayerNotificationConfig, { vibrationEnabled })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Message */}
                  <div>
                    <Label className="text-sm font-medium">Custom notification message (optional)</Label>
                    <Input
                      placeholder={`Time for ${info.display.split(' - ')[0]} prayer`}
                      value={settings.customMessage}
                      onChange={(e) => 
                        updatePrayerSettings(prayer as keyof PrayerNotificationConfig, { 
                          customMessage: e.target.value 
                        })
                      }
                      className="mt-2"
                    />
                  </div>

                  {/* Persistent Notification */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Persistent notification</Label>
                      <p className="text-xs text-gray-600">Keep notification until manually dismissed</p>
                    </div>
                    <Switch
                      checked={settings.persistentNotification}
                      onCheckedChange={(persistentNotification) => 
                        updatePrayerSettings(prayer as keyof PrayerNotificationConfig, { persistentNotification })
                      }
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalizedPrayerNotifications;
