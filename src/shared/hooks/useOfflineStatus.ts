import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OfflineStatusHook {
  isOnline: boolean;
  isOffline: boolean;
  wasOffline: boolean;
}

export const useOfflineStatus = (): OfflineStatusHook => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        toast({
          title: 'Connection Restored',
          description: 'You are back online. Content will sync automatically.',
          duration: 3000,
        });
        setWasOffline(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      toast({
        title: 'Connection Lost',
        description: 'You are offline. Some features may be limited.',
        variant: 'destructive',
        duration: 5000,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline, toast]);

  return {
    isOnline,
    isOffline: !isOnline,
    wasOffline
  };
};

// Enhanced offline storage for user preferences
export const useOfflinePreferences = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(`offline_pref_${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const updateValue = (newValue: T | ((prev: T) => T)) => {
    const updatedValue = typeof newValue === 'function' 
      ? (newValue as (prev: T) => T)(value)
      : newValue;
    
    setValue(updatedValue);
    
    try {
      localStorage.setItem(`offline_pref_${key}`, JSON.stringify(updatedValue));
    } catch (error) {
      console.error('Failed to save preference:', error);
    }
  };

  return [value, updateValue] as const;
};

// Prayer times offline calculation
export const useOfflinePrayerTimes = () => {
  const calculatePrayerTimes = (latitude: number, longitude: number, date: Date = new Date()) => {
    // Basic prayer time calculation using astronomical formulas
    // This is a simplified version - in production, you'd use a proper library like PrayTimes.js
    
    const julianDay = Math.floor((date.getTime() / 86400000) - (date.getTimezoneOffset() / 1440) + 2440588);
    const n = julianDay - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
    const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * Math.PI / 180;
    
    const alpha = Math.atan2(Math.cos(23.439 * Math.PI / 180) * Math.sin(lambda), Math.cos(lambda));
    const delta = Math.asin(Math.sin(23.439 * Math.PI / 180) * Math.sin(lambda));
    
    const latRad = latitude * Math.PI / 180;
    const timeCorrection = 4 * (lambda - 0.0057183 - alpha);
    
    // Approximate prayer times (this would need proper Islamic calculation methods)
    const sunrise = 6; // Simplified
    const maghrib = 18; // Simplified
    
    return {
      fajr: formatTime(sunrise - 1.5),
      sunrise: formatTime(sunrise),
      dhuhr: formatTime(12),
      asr: formatTime(15.5),
      maghrib: formatTime(maghrib),
      isha: formatTime(maghrib + 1.5)
    };
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return { calculatePrayerTimes };
};

// Service worker registration for better offline experience
export const useServiceWorker = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setIsSupported(true);
      
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          setIsRegistered(true);
          console.log('Service Worker registered:', registration);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  toast({
                    title: 'App Updated',
                    description: 'A new version is available. Refresh to update.',
                    duration: 10000,
                  });
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, [toast]);

  return { isSupported, isRegistered };
};