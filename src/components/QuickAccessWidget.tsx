
import React from 'react';
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
  Bookmark,
  Settings
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  description: string;
}

const QuickAccessWidget: React.FC = () => {
  const navigate = useNavigate();

  const quickActions: QuickAction[] = [
    {
      id: 'quran',
      title: 'Read Quran',
      icon: <BookOpen className="w-6 h-6" />,
      action: () => navigate('/books'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Continue reading'
    },
    {
      id: 'prayer-times',
      title: 'Prayer Times',
      icon: <Clock className="w-6 h-6" />,
      action: () => navigate('/calendar'),
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Check timings'
    },
    {
      id: 'qibla',
      title: 'Qibla',
      icon: <Compass className="w-6 h-6" />,
      action: () => navigate('/calendar'),
      color: 'bg-teal-500 hover:bg-teal-600',
      description: 'Find direction'
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: <Calendar className="w-6 h-6" />,
      action: () => navigate('/calendar'),
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Islamic dates'
    },
    {
      id: 'duas',
      title: 'Duas',
      icon: <Heart className="w-6 h-6" />,
      action: () => navigate('/books'),
      color: 'bg-rose-500 hover:bg-rose-600',
      description: 'Daily supplications'
    },
    {
      id: 'search',
      title: 'Search',
      icon: <Search className="w-6 h-6" />,
      action: () => navigate('/books'),
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Find verses'
    },
    {
      id: 'bookmarks',
      title: 'Bookmarks',
      icon: <Bookmark className="w-6 h-6" />,
      action: () => navigate('/books'),
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: 'Saved items'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings className="w-6 h-6" />,
      action: () => navigate('/settings'),
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'Preferences'
    }
  ];

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
            Quick Access
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Jump to your most used features
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <div key={action.id} className="text-center">
              <Button
                onClick={action.action}
                className={`w-16 h-16 rounded-2xl text-white shadow-lg transition-all hover:scale-105 ${action.color} mb-2`}
                size="icon"
              >
                {action.icon}
              </Button>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                {action.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {action.description}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessWidget;
