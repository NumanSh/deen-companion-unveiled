
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Loader2, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { prayerTimesApi, PrayerTimesResponse } from '@/features/prayer/services/prayerTimesApi';
import { useToast } from '@/hooks/use-toast';
import { ErrorBoundary, ApiErrorBoundary, EnhancedLoadingStates, OfflineIndicator } from '@/shared';
import { PrayerApiErrorHandler } from '@/shared';
import { useOfflineStatus, useOfflinePrayerTimes, useApiCache } from '@/shared';

interface PrayerTimesWidgetProps {
  showQibla?: boolean;
}

const PrayerTimesWidget: React.FC<PrayerTimesWidgetProps> = ({ showQibla = true }) => {
  const [prayerData, setPrayerData] = useState<PrayerTimesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
  const { toast } = useToast();
  const { isOffline } = useOfflineStatus();
  const { calculatePrayerTimes } = useOfflinePrayerTimes();
  const { getCachedData, setCachedData } = useApiCache();

  const prayerIcons = {
    Fajr: Moon,
    Sunrise: Sunrise,
    Dhuhr: Sun,
    Asr: Sun,
    Maghrib: Sunset,
    Isha: Moon
  };

  const getPrayerTimes = async () => {
    // Try cache first
    const cachedData = getCachedData('prayer-times');
    if (cachedData && !isOffline) {
      setPrayerData(cachedData);
      calculateNextPrayer(cachedData);
      return;
    }

    if (isOffline) {
      // Use offline calculation
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
          }
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const offlineTimes = await calculatePrayerTimes(position.coords);
        
        // Create a simplified mock response for offline times
        const offlineResponse = {
          data: {
            timings: {
              Fajr: offlineTimes.fajr,
              Sunrise: '06:00', // Add sunrise since it's missing
              Dhuhr: offlineTimes.dhuhr,
              Asr: offlineTimes.asr,
              Maghrib: offlineTimes.maghrib,
              Isha: offlineTimes.isha
            },
            date: {
              readable: new Date().toLocaleDateString(),
              hijri: {
                date: '1',
                month: { en: 'Muharram', ar: 'محرم' },
                year: '1446'
              }
            },
            meta: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              method: { id: 0, name: 'Offline Calculation' }
            }
          }
        } as PrayerTimesResponse;
        
        setPrayerData(offlineResponse);
        calculateNextPrayer(offlineResponse);
        
        toast({
          title: 'Offline Prayer Times',
          description: 'Using approximate prayer times (offline mode)',
          duration: 3000
        });
        
        return;
      } catch (error) {
        toast({
          title: 'Location Error',
          description: 'Cannot get location for offline prayer times',
          variant: 'destructive'
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      const coords = await PrayerApiErrorHandler.withRetry(
        () => prayerTimesApi.getCurrentLocation(),
        { maxRetries: 2 },
        (attempt, error) => {
          toast({
            title: 'Retrying Location',
            description: `Attempt ${attempt}: ${error.message}`,
            duration: 2000
          });
        }
      );
      
      const response = await PrayerApiErrorHandler.withRetry(
        () => prayerTimesApi.getPrayerTimes(coords.latitude, coords.longitude),
        { maxRetries: 3 },
        (attempt, error) => {
          toast({
            title: 'Retrying Prayer Times',
            description: `Attempt ${attempt}: ${error.message}`,
            duration: 2000
          });
        }
      );
      
      setPrayerData(response);
      setCachedData('prayer-times', response); // Cache the response
      calculateNextPrayer(response);
      
      toast({
        title: 'Prayer Times Updated',
        description: 'Got latest prayer times for your location',
      });
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      const apiError = PrayerApiErrorHandler.parseError(error);
      toast(PrayerApiErrorHandler.getErrorToast(apiError));
    } finally {
      setIsLoading(false);
    }
  };

  const calculateNextPrayer = (data: PrayerTimesResponse) => {
    const prayers = [
      { name: 'Fajr', time: data.data.timings.Fajr },
      { name: 'Dhuhr', time: data.data.timings.Dhuhr },
      { name: 'Asr', time: data.data.timings.Asr },
      { name: 'Maghrib', time: data.data.timings.Maghrib },
      { name: 'Isha', time: data.data.timings.Isha }
    ];

    const now = new Date();
    const today = now.toDateString();

    for (const prayer of prayers) {
      const prayerTime = new Date(`${today} ${prayer.time}`);
      if (prayerTime > now) {
        setNextPrayer(prayer);
        return;
      }
    }

    // If no prayer found for today, next prayer is Fajr tomorrow
    setNextPrayer({ name: 'Fajr', time: data.data.timings.Fajr });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getTimeUntilNext = () => {
    if (!nextPrayer) return '';
    
    const now = new Date();
    const today = now.toDateString();
    let prayerTime = new Date(`${today} ${nextPrayer.time}`);
    
    // If prayer time has passed today, it's tomorrow
    if (prayerTime <= now) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      prayerTime = new Date(`${tomorrow.toDateString()} ${nextPrayer.time}`);
    }
    
    const diff = prayerTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (prayerData) {
        calculateNextPrayer(prayerData);
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [prayerData]);

  return (
    <ErrorBoundary section="Prayer Times Widget">
      <ApiErrorBoundary 
        apiName="Prayer Times API" 
        fallbackData={prayerData}
        onRetry={getPrayerTimes}
      >
        {isOffline && (
          <OfflineIndicator 
            className="mb-4" 
            onRetry={getPrayerTimes}
          />
        )}
        
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Prayer Times
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={getPrayerTimes}
                disabled={isLoading}
                aria-label={isLoading ? 'Loading prayer times' : 'Refresh prayer times'}
                title={isLoading ? 'Loading prayer times' : 'Refresh prayer times'}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <EnhancedLoadingStates type="prayer-times" title="Loading prayer times..." />
            )}

            {!prayerData && !isLoading && (
              <div className="text-center py-4">
                <Button 
                  onClick={getPrayerTimes} 
                  className="bg-blue-600 hover:bg-blue-700"
                  aria-label="Get prayer times for your location"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Prayer Times
                </Button>
              </div>
            )}

            {nextPrayer && (
              <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg text-center">
                <p className="text-sm text-blue-700 dark:text-blue-300">Next Prayer</p>
                <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
                  {nextPrayer.name} - {formatTime(nextPrayer.time)}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  in {getTimeUntilNext()}
                </p>
              </div>
            )}

            {prayerData && !isLoading && (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {prayerData.data.date.readable}
                  {isOffline && (
                    <span className="block text-xs text-orange-600 dark:text-orange-400 mt-1">
                      (Approximate times - offline mode)
                    </span>
                  )}
                </div>
                
                {Object.entries(prayerData.data.timings)
                  .filter(([name]) => ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(name))
                  .map(([name, time]) => {
                    const Icon = prayerIcons[name as keyof typeof prayerIcons];
                    const isNext = nextPrayer?.name === name;
                    
                    return (
                      <div
                        key={name}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${
                          isNext 
                            ? 'bg-blue-200 dark:bg-blue-700' 
                            : 'bg-white dark:bg-gray-800'
                        }`}
                        tabIndex={0}
                        role="listitem"
                        aria-label={`${name} prayer at ${formatTime(time)}${isNext ? ' - next prayer' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon 
                            className={`w-5 h-5 ${isNext ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}
                            aria-hidden="true"
                          />
                          <span className={`font-medium ${isNext ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'}`}>
                            {name}
                          </span>
                        </div>
                        <span className={`font-mono ${isNext ? 'text-blue-800 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300'}`}>
                          {formatTime(time)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            )}

            {prayerData && (
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Location: {prayerData.data.meta.latitude.toFixed(2)}, {prayerData.data.meta.longitude.toFixed(2)}
              </div>
            )}
          </CardContent>
        </Card>
      </ApiErrorBoundary>
    </ErrorBoundary>
  );
};

export default PrayerTimesWidget;
