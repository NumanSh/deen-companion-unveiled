
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin, Loader2 } from 'lucide-react';
import { prayerTimesApi } from '@/services/prayerTimesApi';
import { useToast } from '@/hooks/use-toast';

interface QiblaCompassProps {
  latitude?: number;
  longitude?: number;
}

const QiblaCompass: React.FC<QiblaCompassProps> = ({ latitude, longitude }) => {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    latitude && longitude ? { lat: latitude, lng: longitude } : null
  );
  const { toast } = useToast();

  const getLocation = async () => {
    setIsLoading(true);
    try {
      const coords = await prayerTimesApi.getCurrentLocation();
      setLocation({ lat: coords.latitude, lng: coords.longitude });
      await fetchQiblaDirection(coords.latitude, coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: 'Location Error',
        description: 'Could not get your location. Please enable location services.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQiblaDirection = async (lat: number, lng: number) => {
    try {
      const response = await prayerTimesApi.getQiblaDirection(lat, lng);
      setQiblaDirection(response.data.direction);
    } catch (error) {
      console.error('Error fetching Qibla direction:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch Qibla direction',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    if (location) {
      fetchQiblaDirection(location.lat, location.lng);
    }
  }, [location]);

  useEffect(() => {
    // Listen for device orientation changes
    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setDeviceHeading(360 - event.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientationChange);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange);
    };
  }, []);

  const qiblaAngle = qiblaDirection !== null ? qiblaDirection - deviceHeading : 0;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-green-600" />
          Qibla Compass
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          {!location && (
            <Button 
              onClick={getLocation} 
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 mr-2" />
              )}
              Get Location
            </Button>
          )}

          {location && qiblaDirection !== null && (
            <div className="relative w-64 h-64">
              {/* Compass Background */}
              <div className="absolute inset-0 rounded-full border-4 border-green-200 dark:border-green-700 bg-white dark:bg-gray-800">
                {/* Compass Rose */}
                <div className="absolute inset-4 rounded-full border-2 border-green-100 dark:border-green-800">
                  {/* Cardinal directions */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-800 dark:text-green-200">
                    N
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-800 dark:text-green-200">
                    S
                  </div>
                  <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xs font-bold text-green-800 dark:text-green-200">
                    W
                  </div>
                  <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-bold text-green-800 dark:text-green-200">
                    E
                  </div>
                </div>

                {/* Qibla Direction Arrow */}
                <div 
                  className="absolute top-1/2 left-1/2 w-1 h-20 bg-green-600 origin-bottom"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${qiblaAngle}deg)`,
                    transformOrigin: 'bottom center'
                  }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-green-600"></div>
                </div>

                {/* Kaaba Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-600 rounded-sm"></div>
              </div>
            </div>
          )}

          {qiblaDirection !== null && (
            <div className="text-center space-y-2">
              <p className="text-sm text-green-700 dark:text-green-300">
                Qibla Direction: <span className="font-bold">{Math.round(qiblaDirection)}°</span>
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Face towards the arrow for prayer direction
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QiblaCompass;
