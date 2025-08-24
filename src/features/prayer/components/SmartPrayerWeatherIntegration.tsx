import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Snowflake, 
  Wind,
  Clock,
  MapPin,
  Bell,
  Thermometer,
  Umbrella,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerTime {
  name: string;
  time: string;
  arabic: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
}

const SmartPrayerWeatherIntegration = () => {
  const { toast } = useToast();
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    temperature: 22,
    condition: 'clear',
    humidity: 65,
    windSpeed: 8,
    visibility: 10
  });

  const [prayerTimes] = useState<PrayerTime[]>([
    { name: 'Fajr', time: '05:24', arabic: 'الفجر' },
    { name: 'Sunrise', time: '06:42', arabic: 'الشروق' },
    { name: 'Dhuhr', time: '12:15', arabic: 'الظهر' },
    { name: 'Asr', time: '15:30', arabic: 'العصر' },
    { name: 'Maghrib', time: '18:45', arabic: 'المغرب' },
    { name: 'Isha', time: '20:15', arabic: 'العشاء' }
  ]);

  const [alerts, setAlerts] = useState<any[]>([]);
  const [location] = useState('Riyadh, Saudi Arabia');

  useEffect(() => {
    // Simulate weather-based prayer alerts
    const weatherAlerts = [];
    
    if (currentWeather.condition === 'rain') {
      weatherAlerts.push({
        id: 1,
        type: 'weather',
        title: 'Rain Alert',
        message: 'Consider taking an umbrella for Maghrib prayer',
        icon: Umbrella,
        priority: 'medium'
      });
    }
    
    if (currentWeather.temperature < 10) {
      weatherAlerts.push({
        id: 2,
        type: 'weather',
        title: 'Cold Weather',
        message: 'Dress warmly for Fajr prayer',
        icon: Thermometer,
        priority: 'low'
      });
    }

    if (currentWeather.windSpeed > 20) {
      weatherAlerts.push({
        id: 3,
        type: 'weather',
        title: 'High Winds',
        message: 'Strong winds may affect outdoor prayer',
        icon: Wind,
        priority: 'high'
      });
    }

    setAlerts(weatherAlerts);
  }, [currentWeather]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear': return Sun;
      case 'cloudy': return Cloud;
      case 'rain': return CloudRain;
      case 'snow': return Snowflake;
      default: return Sun;
    }
  };

  const getNextPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    for (const prayer of prayerTimes) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      
      if (prayerTime > currentTime) {
        return prayer;
      }
    }
    return prayerTimes[0]; // Return Fajr for next day
  };

  const nextPrayer = getNextPrayer();
  const WeatherIcon = getWeatherIcon(currentWeather.condition);

  const handleSetAlert = (prayer: PrayerTime) => {
    toast({
      title: `Alert Set for ${prayer.name}`,
      description: `You'll be notified 15 minutes before ${prayer.arabic} prayer`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Weather Overview */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <WeatherIcon className="w-16 h-16" />
              <div>
                <h2 className="text-3xl font-bold">{currentWeather.temperature}°C</h2>
                <p className="text-blue-100 capitalize">{currentWeather.condition}</p>
                <div className="flex items-center gap-1 text-sm text-blue-200">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-200">Next Prayer</div>
              <div className="text-2xl font-bold">{nextPrayer.arabic}</div>
              <div className="text-blue-200">{nextPrayer.time}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => {
              const AlertIcon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.priority === 'high' ? 'border-red-500 bg-red-50' :
                    alert.priority === 'medium' ? 'border-amber-500 bg-amber-50' :
                    'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <AlertIcon className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">{alert.title}</div>
                      <div className="text-sm text-gray-600">{alert.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Prayer Times with Weather Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Smart Prayer Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prayerTimes.map((prayer, index) => (
              <Card key={index} className={`transition-all duration-200 hover:shadow-md ${
                prayer.name === nextPrayer.name ? 'ring-2 ring-green-500 bg-green-50' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">{prayer.arabic}</div>
                      <div className="text-sm text-gray-600">{prayer.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{prayer.time}</div>
                      {prayer.name === nextPrayer.name && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Next</Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSetAlert(prayer)}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Set Alert
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Details */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Thermometer className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-sm text-gray-600">Temperature</div>
              <div className="text-lg font-semibold">{currentWeather.temperature}°C</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Cloud className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-sm text-gray-600">Humidity</div>
              <div className="text-lg font-semibold">{currentWeather.humidity}%</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Wind className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-sm text-gray-600">Wind Speed</div>
              <div className="text-lg font-semibold">{currentWeather.windSpeed} km/h</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-sm text-gray-600">Visibility</div>
              <div className="text-lg font-semibold">{currentWeather.visibility} km</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartPrayerWeatherIntegration;
