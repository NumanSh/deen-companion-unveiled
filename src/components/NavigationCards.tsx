import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, Quote, Calendar, BookOpen, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavigationCards: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Qibla Compass',
      description: 'Find the direction to Mecca',
      icon: Navigation,
      path: '/qibla',
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Islamic Quotes',
      description: 'Daily wisdom from Quran & Sunnah',
      icon: Quote,
      path: '/quotes',
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Islamic Calendar',
      description: 'Hijri dates & Islamic events',
      icon: Calendar,
      path: '/calendar',
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Quran Reading',
      description: 'Read & explore the Holy Quran',
      icon: BookOpen,
      path: '/',
      color: 'from-teal-500 to-green-500',
      textColor: 'text-teal-600'
    },
    {
      title: 'Prayer Times',
      description: 'Never miss your prayers',
      icon: Clock,
      path: '/',
      color: 'from-orange-500 to-red-500',
      textColor: 'text-orange-600'
    },
    {
      title: 'Duas & Dhikr',
      description: 'Daily supplications & remembrance',
      icon: Heart,
      path: '/',
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {features.map((feature, index) => (
        <Card 
          key={index}
          className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => navigate(feature.path)}
        >
          <CardHeader className="pb-3">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <CardTitle className={`text-lg ${feature.textColor}`}>
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NavigationCards;