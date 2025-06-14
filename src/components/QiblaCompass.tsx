
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

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

function useUserLocation() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        // fallback: fetch IP-based location
        fetch("https://ipapi.co/json/")
          .then(res => res.json())
          .then(data => setLocation({ lat: data.latitude, lon: data.longitude }))
          .catch(() => setError("Could not detect location"));
      }
    );
  }, []);

  return { location, error };
}

const QiblaCompass: React.FC = () => {
  const { orientation, isSupported } = useDeviceOrientation();
  const { location: userLocation, error } = useUserLocation();
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);

  useEffect(() => {
    if (userLocation) {
      const direction = calculateQiblaDirection(userLocation.lat, userLocation.lon);
      setQiblaDirection(direction);
    }
  }, [userLocation]);

  if (!userLocation) {
    return (
      <Card className="relative backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-emerald-200 dark:border-emerald-800 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border-b border-emerald-100 dark:border-emerald-800">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="relative">
              <Navigation className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
            </div>
            <span className="bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
              Qibla Direction
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              {error ? error : "Loading location..."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate the arrow rotation (Qibla direction relative to device orientation)
  const arrowRotation = isSupported ? qiblaDirection - orientation : qiblaDirection;

  return (
    <Card className="relative backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-emerald-200 dark:border-emerald-800 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border-b border-emerald-100 dark:border-emerald-800">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-2xl">
            <div className="relative">
              <Navigation className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
            </div>
            <span className="bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
              Qibla Direction
            </span>
          </div>
          <div className="text-sm font-normal text-emerald-700 dark:text-emerald-300">
            {Math.round(qiblaDirection)}°
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Compass Circle */}
          <div className="relative w-48 h-48 rounded-full border-4 border-emerald-200 dark:border-emerald-700 bg-gradient-to-br from-emerald-50 to-blue-100 dark:from-emerald-900/20 dark:to-blue-900/20">
            {/* Cardinal directions */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute -top-6 text-sm font-semibold text-emerald-800 dark:text-emerald-200">N</div>
              <div className="absolute -right-6 text-sm font-semibold text-emerald-800 dark:text-emerald-200">E</div>
              <div className="absolute -bottom-6 text-sm font-semibold text-emerald-800 dark:text-emerald-200">S</div>
              <div className="absolute -left-6 text-sm font-semibold text-emerald-800 dark:text-emerald-200">W</div>
            </div>
            
            {/* Qibla Arrow */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${arrowRotation}deg)` }}
            >
              <div className="w-1 h-20 bg-emerald-600 dark:bg-emerald-400 rounded-full relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-emerald-600 dark:border-b-emerald-400"></div>
              </div>
            </div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
            </div>
          </div>

          {/* Information */}
          <div className="text-center space-y-2">
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
              {isSupported ? 'Point your device towards the arrow' : 'Arrow points towards Mecca'}
            </p>
            {!isSupported && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
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
