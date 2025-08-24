
import React, { useState, useEffect } from 'react';

interface ProgressData {
  date: string;
  prayers: number;
  quran: number;
  dhikr: number;
  charity: number;
}import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, BookOpen, Heart, Clock, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ReactNode;
  points: number;
  completedAt?: Date;
}

const DailyProgress: React.FC = () => {
  const { toast } = useToast();
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage or create default tasks
  useEffect(() => {
    const loadDailyTasks = () => {
      const today = new Date().toDateString();
      const savedTasks = localStorage.getItem(`dailyTasks_${today}`);
      
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        setDailyTasks(parsedTasks.map((task: unknown) => ({
          ...task,
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
          icon: getTaskIcon(task.id)
        })));
      } else {
        // Create fresh daily tasks
        const defaultTasks: DailyTask[] = [
          {
            id: 'quran',
            title: 'Read Quran',
            description: 'Read at least 10 verses',
            completed: false,
            icon: <BookOpen className="w-4 h-4" />,
            points: 10
          },
          {
            id: 'prayers',
            title: 'Five Daily Prayers',
            description: 'Complete all 5 prayers on time',
            completed: false,
            icon: <Clock className="w-4 h-4" />,
            points: 15
          },
          {
            id: 'dhikr',
            title: 'Morning/Evening Dhikr',
            description: '100 times SubhanAllah',
            completed: false,
            icon: <Heart className="w-4 h-4" />,
            points: 8
          },
          {
            id: 'reflection',
            title: 'Daily Reflection',
            description: 'Contemplate verse of the day',
            completed: false,
            icon: <Star className="w-4 h-4" />,
            points: 5
          }
        ];
        setDailyTasks(defaultTasks);
      }
      setIsLoading(false);
    };

    loadDailyTasks();
  }, []); // TODO: Add missing dependencies;

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && dailyTasks.length > 0) {
      const today = new Date().toDateString();
      localStorage.setItem(`dailyTasks_${today}`, JSON.stringify(dailyTasks));
    }
  }, [dailyTasks, isLoading]);

  const getTaskIcon = (taskId: string) => {
    switch (taskId) {
      case 'quran': return <BookOpen className="w-4 h-4" />;
      case 'prayers': return <Clock className="w-4 h-4" />;
      case 'dhikr': return <Heart className="w-4 h-4" />;
      case 'reflection': return <Star className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const toggleTask = (taskId: string) => {
    setDailyTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          const updatedTask = { 
            ...task, 
            completed: newCompleted,
            completedAt: newCompleted ? new Date() : undefined
          };
          
          if (newCompleted) {
            toast({
              title: "Task Completed! 🎉",
              description: `+${task.points} spiritual points earned`,
            });
          }
          return updatedTask;
        }
        return task;
      })
    );
  };

  const resetDailyTasks = () => {
    setDailyTasks(prev => prev.map(task => ({
      ...task,
      completed: false,
      completedAt: undefined
    })));
    toast({
      title: "Tasks Reset",
      description: "Daily tasks have been reset for a fresh start",
    });
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-200 dark:border-teal-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedTasks = dailyTasks.filter(task => task.completed).length;
  const totalTasks = dailyTasks.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const totalPoints = dailyTasks.filter(task => task.completed).reduce((sum, task) => sum + task.points, 0);

  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Good Night";
  };

  return (
    <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-200 dark:border-teal-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            Daily Progress
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full">
              {totalPoints} points today
            </div>
            <Button 
              onClick={resetDailyTasks}
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              Reset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Greeting and Progress Overview */}
        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
          <div className="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-1">
            {getCurrentTimeGreeting()}! 🌅
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            You've completed {completedTasks} of {totalTasks} daily tasks
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="text-sm text-teal-600 dark:text-teal-400 font-medium">
            {completionPercentage.toFixed(0)}% Complete
          </div>
        </div>

        {/* Daily Tasks */}
        <div className="space-y-3">
          {dailyTasks.map((task) => (
            <div 
              key={task.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                task.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600'
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 ${task.completed ? 'text-green-600' : 'text-gray-400'}`}>
                  {task.completed ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className={`font-medium ${task.completed ? 'text-green-800 dark:text-green-200 line-through' : 'text-gray-800 dark:text-gray-200'}`}>
                    {task.title}
                  </div>
                  <div className={`text-sm ${task.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {task.description}
                  </div>
                  {task.completedAt && (
                    <div className="text-xs text-green-500 mt-1">
                      Completed at {task.completedAt.toLocaleTimeString()}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`${task.completed ? 'text-green-600' : 'text-gray-400'}`}>
                    {task.icon}
                  </div>
                  <div className={`text-sm font-medium ${task.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-500'}`}>
                    +{task.points}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Completion Message */}
        {completedTasks === totalTasks && totalTasks > 0 && (
          <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
            <div className="text-2xl mb-2">🎉</div>
            <div className="font-semibold text-green-800 dark:text-green-200">
              All Daily Tasks Completed!
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              May Allah accept your efforts and grant you barakah
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyProgress;
