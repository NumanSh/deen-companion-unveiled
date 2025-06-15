
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Compass, 
  Calendar, 
  Heart, 
  Search,
  Plus,
  X,
  Zap
} from 'lucide-react';

const FloatingQuickAccess = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      id: 'quran',
      title: 'Quran',
      icon: BookOpen,
      action: () => navigate('/books?tab=quran'),
      color: 'bg-green-500'
    },
    {
      id: 'prayer-times',
      title: 'Prayer',
      icon: Clock,
      action: () => navigate('/calendar'),
      color: 'bg-blue-500'
    },
    {
      id: 'qibla',
      title: 'Qibla',
      icon: Compass,
      action: () => navigate('/calendar'),
      color: 'bg-purple-500'
    },
    {
      id: 'duas',
      title: 'Duas',
      icon: Heart,
      action: () => navigate('/books?tab=duas'),
      color: 'bg-rose-500'
    },
    {
      id: 'search',
      title: 'Search',
      icon: Search,
      action: () => navigate('/books'),
      color: 'bg-orange-500'
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: Calendar,
      action: () => navigate('/calendar'),
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <Card className="mb-4 shadow-2xl border-2 border-teal-200 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3 w-32">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    onClick={() => {
                      action.action();
                      setIsExpanded(false);
                    }}
                    className={`h-16 w-16 rounded-xl text-white shadow-lg transition-all hover:scale-105 ${action.color}`}
                    size="icon"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{action.title}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-teal-600 hover:bg-teal-700 hover:scale-110'
        }`}
        size="icon"
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Zap className="w-6 h-6 text-white" />
        )}
      </Button>
    </div>
  );
};

export default FloatingQuickAccess;
