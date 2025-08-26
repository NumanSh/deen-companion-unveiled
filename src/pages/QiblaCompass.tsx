import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin, Compass, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QiblaCompass: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          calculateQiblaDirection(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: 'Location Error',
            description: 'Unable to get your location. Please enable GPS.',
            variant: 'destructive',
          });
          setLoading(false);
        }
      );
    } else {
      toast({
        title: 'GPS Not Supported',
        description: 'Your device does not support GPS.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const calculateQiblaDirection = (lat: number, lng: number) => {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;

    const dLng = ((kaabaLng - lng) * Math.PI) / 180;
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (kaabaLat * Math.PI) / 180;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let qibla = (Math.atan2(y, x) * 180) / Math.PI;
    qibla = (qibla + 360) % 360;

    setQiblaDirection(qibla);
  };

  useEffect(() => {
    // Try to get device orientation
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setDeviceHeading(360 - event.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);

  const compassRotation = qiblaDirection - deviceHeading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Compass className="w-8 h-8" />
              Qibla Compass
            </CardTitle>
            <p className="text-green-100">Find the direction to Mecca</p>
          </CardHeader>
        </Card>

        {/* Location Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Your Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            {location ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Latitude: {location.lat.toFixed(6)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Longitude: {location.lng.toFixed(6)}
                </p>
                <p className="text-lg font-semibold text-green-600">
                  Qibla Direction: {qiblaDirection.toFixed(1)}°
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">Location not detected</p>
            )}
            <Button 
              onClick={getLocation} 
              disabled={loading}
              className="w-full mt-4"
            >
              {loading ? 'Getting Location...' : 'Get My Location'}
            </Button>
          </CardContent>
        </Card>

        {/* Compass */}
        <Card className="p-8">
          <div className="relative flex items-center justify-center">
            {/* Compass Background */}
            <div className="w-64 h-64 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-4 border-gray-300 dark:border-gray-600 relative">
              {/* Direction Markers */}
              <div className="absolute inset-2 rounded-full border border-gray-400 dark:border-gray-500">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg font-bold">N</div>
                <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-lg font-bold">E</div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-lg font-bold">S</div>
                <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-lg font-bold">W</div>
              </div>

              {/* Qibla Needle */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `rotate(${compassRotation}deg)` }}
              >
                <div className="w-1 h-24 bg-gradient-to-t from-green-600 to-green-400 rounded-full shadow-lg">
                  <div className="w-4 h-4 bg-green-600 rounded-full -mt-2 -ml-1.5 shadow-md"></div>
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          {location && (
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground mb-2">
                Point your device towards the green needle
              </p>
              <div className="flex items-center justify-center gap-2 text-lg font-semibold text-green-600">
                <Navigation className="w-5 h-5" />
                Qibla Direction: {qiblaDirection.toFixed(1)}°
              </div>
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              How to Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>1. Allow location access when prompted</p>
            <p>2. Hold your device flat (parallel to ground)</p>
            <p>3. Rotate until the green needle points up</p>
            <p>4. You are now facing Qibla direction</p>
            <p className="text-xs text-muted-foreground mt-4">
              Note: For best accuracy, calibrate your device's compass and ensure you're away from magnetic interference.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QiblaCompass;