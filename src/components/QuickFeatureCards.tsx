import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Navigation, Quote, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickFeatureCards: React.FC = () => {
  const navigate = useNavigate();

  const newFeatures = [
    {
      title: 'Qibla Compass',
      description: 'Find Mecca direction',
      icon: Navigation,
      path: '/qibla',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Islamic Quotes',
      description: 'Daily wisdom & inspiration',
      icon: Quote,
      path: '/quotes',
      gradient: 'from-purple-400 to-indigo-500'
    },
    {
      title: 'Islamic Calendar',
      description: 'Hijri dates & events',
      icon: Calendar,
      path: '/calendar',
      gradient: 'from-blue-400 to-cyan-500'
    }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-3">✨ New Features</h3>
      <div className="grid grid-cols-1 gap-3">
        {newFeatures.map((feature, index) => (
          <Card 
            key={index}
            className="hover:shadow-md transition-all duration-200 cursor-pointer group bg-gradient-to-r border-none text-white"
            style={{
              background: `linear-gradient(135deg, var(--${feature.gradient.split(' ')[0].replace('from-', '')}) 0%, var(--${feature.gradient.split(' ')[2].replace('to-', '')}) 100%)`
            }}
            onClick={() => navigate(feature.path)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-xs opacity-90">{feature.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickFeatureCards;