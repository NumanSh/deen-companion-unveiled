
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
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
import SupportUsAdButton from './SupportUsAdButton';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  description: string;
  category: 'primary' | 'secondary';
}

const QuickAccessWidget: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const quickActions: QuickAction[] = [
    {
      id: 'quran',
      title: 'Read Quran',
      icon: <BookOpen className="w-6 h-6" />,
      action: () => navigate('/books'),
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'Continue reading',
      category: 'primary'
    },
    {
      id: 'prayer-times',
      title: 'Prayer Times',
      icon: <Clock className="w-6 h-6" />,
      action: () => navigate('/calendar'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Check timings',
      category: 'primary'
    },
    {
      id: 'qibla',
      title: 'Qibla',
      icon: <Compass className="w-6 h-6" />,
      action: () => navigate('/calendar'),
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Find direction',
      category: 'primary'
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: <Calendar className="w-6 h-6" />,
      action: () => navigate('/calendar'),
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: 'Islamic dates',
      category: 'primary'
    },
    {
      id: 'duas',
      title: 'Duas',
      icon: <Heart className="w-6 h-6" />,
      action: () => navigate('/books'),
      color: 'bg-rose-500 hover:bg-rose-600',
      description: 'Daily supplications',
      category: 'secondary'
    },
    {
      id: 'search',
      title: 'Search',
      icon: <Search className="w-6 h-6" />,
      action: () => navigate('/books'),
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Find verses',
      category: 'secondary'
    },
    {
      id: 'bookmarks',
      title: 'Bookmarks',
      icon: <Bookmark className="w-6 h-6" />,
      action: () => navigate('/books'),
      color: 'bg-teal-500 hover:bg-teal-600',
      description: 'Saved items',
      category: 'secondary'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings className="w-6 h-6" />,
      action: () => navigate('/settings'),
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'Preferences',
      category: 'secondary'
    }
  ];

  const handleActionClick = (action: QuickAction) => {
    // Instant feedback with meaningful messages
    toast({
      title: `Opening ${action.title}`,
      description: action.description,
      duration: 1200,
    });
    
    // Slight delay for better perceived performance
    setTimeout(() => {
      action.action();
    }, 150);
  };

  const primaryActions = quickActions.filter(action => action.category === 'primary');
  const secondaryActions = quickActions.filter(action => action.category === 'secondary');

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Quick Access
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Jump to your most used features
          </p>
        </div>
        
        {/* Primary Actions - Most important, larger buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {primaryActions.map((action) => (
            <div key={action.id} className="text-center">
              <Button
                onClick={() => handleActionClick(action)}
                className={`w-20 h-20 rounded-2xl text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${action.color} mb-3`}
                size="icon"
              >
                {action.icon}
              </Button>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {action.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {action.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Actions - Smaller, grouped */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">
            More Actions
          </p>
          <div className="grid grid-cols-4 gap-3">
            {secondaryActions.map((action) => (
              <div key={action.id} className="text-center">
                <Button
                  onClick={() => handleActionClick(action)}
                  className={`w-14 h-14 rounded-xl text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 ${action.color} mb-2`}
                  size="icon"
                >
                  {action.icon}
                </Button>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {action.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Us Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <SupportUsAdButton variant="widget" />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessWidget;
