
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Book, RotateCcw, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface DailyTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type: 'reading' | 'dhikr' | 'dua';
}

const DailyProgress: React.FC = () => {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  const getDefaultTasks = (): DailyTask[] => [
    {
      id: 'fajr-dua',
      title: t('morning-dua'),
      description: t('recite-morning-supplications'),
      completed: false,
      type: 'dua'
    },
    {
      id: 'quran-reading',
      title: t('quran-reading'),
      description: t('read-one-page-quran'),
      completed: false,
      type: 'reading'
    },
    {
      id: 'dhikr-100',
      title: t('dhikr-100x'),
      description: t('complete-100-dhikr'),
      completed: false,
      type: 'dhikr'
    },
    {
      id: 'evening-dua',
      title: t('evening-dua'),
      description: t('recite-evening-supplications'),
      completed: false,
      type: 'dua'
    },
    {
      id: 'istighfar',
      title: t('istighfar'),
      description: t('seek-forgiveness-33-times'),
      completed: false,
      type: 'dhikr'
    }
  ];

  useEffect(() => {
    loadDailyProgress();
  }, [t]);

  const loadDailyProgress = () => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('daily-progress');
    
    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === today) {
        setTasks(data.tasks);
        setStreak(data.streak || 0);
        return;
      }
    }
    
    // New day - reset tasks
    setTasks(getDefaultTasks());
    checkStreak();
  };

  const checkStreak = () => {
    const saved = localStorage.getItem('daily-progress');
    if (saved) {
      const data = JSON.parse(saved);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (data.date === yesterday.toDateString() && data.allCompleted) {
        setStreak(data.streak + 1);
      } else if (data.date !== yesterday.toDateString()) {
        setStreak(0);
      } else {
        setStreak(data.streak || 0);
      }
    }
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    setTasks(updatedTasks);
    saveDailyProgress(updatedTasks);
    
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      toast({
        title: t('task-completed'),
        description: `${task.title} ${t('marked-as-complete')}`,
      });
    }
  };

  const saveDailyProgress = (updatedTasks: DailyTask[]) => {
    const today = new Date().toDateString();
    const allCompleted = updatedTasks.every(task => task.completed);
    
    const data = {
      date: today,
      tasks: updatedTasks,
      streak: allCompleted && updatedTasks.every(task => task.completed) ? streak : streak,
      allCompleted
    };
    
    localStorage.setItem('daily-progress', JSON.stringify(data));
    
    if (allCompleted && !tasks.every(task => task.completed)) {
      toast({
        title: t('all-tasks-completed'),
        description: `${t('mashallah-completed-tasks')} ${t('streak-days')}: ${streak + 1}`,
      });
    }
  };

  const resetProgress = () => {
    setTasks(getDefaultTasks());
    const today = new Date().toDateString();
    const data = {
      date: today,
      tasks: getDefaultTasks(),
      streak: 0,
      allCompleted: false
    };
    localStorage.setItem('daily-progress', JSON.stringify(data));
    setStreak(0);
    toast({
      title: t('progress-reset'),
      description: t('daily-progress-reset'),
    });
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'reading': return <Book className="w-4 h-4 text-green-500" />;
      case 'dhikr': return <RotateCcw className="w-4 h-4 text-purple-500" />;
      case 'dua': return <Calendar className="w-4 h-4 text-blue-500" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            {t('daily-progress')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {completedCount}/{tasks.length} {t('tasks-completed')}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{streak}</div>
          <div className="text-xs text-muted-foreground">{t('day-streak')}</div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t('progress-colon')}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                task.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <div className="flex-shrink-0">
                {task.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getTaskIcon(task.type)}
                  <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={resetProgress}
          className="w-full"
        >
          {t('reset-todays-progress')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyProgress;
