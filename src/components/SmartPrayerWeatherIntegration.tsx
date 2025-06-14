
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Cloud, Sun, CloudRain, Wind, Thermometer, Clock, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
}

interface LocationPrayerTimes {
  city: string;
  country: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  sunrise: string;
  sunset: string;
}

const SmartPrayerWeatherIntegration = () => {
  const { toast } = useToast();
  
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 28,
    condition: 'صافي',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    icon: 'sun'
  });

  const [prayerTimes, setPrayerTimes] = useState<LocationPrayerTimes>({
    city: 'الرياض',
    country: 'السعودية',
    fajr: '04:45',
    dhuhr: '12:15',
    asr: '15:30',
    maghrib: '18:45',
    isha: '20:15',
    sunrise: '06:15',
    sunset: '18:45'
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: string, remaining: string} | null>(null);
  const [weatherAlerts, setWeatherAlerts] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      calculateNextPrayer();
      checkWeatherAlerts();
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes, weather]);

  const calculateNextPrayer = () => {
    const now = new Date();
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
      { name: 'الفجر', time: prayerTimes.fajr },
      { name: 'الظهر', time: prayerTimes.dhuhr },
      { name: 'العصر', time: prayerTimes.asr },
      { name: 'المغرب', time: prayerTimes.maghrib },
      { name: 'العشاء', time: prayerTimes.isha }
    ];

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTimeMinutes = hours * 60 + minutes;
      
      if (prayerTimeMinutes > currentTimeMinutes) {
        const remainingMinutes = prayerTimeMinutes - currentTimeMinutes;
        const hours = Math.floor(remainingMinutes / 60);
        const mins = remainingMinutes % 60;
        
        setNextPrayer({
          name: prayer.name,
          time: prayer.time,
          remaining: `${hours}:${mins.toString().padStart(2, '0')}`
        });
        return;
      }
    }
    
    // If no prayer found today, return first prayer tomorrow
    const firstPrayer = prayers[0];
    const [hours, minutes] = firstPrayer.time.split(':').map(Number);
    const prayerTimeMinutes = hours * 60 + minutes;
    const minutesUntilTomorrow = (24 * 60) - currentTimeMinutes + prayerTimeMinutes;
    const remainingHours = Math.floor(minutesUntilTomorrow / 60);
    const remainingMins = minutesUntilTomorrow % 60;
    
    setNextPrayer({
      name: firstPrayer.name,
      time: firstPrayer.time,
      remaining: `${remainingHours}:${remainingMins.toString().padStart(2, '0')}`
    });
  };

  const checkWeatherAlerts = () => {
    const alerts: string[] = [];
    
    if (weather.temperature > 40) {
      alerts.push('حرارة عالية - يُنصح بالصلاة في مكان مكيف');
    }
    
    if (weather.condition.includes('مطر')) {
      alerts.push('أمطار - تأكد من أوقات الصلاة المحدثة');
    }
    
    if (weather.windSpeed > 30) {
      alerts.push('رياح قوية - احذر عند التوجه للمسجد');
    }
    
    if (weather.visibility < 5) {
      alerts.push('ضباب كثيف - قد تتأثر رؤية القبلة');
    }
    
    setWeatherAlerts(alerts);
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('مطر')) return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (condition.includes('غائم')) return <Cloud className="w-8 h-8 text-gray-500" />;
    return <Sun className="w-8 h-8 text-yellow-500" />;
  };

  const getPrayerRecommendation = () => {
    if (weather.temperature > 35) {
      return {
        text: 'يُنصح بالصلاة في مكان مكيف أو مظلل',
        color: 'text-orange-600',
        bg: 'bg-orange-50'
      };
    }
    
    if (weather.condition.includes('مطر')) {
      return {
        text: 'يمكن الجمع بين الصلوات حسب الحاجة',
        color: 'text-blue-600',
        bg: 'bg-blue-50'
      };
    }
    
    return {
      text: 'طقس مناسب للصلاة في المسجد',
      color: 'text-green-600',
      bg: 'bg-green-50'
    };
  };

  const recommendation = getPrayerRecommendation();

  const refreshLocation = () => {
    toast({
      title: '📍 يتم تحديث الموقع',
      description: 'جاري الحصول على أحدث مواقيت الصلاة والطقس',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-500" />
          مواقيت الصلاة والطقس الذكي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location and Weather Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-semibold text-blue-900">{prayerTimes.city}, {prayerTimes.country}</div>
              <div className="text-sm text-blue-600">
                {currentTime.toLocaleDateString('ar-SA', { 
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </div>
            </div>
          </div>
          <Button onClick={refreshLocation} size="sm" variant="outline" className="border-blue-300">
            تحديث الموقع
          </Button>
        </div>

        {/* Next Prayer Card */}
        {nextPrayer && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-green-800 mb-1">الصلاة القادمة</h4>
                <div className="text-2xl font-bold text-green-900">{nextPrayer.name}</div>
                <div className="text-green-700">{nextPrayer.time}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-green-600 mb-1">متبقي</div>
                <div className="text-3xl font-bold text-green-800">{nextPrayer.remaining}</div>
                <Bell className="w-5 h-5 text-green-600 mx-auto mt-1" />
              </div>
            </div>
          </div>
        )}

        {/* Weather Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">الطقس الحالي</span>
              {getWeatherIcon(weather.condition)}
            </div>
            <div className="text-2xl font-bold mb-1">{weather.temperature}°</div>
            <div className="text-sm text-gray-600">{weather.condition}</div>
          </div>
          
          <div className="p-4 bg-white border rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">الرطوبة</span>
                <span className="font-medium">{weather.humidity}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">الرياح</span>
                <span className="font-medium">{weather.windSpeed} كم/س</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">الرؤية</span>
                <span className="font-medium">{weather.visibility} كم</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Recommendation */}
        <div className={`p-3 rounded-lg ${recommendation.bg}`}>
          <div className="flex items-center gap-2">
            <Thermometer className={`w-5 h-5 ${recommendation.color}`} />
            <span className={`font-medium ${recommendation.color}`}>توصية الطقس</span>
          </div>
          <p className={`text-sm mt-1 ${recommendation.color}`}>{recommendation.text}</p>
        </div>

        {/* Weather Alerts */}
        {weatherAlerts.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-800">تنبيهات الطقس</h4>
            {weatherAlerts.map((alert, index) => (
              <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-700">{alert}</p>
              </div>
            ))}
          </div>
        )}

        {/* All Prayer Times */}
        <div className="space-y-3">
          <h4 className="font-semibold">مواقيت اليوم</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'الفجر', time: prayerTimes.fajr },
              { name: 'الشروق', time: prayerTimes.sunrise },
              { name: 'الظهر', time: prayerTimes.dhuhr },
              { name: 'العصر', time: prayerTimes.asr },
              { name: 'المغرب', time: prayerTimes.maghrib },
              { name: 'العشاء', time: prayerTimes.isha }
            ].map((prayer, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <span className="font-medium">{prayer.name}</span>
                <span className="text-blue-600">{prayer.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Clock className="w-4 h-4 mr-1" />
            عرض القبلة
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Wind className="w-4 h-4 mr-1" />
            تفاصيل الطقس
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartPrayerWeatherIntegration;
