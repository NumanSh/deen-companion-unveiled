import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, MapPin, RefreshCw, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QiblaCompass: React.FC = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [userHeading, setUserHeading] = useState<number>(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { toast } = useToast();

  // Kaaba coordinates
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  const calculateQiblaDirection = (lat: number, lng: number): number => {
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
    const kaabaLngRad = (KAABA_LNG * Math.PI) / 180;

    const dLng = kaabaLngRad - lngRad;

    const y = Math.sin(dLng) * Math.cos(kaabaLatRad);
    const x = Math.cos(latRad) * Math.sin(kaabaLatRad) - 
              Math.sin(latRad) * Math.cos(kaabaLatRad) * Math.cos(dLng);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    return (bearing + 360) % 360;
  };

  const requestLocationAndCompass = async () => {
    setIsCalibrating(true);
    
    try {
      // Request location
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported');
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          const qibla = calculateQiblaDirection(latitude, longitude);
          setQiblaDirection(qibla);
          
          toast({
            title: "Location Found",
            description: `Qibla direction calculated for your location.`,
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          });
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );

      // Request device orientation
      if ('DeviceOrientationEvent' in window) {
        const permission = await (navigator as any).permissions?.query({ name: 'gyroscope' });
        if (permission?.state === 'granted' || !permission) {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
        }
      }
    } catch (error) {
      toast({
        title: "Compass Error",
        description: "Unable to access device compass. Using manual direction.",
        variant: "destructive",
      });
    } finally {
      setIsCalibrating(false);
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setUserHeading(360 - event.alpha);
    }
  };

  const getDirectionText = (angle: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(angle / 45) % 8;
    return directions[index];
  };

  const qiblaOffset = qiblaDirection !== null ? (qiblaDirection - userHeading + 360) % 360 : 0;
  const isAligned = Math.abs(qiblaOffset) < 10 || Math.abs(qiblaOffset - 360) < 10;

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-teal-600" />
          Qibla Compass
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Compass Display */}
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            {/* Compass Circle */}
            <div className="absolute inset-0 rounded-full border-4 border-teal-200 dark:border-teal-700 bg-white dark:bg-gray-800">
              {/* Direction markers */}
              <div className="absolute inset-2 rounded-full border border-gray-300 dark:border-gray-600">
                {/* North marker */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs font-bold text-red-600">
                  N
                </div>
                {/* Other direction markers */}
                <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 text-xs text-gray-500">E</div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 text-xs text-gray-500">S</div>
                <div className="absolute top-1/2 left-0 transform -translate-x-1 -translate-y-1/2 text-xs text-gray-500">W</div>
              </div>

              {/* User heading indicator */}
              <div 
                className="absolute top-1/2 left-1/2 w-1 h-20 bg-blue-500 origin-bottom transform -translate-x-1/2 -translate-y-full transition-transform duration-300"
                style={{ transform: `translate(-50%, -100%) rotate(${userHeading}deg)` }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <Navigation className="w-4 h-4 text-blue-600" />
                </div>
              </div>

              {/* Qibla direction indicator */}
              {qiblaDirection !== null && (
                <div 
                  className={`absolute top-1/2 left-1/2 w-2 h-24 origin-bottom transform -translate-x-1/2 -translate-y-full transition-all duration-500 ${
                    isAligned ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                  style={{ transform: `translate(-50%, -100%) rotate(${qiblaDirection}deg)` }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      isAligned ? 'bg-green-500' : 'bg-orange-500'
                    }`}>
                      🕋
                    </div>
                  </div>
                </div>
              )}

              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Status Display */}
        <div className="text-center space-y-2">
          {qiblaDirection !== null ? (
            <div className={`text-lg font-semibold ${isAligned ? 'text-green-600' : 'text-orange-600'}`}>
              {isAligned ? '🎯 Aligned with Qibla!' : '🧭 Turn to align with Qibla'}
            </div>
          ) : (
            <div className="text-gray-600 dark:text-gray-400">
              Press "Find Qibla" to get direction
            </div>
          )}
          
          <div className="text-sm space-y-1">
            {location && (
              <div className="text-gray-600 dark:text-gray-400">
                📍 Location: {location.lat.toFixed(2)}, {location.lng.toFixed(2)}
              </div>
            )}
            {qiblaDirection !== null && (
              <div className="text-gray-600 dark:text-gray-400">
                🧭 Qibla: {qiblaDirection.toFixed(1)}° ({getDirectionText(qiblaDirection)})
              </div>
            )}
            <div className="text-gray-600 dark:text-gray-400">
              📱 Device: {userHeading.toFixed(1)}° ({getDirectionText(userHeading)})
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={requestLocationAndCompass}
            disabled={isCalibrating}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {isCalibrating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4 mr-2" />
            )}
            {isCalibrating ? 'Finding...' : 'Find Qibla'}
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-xs text-gray-600 dark:text-gray-400 text-center space-y-1">
          <p>🔄 Hold your device flat and rotate until the Qibla indicator aligns</p>
          <p>📱 Allow location and motion permissions for accurate direction</p>
          <p>🧭 The green indicator shows when you're facing the correct direction</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QiblaCompass;
