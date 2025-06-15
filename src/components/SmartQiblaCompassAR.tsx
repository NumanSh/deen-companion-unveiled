
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Camera,
  Smartphone,
  Globe,
  Target,
  Crosshair,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SmartQiblaCompassAR = () => {
  const { toast } = useToast();
  const [direction, setDirection] = useState(67); // Example: Mecca direction
  const [accuracy, setAccuracy] = useState(95);
  const [location, setLocation] = useState('Riyadh, Saudi Arabia');
  const [distance, setDistance] = useState('874 km to Mecca');
  const [isARMode, setIsARMode] = useState(false);
  const [deviceHeading, setDeviceHeading] = useState(0);

  useEffect(() => {
    // Simulate compass movement
    const interval = setInterval(() => {
      setDeviceHeading(prev => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleARToggle = () => {
    setIsARMode(!isARMode);
    toast({
      title: isARMode ? 'AR Mode Disabled' : 'AR Mode Enabled',
      description: isARMode ? 'Switched to traditional compass' : 'Point camera towards Qibla direction',
      duration: 2000,
    });
  };

  const handleCalibrate = () => {
    toast({
      title: 'Compass Calibrated',
      description: 'Move your device in a figure-8 pattern to improve accuracy',
      duration: 3000,
    });
    setAccuracy(98);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Smart Qibla Compass</h2>
                <p className="text-green-200">AR-Enhanced Direction Finding</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{direction}°</div>
              <div className="text-green-200">to Mecca</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compass Display */}
      <Card>
        <CardContent className="p-6">
          <div className="relative w-80 h-80 mx-auto">
            {/* Compass Circle */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-300 bg-gradient-to-br from-blue-50 to-indigo-100">
              {/* Direction Markers */}
              {['N', 'E', 'S', 'W'].map((dir, index) => (
                <div
                  key={dir}
                  className="absolute w-8 h-8 flex items-center justify-center font-bold text-gray-700"
                  style={{
                    top: index === 0 ? '5px' : index === 2 ? 'calc(100% - 37px)' : '50%',
                    left: index === 3 ? '5px' : index === 1 ? 'calc(100% - 37px)' : '50%',
                    transform: index % 2 === 0 ? 'translateX(-50%)' : 'translateY(-50%)'
                  }}
                >
                  {dir}
                </div>
              ))}
              
              {/* Qibla Direction Arrow */}
              <div
                className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-green-600 to-green-400 origin-bottom transform -translate-x-1/2"
                style={{
                  transform: `translate(-50%, -100%) rotate(${direction}deg)`,
                  transformOrigin: 'bottom center'
                }}
              >
                <div className="absolute -top-2 -left-2 w-5 h-5">
                  <Navigation className="w-5 h-5 text-green-600" />
                </div>
              </div>

              {/* Device Heading Indicator */}
              <div
                className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-red-500 origin-bottom transform -translate-x-1/2"
                style={{
                  transform: `translate(-50%, -100%) rotate(${deviceHeading}deg)`,
                  transformOrigin: 'bottom center'
                }}
              />

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Status Info */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-sm text-gray-600">Accuracy</div>
              <div className="font-bold text-green-600">{accuracy}%</div>
            </div>
            <div className="text-center">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-sm text-gray-600">Location</div>
              <div className="font-bold text-blue-600 text-xs">{location.split(',')[0]}</div>
            </div>
            <div className="text-center">
              <Globe className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-sm text-gray-600">Distance</div>
              <div className="font-bold text-purple-600 text-xs">{distance}</div>
            </div>
            <div className="text-center">
              <Crosshair className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-sm text-gray-600">Bearing</div>
              <div className="font-bold text-orange-600">{direction}°</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <Button
              onClick={handleARToggle}
              className={`w-full h-16 ${isARMode ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              <div className="flex items-center gap-3">
                {isARMode ? <Smartphone className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
                <div>
                  <div className="font-semibold">{isARMode ? 'Exit AR Mode' : 'Enable AR Mode'}</div>
                  <div className="text-sm opacity-80">
                    {isARMode ? 'Switch to compass view' : 'Use camera overlay'}
                  </div>
                </div>
              </div>
              {!isARMode && <Badge className="ml-2 bg-amber-100 text-amber-800">New</Badge>}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <Button
              onClick={handleCalibrate}
              className="w-full h-16 bg-green-600 hover:bg-green-700"
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Calibrate Compass</div>
                  <div className="text-sm opacity-80">Improve accuracy</div>
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Prayer Time Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-600" />
            Prayer Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-indigo-800">Next Prayer: Maghrib</div>
                <div className="text-sm text-indigo-600">Recommended to face Qibla now</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-800">18:45</div>
                <div className="text-sm text-indigo-600">in 2h 30m</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartQiblaCompassAR;
