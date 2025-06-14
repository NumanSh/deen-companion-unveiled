
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, MapPin } from 'lucide-react';

interface QiblaCompassProps {
  userLocation: { lat: number; lon: number } | null;
}

// Mecca coordinates
const MECCA_LAT = 21.4225;
const MECCA_LON = 39.8262;

function calculateQiblaDirection(userLat: number, userLon: number): number {
  // Convert degrees to radians
  const userLatRad = (userLat * Math.PI) / 180;
  const userLonRad = (userLon * Math.PI) / 180;
  const meccaLatRad = (MECCA_LAT * Math.PI) / 180;
  const meccaLonRad = (MECCA_LON * Math.PI) / 180;

  // Calculate the difference in longitude
  const deltaLon = meccaLonRad - userLonRad;

  // Calculate the bearing using the formula
  const y = Math.sin(deltaLon) * Math.cos(meccaLatRad);
  const x = Math.cos(userLatRad) * Math.sin(meccaLatRad) - 
            Math.sin(userLatRad) * Math.cos(meccaLatRad) * Math.cos(deltaLon);

  let bearing = Math.atan2(y, x);
  
  // Convert from radians to degrees
  bearing = (bearing * 180) / Math.PI;
  
  // Normalize to 0-360 degrees
  bearing = (bearing + 360) % 360;
  
  return bearing;
}

function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<number>(0);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    if ('DeviceOrientationEvent' in window) {
      setIsSupported(true);
      
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setOrientation(360 - event.alpha); // Reverse for correct compass direction
        }
      };

      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);

  return { orientation, isSupported };
}

const QiblaCompass: React.FC<QiblaCompassProps> = ({ userLocation }) => {
  const { orientation, isSupported } = useDeviceOrientation();
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);

  useEffect(() => {
    if (userLocation) {
      const direction = calculateQiblaDirection(userLocation.lat, userLocation.lon);
      setQiblaDirection(direction);
    }
  }, [userLocation]);

  if (!userLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Qibla Direction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              Location access needed to show Qibla direction
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate the arrow rotation (Qibla direction relative to device orientation)
  const arrowRotation = isSupported ? qiblaDirection - orientation : qiblaDirection;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Qibla Direction
          </div>
          <div className="text-sm font-normal text-muted-foreground">
            {Math.round(qiblaDirection)}°
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {/* Compass Circle */}
          <div className="relative w-48 h-48 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700">
            {/* Cardinal directions */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute -top-6 text-sm font-semibold text-green-800 dark:text-green-200">N</div>
              <div className="absolute -right-6 text-sm font-semibold text-green-800 dark:text-green-200">E</div>
              <div className="absolute -bottom-6 text-sm font-semibold text-green-800 dark:text-green-200">S</div>
              <div className="absolute -left-6 text-sm font-semibold text-green-800 dark:text-green-200">W</div>
            </div>
            
            {/* Qibla Arrow */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${arrowRotation}deg)` }}
            >
              <div className="w-1 h-20 bg-green-600 dark:bg-green-400 rounded-full relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-green-600 dark:border-b-green-400"></div>
              </div>
            </div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 dark:bg-green-400 rounded-full"></div>
            </div>
          </div>

          {/* Information */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {isSupported ? 'Point your device towards the arrow' : 'Arrow points towards Mecca'}
            </p>
            {!isSupported && (
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Device orientation not supported. Compass shows fixed direction.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QiblaCompass;
