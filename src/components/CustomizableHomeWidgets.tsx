
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  Settings,
  BookOpen,
  Clock,
  Heart,
  Compass,
  Star,
  TrendingUp,
  Calendar,
  Search,
  Bookmark,
  Award,
  Target,
  BarChart3,
  Zap,
  Plus,
  Grid3X3,
  Move
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Widget {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  size: 'small' | 'medium' | 'large';
  category: 'prayer' | 'quran' | 'progress' | 'quick-actions';
  isEnabled: boolean;
  order: number;
}

interface QuickActionWidget {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  color: string;
}

const CustomizableHomeWidgets: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isConfiguring, setIsConfiguring] = useState(false);

  // Quick action widgets
  const QuickActionsWidget = () => {
    const quickActions: QuickActionWidget[] = [
      {
        title: 'Read Quran',
        description: 'Continue reading',
        icon: BookOpen,
        action: () => navigate('/books'),
        color: 'bg-emerald-500 hover:bg-emerald-600'
      },
      {
        title: 'Prayer Times',
        description: 'View schedule',
        icon: Clock,
        action: () => navigate('/calendar'),
        color: 'bg-blue-500 hover:bg-blue-600'
      },
      {
        title: 'Duas',
        description: 'Daily prayers',
        icon: Heart,
        action: () => navigate('/books'),
        color: 'bg-rose-500 hover:bg-rose-600'
      },
      {
        title: 'Qibla',
        description: 'Find direction',
        icon: Compass,
        action: () => navigate('/calendar'),
        color: 'bg-purple-500 hover:bg-purple-600'
      }
    ];

    return (
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              onClick={action.action}
              className={`h-20 p-3 flex flex-col items-center gap-2 text-white ${action.color} transition-all duration-200 hover:scale-105`}
            >
              <Icon className="w-5 h-5" />
              <div className="text-center">
                <div className="text-xs font-semibold">{action.title}</div>
                <div className="text-xs opacity-80">{action.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
    );
  };

  // Progress widget
  const ProgressWidget = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-green-700">Daily Progress</p>
          <p className="text-sm text-green-600">75% complete</p>
        </div>
        <div className="p-2 bg-green-100 rounded-full">
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
      </div>
      <div className="w-full bg-green-100 rounded-full h-2">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs text-center">
        <div>
          <div className="font-semibold text-gray-700">Prayers</div>
          <div className="text-green-600">4/5</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700">Reading</div>
          <div className="text-blue-600">15 min</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700">Dhikr</div>
          <div className="text-purple-600">50</div>
        </div>
      </div>
    </div>
  );

  // Next prayer widget
  const NextPrayerWidget = () => (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-blue-700">Next Prayer</span>
      </div>
      <div>
        <div className="text-2xl font-bold text-blue-800">Asr</div>
        <div className="text-lg text-blue-600">3:45 PM</div>
        <div className="text-sm text-gray-500">in 2 hours 15 min</div>
      </div>
    </div>
  );

  // Reading streak widget
  const ReadingStreakWidget = () => (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center gap-2">
        <Star className="w-5 h-5 text-yellow-600" />
        <span className="font-semibold text-yellow-700">Reading Streak</span>
      </div>
      <div>
        <div className="text-3xl font-bold text-yellow-800">7</div>
        <div className="text-sm text-yellow-600">days</div>
        <div className="text-xs text-gray-500">Keep it up! 🔥</div>
      </div>
    </div>
  );

  // Initialize default widgets
  useEffect(() => {
    const defaultWidgets: Widget[] = [
      {
        id: 'quick-actions',
        title: 'Quick Actions',
        description: 'Essential features at your fingertips',
        icon: Zap,
        component: QuickActionsWidget,
        size: 'large',
        category: 'quick-actions',
        isEnabled: true,
        order: 1
      },
      {
        id: 'progress',
        title: 'Daily Progress',
        description: 'Track your spiritual journey',
        icon: TrendingUp,
        component: ProgressWidget,
        size: 'medium',
        category: 'progress',
        isEnabled: true,
        order: 2
      },
      {
        id: 'next-prayer',
        title: 'Next Prayer',
        description: 'Stay connected with prayer times',
        icon: Clock,
        component: NextPrayerWidget,
        size: 'small',
        category: 'prayer',
        isEnabled: true,
        order: 3
      },
      {
        id: 'reading-streak',
        title: 'Reading Streak',
        description: 'Your consistency matters',
        icon: Star,
        component: ReadingStreakWidget,
        size: 'small',
        category: 'quran',
        isEnabled: true,
        order: 4
      }
    ];

    // Load from localStorage or use defaults
    const savedWidgets = localStorage.getItem('home-widgets-config');
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    } else {
      setWidgets(defaultWidgets);
    }
  }, []);

  // Save widget configuration
  const saveWidgetConfig = (newWidgets: Widget[]) => {
    setWidgets(newWidgets);
    localStorage.setItem('home-widgets-config', JSON.stringify(newWidgets));
    toast({
      title: 'Widgets Updated',
      description: 'Your home screen layout has been saved',
    });
  };

  // Toggle widget enabled state
  const toggleWidget = (widgetId: string) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId
        ? { ...widget, isEnabled: !widget.isEnabled }
        : widget
    );
    saveWidgetConfig(updatedWidgets);
  };

  // Get enabled widgets sorted by order
  const enabledWidgets = widgets
    .filter(widget => widget.isEnabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {/* Configuration Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Home Widgets</h3>
          <p className="text-sm text-gray-600">Customize your quick access dashboard</p>
        </div>
        
        <Dialog open={isConfiguring} onOpenChange={setIsConfiguring}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Configure Widgets</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {widgets.map((widget) => {
                const Icon = widget.icon;
                return (
                  <div key={widget.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-sm">{widget.title}</div>
                        <div className="text-xs text-gray-500">{widget.description}</div>
                      </div>
                    </div>
                    <Switch
                      checked={widget.isEnabled}
                      onCheckedChange={() => toggleWidget(widget.id)}
                    />
                  </div>
                );
              })}
              
              <div className="pt-3 border-t">
                <Button
                  onClick={() => setIsConfiguring(false)}
                  className="w-full"
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enabledWidgets.map((widget) => {
          const Icon = widget.icon;
          const WidgetComponent = widget.component;
          
          return (
            <Card
              key={widget.id}
              className={cn(
                "transition-all duration-200 hover:shadow-md",
                widget.size === 'large' && "md:col-span-2",
                widget.size === 'small' && "min-h-32"
              )}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className="w-5 h-5" />
                  {widget.title}
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {widget.category}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WidgetComponent />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add more widgets hint */}
      {enabledWidgets.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Grid3X3 className="w-12 h-12 text-gray-400 mb-3" />
            <h3 className="font-medium text-gray-700 mb-2">No widgets enabled</h3>
            <p className="text-sm text-gray-500 mb-4">
              Configure widgets to customize your home screen
            </p>
            <Button
              variant="outline"
              onClick={() => setIsConfiguring(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Widgets
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomizableHomeWidgets;
