
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Target, Plus, Award, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface IslamicGoal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'prayer' | 'quran' | 'dhikr' | 'charity' | 'other';
  reward?: string;
  isCustom?: boolean;
}

const DailyIslamicGoals: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);
  
  const [goals, setGoals] = useState<IslamicGoal[]>([
    {
      id: '1',
      title: t('complete-5-daily-prayers'),
      description: t('perform-obligatory-prayers'),
      completed: false,
      category: 'prayer',
      reward: '+50 ' + t('points')
    },
    {
      id: '2',
      title: t('read-1-page-of-quran'),
      description: t('daily-quran-recitation'),
      completed: false,
      category: 'quran',
      reward: '+30 ' + t('points')
    },
    {
      id: '3',
      title: t('morning-evening-adhkar'),
      description: t('recite-morning-evening'),
      completed: false,
      category: 'dhikr',
      reward: '+25 ' + t('points')
    },
    {
      id: '4',
      title: t('give-charity-sadaqah'),
      description: t('any-form-charity'),
      completed: false,
      category: 'charity',
      reward: '+40 ' + t('points')
    },
    {
      id: '5',
      title: t('seek-forgiveness-istighfar'),
      description: t('say-astaghfirullah-100-times'),
      completed: false,
      category: 'dhikr',
      reward: '+20 ' + t('points')
    }
  ]);

  useEffect(() => {
    // Load goals from localStorage
    const today = new Date().toDateString();
    const savedGoals = localStorage.getItem(`dailyGoals_${today}`);
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    // Save goals to localStorage whenever they change
    const today = new Date().toDateString();
    localStorage.setItem(`dailyGoals_${today}`, JSON.stringify(goals));
  }, [goals]);

  const toggleGoal = (goalId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ));

    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      toast({
        title: !goal.completed ? 'Goal Completed! 🎉' : 'Goal Unmarked',
        description: `${goal.title} ${!goal.completed ? 'completed' : 'unmarked'}`,
      });
    }
  };

  const addCustomGoal = () => {
    if (newGoalTitle.trim()) {
      const newGoal: IslamicGoal = {
        id: Date.now().toString(),
        title: newGoalTitle.trim(),
        description: 'Custom goal',
        completed: false,
        category: 'other',
        reward: '+15 ' + t('points'),
        isCustom: true
      };
      
      setGoals(prev => [...prev, newGoal]);
      setNewGoalTitle('');
      setShowAddGoal(false);
      
      toast({
        title: 'Goal Added! ✅',
        description: 'Your custom goal has been added to today\'s goals',
      });
    }
  };

  const removeCustomGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
    toast({
      title: 'Goal Removed',
      description: 'Custom goal has been removed',
    });
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const progressPercentage = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'prayer': return '🕌';
      case 'quran': return '📖';
      case 'dhikr': return '📿';
      case 'charity': return '💝';
      default: return '⭐';
    }
  };

  const totalPoints = goals
    .filter(goal => goal.completed)
    .reduce((sum, goal) => sum + parseInt(goal.reward?.match(/\d+/)?.[0] || '0'), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          {t('daily-islamic-goals')}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{t('progress-colon')} {completedGoals}/{goals.length}</span>
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-yellow-600">{totalPoints} {t('points')}</span>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
              goal.completed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Checkbox
              checked={goal.completed}
              onCheckedChange={() => toggleGoal(goal.id)}
              className="mt-0.5"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getCategoryIcon(goal.category)}</span>
                <h4 className={`font-medium ${goal.completed ? 'line-through text-green-700 dark:text-green-300' : ''}`}>
                  {goal.title}
                </h4>
                {goal.isCustom && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomGoal(goal.id)}
                    className="ml-auto p-1 h-6 w-6 text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <p className={`text-sm mt-1 ${goal.completed ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                {goal.description}
              </p>
              {goal.reward && (
                <span className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${
                  goal.completed
                    ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
                    : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                }`}>
                  {goal.reward}
                </span>
              )}
            </div>
          </div>
        ))}

        {progressPercentage === 100 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-lg text-center animate-pulse">
            <div className="text-2xl mb-2">🎉</div>
            <div className="font-bold text-white">{t('all-goals-completed')}</div>
            <div className="text-yellow-100 text-sm">{t('may-allah-accept-efforts')}</div>
          </div>
        )}

        {/* Add Custom Goal */}
        {showAddGoal ? (
          <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <Input
              placeholder="Enter your custom goal..."
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              className="mb-3"
              onKeyPress={(e) => e.key === 'Enter' && addCustomGoal()}
            />
            <div className="flex gap-2">
              <Button onClick={addCustomGoal} size="sm" disabled={!newGoalTitle.trim()}>
                Add Goal
              </Button>
              <Button onClick={() => setShowAddGoal(false)} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" className="w-full mt-4" onClick={() => setShowAddGoal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {t('add-custom-goal')}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyIslamicGoals;
