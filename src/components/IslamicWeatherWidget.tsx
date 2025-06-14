
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
  humidity: number;
  windSpeed: number;
  location: string;
  prayerImpact: string;
  islamicGreeting: string;
}

const IslamicWeatherWidget = () => {
  const { t } = useLanguage();
  
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 28,
    condition: 'sunny',
    humidity: 45,
    windSpeed: 12,
    location: 'الرياض',
    prayerImpact: 'طقس مناسب للصلاة في الخارج',
    islamicGreeting: 'بارك الله في يومكم'
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate weather updates
    const weatherTimer = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(20, Math.min(80, prev.humidity + (Math.random() - 0.5) * 10))
      }));
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'windy': return <Wind className="w-8 h-8 text-gray-600" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getIslamicTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) {
      return 'صباح الخير، بارك الله في صباحكم';
    } else if (hour >= 12 && hour < 15) {
      return 'ظهر مبارك، أسعد الله أوقاتكم';
    } else if (hour >= 15 && hour < 18) {
      return 'عصر مبارك، حفظكم الله';
    } else if (hour >= 18 && hour < 21) {
      return 'مساء الخير، بارك الله في مسائكم';
    } else {
      return 'ليلة مباركة، أسعد الله ليلتكم';
    }
  };

  const getWeatherConditionArabic = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'مشمس';
      case 'cloudy': return 'غائم';
      case 'rainy': return 'ممطر';
      case 'windy': return 'عاصف';
      default: return 'مشمس';
    }
  };

  const getPrayerAdvice = () => {
    if (weather.condition === 'rainy') {
      return 'يمكن الجمع بين الصلوات حسب المذهب عند المطر الشديد';
    } else if (weather.condition === 'windy' && weather.windSpeed > 20) {
      return 'احرص على إحكام الوضوء والثياب عند الرياح القوية';
    } else if (weather.temperature > 35) {
      return 'يُستحب الصلاة في مكان بارد عند شدة الحر';
    } else if (weather.temperature < 10) {
      return 'يُستحب التدفئة قبل الصلاة في البرد الشديد';
    } else {
      return 'طقس مناسب للصلاة والعبادة، الحمد لله';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getWeatherIcon(weather.condition)}
          الطقس الإسلامي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Islamic Greeting */}
        <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <p className="text-blue-800 font-semibold">
            {getIslamicTimeGreeting()}
          </p>
        </div>

        {/* Weather Overview */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-800">
              {Math.round(weather.temperature)}°C
            </div>
            <div className="text-gray-600">{getWeatherConditionArabic(weather.condition)}</div>
            <div className="text-sm text-gray-500">{weather.location}</div>
          </div>
          <div className="text-right">
            {getWeatherIcon(weather.condition)}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <Thermometer className="w-4 h-4 text-red-500" />
            <div>
              <div className="text-xs text-gray-500">الرطوبة</div>
              <div className="font-semibold">{weather.humidity}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <Wind className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xs text-gray-500">سرعة الرياح</div>
              <div className="font-semibold">{weather.windSpeed} كم/س</div>
            </div>
          </div>
        </div>

        {/* Prayer Impact */}
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-green-800">تأثير على الصلاة</span>
          </div>
          <p className="text-sm text-green-700">{getPrayerAdvice()}</p>
        </div>

        {/* Current Time */}
        <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
          <div>
            <div className="text-sm text-indigo-600">الوقت الحالي</div>
            <div className="text-lg font-bold text-indigo-800">
              {currentTime.toLocaleTimeString('ar-SA', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-indigo-600">التاريخ</div>
            <div className="font-semibold text-indigo-800">
              {currentTime.toLocaleDateString('ar-SA')}
            </div>
          </div>
        </div>

        {/* Islamic Weather Wisdom */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-1">حكمة إسلامية</h4>
          <p className="text-sm text-amber-700">
            "اللهم أسقنا غيثاً مغيثاً، مريئاً مريعاً، نافعاً غير ضار، عاجلاً غير آجل"
          </p>
          <p className="text-xs text-amber-600 mt-1">دعاء طلب المطر</p>
        </div>

        {/* Weather Status Badge */}
        <div className="flex justify-center">
          <Badge 
            className={
              weather.condition === 'sunny' ? 'bg-yellow-500 text-white' :
              weather.condition === 'cloudy' ? 'bg-gray-500 text-white' :
              weather.condition === 'rainy' ? 'bg-blue-500 text-white' :
              'bg-indigo-500 text-white'
            }
          >
            {getWeatherConditionArabic(weather.condition)} - {Math.round(weather.temperature)}°C
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicWeatherWidget;
