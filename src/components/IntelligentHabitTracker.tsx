
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Target, 
  Clock, 
  Flame, 
  CheckCircle, 
  Calendar,
  TrendingUp,
  Brain,
  Star,
  Zap,
  Award,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IslamicHabit {
  id: string;
  name: string;
  nameArabic: string;
  category: 'prayer' | 'quran' | 'dhikr' | 'charity' | 'learning' | 'reflection';
  targetValue: number;
  currentValue: number;
  unit: string;
  streak: number;
  bestStreak: number;
  difficulty: 'easy' | 'medium' | 'hard';
  importance: number; // 1-10
  lastCompleted?: number;
  weeklyGoal: number;
  monthlyGoal: number;
  isActive: boolean;
  aiSuggestions?: string[];
}

interface HabitInsight {
  id: string;
  habitId: string;
  type: 'encouragement' | 'adjustment' | 'milestone' | 'optimization';
  message: string;
  priority: number;
  actionable: boolean;
}

const IntelligentHabitTracker = () => {
  const { toast } = useToast();
  const [habits, setHabits] = useState<IslamicHabit[]>([]);
  const [insights, setInsights] = useState<HabitInsight[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'prayer' | 'quran' | 'dhikr' | 'charity' | 'learning' | 'reflection'>('all');

  useEffect(() => {
    initializeHabits();
    generateInsights();
  }, []);

  const initializeHabits = () => {
    const defaultHabits: IslamicHabit[] = [
      {
        id: '1',
        name: 'Daily Prayers',
        nameArabic: 'الصلوات الخمس',
        category: 'prayer',
        targetValue: 5,
        currentValue: 3,
        unit: 'prayers',
        streak: 7,
        bestStreak: 15,
        difficulty: 'medium',
        importance: 10,
        weeklyGoal: 35,
        monthlyGoal: 150,
        isActive: true,
        aiSuggestions: ['Set prayer time reminders', 'Find a prayer companion']
      },
      {
        id: '2',
        name: 'Quran Reading',
        nameArabic: 'قراءة القرآن',
        category: 'quran',
        targetValue: 30,
        currentValue: 20,
        unit: 'minutes',
        streak: 12,
        bestStreak: 23,
        difficulty: 'easy',
        importance: 9,
        weeklyGoal: 210,
        monthlyGoal: 900,
        isActive: true,
        aiSuggestions: ['Try reading after Fajr', 'Use audio recitation to follow along']
      },
      {
        id: '3',
        name: 'Morning Dhikr',
        nameArabic: 'أذكار الصباح',
        category: 'dhikr',
        targetValue: 100,
        currentValue: 75,
        unit: 'recitations',
        streak: 5,
        bestStreak: 18,
        difficulty: 'easy',
        importance: 8,
        weeklyGoal: 700,
        monthlyGoal: 3000,
        isActive: true,
        aiSuggestions: ['Start with shorter sessions', 'Use a digital tasbih counter']
      },
      {
        id: '4',
        name: 'Islamic Learning',
        nameArabic: 'التعلم الإسلامي',
        category: 'learning',
        targetValue: 20,
        currentValue: 15,
        unit: 'minutes',
        streak: 3,
        bestStreak: 8,
        difficulty: 'medium',
        importance: 7,
        weeklyGoal: 140,
        monthlyGoal: 600,
        isActive: true,
        aiSuggestions: ['Focus on one topic per week', 'Join online study circles']
      },
      {
        id: '5',
        name: 'Daily Charity',
        nameArabic: 'الصدقة اليومية',
        category: 'charity',
        targetValue: 1,
        currentValue: 0,
        unit: 'acts',
        streak: 0,
        bestStreak: 4,
        difficulty: 'hard',
        importance: 8,
        weeklyGoal: 7,
        monthlyGoal: 30,
        isActive: true,
        aiSuggestions: ['Start with small acts', 'Set aside charity money weekly']
      }
    ];

    const saved = localStorage.getItem('intelligent-habits');
    if (saved) {
      setHabits(JSON.parse(saved));
    } else {
      setHabits(defaultHabits);
      localStorage.setItem('intelligent-habits', JSON.stringify(defaultHabits));
    }
  };

  const generateInsights = () => {
    const aiInsights: HabitInsight[] = [
      {
        id: '1',
        habitId: '1',
        type: 'encouragement',
        message: 'Your prayer consistency is excellent! You\'re building a strong spiritual foundation.',
        priority: 8,
        actionable: false
      },
      {
        id: '2',
        habitId: '2',
        type: 'optimization',
        message: 'Consider reading Quran right after Fajr prayer - your engagement is 40% higher in the morning.',
        priority: 9,
        actionable: true
      },
      {
        id: '3',
        habitId: '3',
        type: 'milestone',
        message: 'You\'re approaching your best dhikr streak! 13 more days to beat your record.',
        priority: 7,
        actionable: false
      },
      {
        id: '4',
        habitId: '5',
        type: 'adjustment',
        message: 'Charity habit needs attention. Try starting with just one small act per day.',
        priority: 10,
        actionable: true
      }
    ];

    setInsights(aiInsights);
  };

  const updateHabitProgress = (habitId: string, value: number) => {
    setHabits(prev => {
      const updated = prev.map(habit => {
        if (habit.id === habitId) {
          const newValue = Math.min(habit.targetValue, habit.currentValue + value);
          const isCompleted = newValue >= habit.targetValue;
          
          return {
            ...habit,
            currentValue: newValue,
            streak: isCompleted ? habit.streak + 1 : habit.streak,
            bestStreak: isCompleted ? Math.max(habit.bestStreak, habit.streak + 1) : habit.bestStreak,
            lastCompleted: isCompleted ? Date.now() : habit.lastCompleted
          };
        }
        return habit;
      });
      
      localStorage.setItem('intelligent-habits', JSON.stringify(updated));
      return updated;
    });

    toast({
      title: 'Progress Updated! 🌟',
      description: 'Your Islamic habits are being tracked and analyzed.',
    });
  };

  const resetDailyProgress = () => {
    setHabits(prev => {
      const reset = prev.map(habit => ({
        ...habit,
        currentValue: 0
      }));
      localStorage.setItem('intelligent-habits', JSON.stringify(reset));
      return reset;
    });
  };

  const toggleHabit = (habitId: string) => {
    setHabits(prev => {
      const updated = prev.map(habit => 
        habit.id === habitId ? { ...habit, isActive: !habit.isActive } : habit
      );
      localStorage.setItem('intelligent-habits', JSON.stringify(updated));
      return updated;
    });
  };

  const filteredHabits = habits.filter(habit => 
    selectedCategory === 'all' || habit.category === selectedCategory
  );

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'prayer': return '🕌';
      case 'quran': return '📖';
      case 'dhikr': return '📿';
      case 'charity': return '💝';
      case 'learning': return '📚';
      case 'reflection': return '🤔';
      default: return '⭐';
    }
  };

  const categories = ['all', 'prayer', 'quran', 'dhikr', 'charity', 'learning', 'reflection'];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-green-600" />
            Intelligent Habit Tracker
          </CardTitle>
          <p className="text-sm text-gray-600">AI-powered Islamic habit formation</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {habits.filter(h => h.currentValue >= h.targetValue).length}
              </div>
              <div className="text-xs text-gray-600">Completed Today</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {Math.max(...habits.map(h => h.streak))}
              </div>
              <div className="text-xs text-gray-600">Best Streak</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {habits.filter(h => h.isActive).length}
              </div>
              <div className="text-xs text-gray-600">Active Habits</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Math.round(habits.reduce((sum, h) => sum + (h.currentValue / h.targetValue) * 100, 0) / habits.length)}%
              </div>
              <div className="text-xs text-gray-600">Daily Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category as any)}
                className="flex items-center gap-2"
              >
                <span>{getCategoryIcon(category)}</span>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {insights.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.slice(0, 3).map(insight => (
                <div key={insight.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      insight.type === 'encouragement' ? 'bg-green-500' :
                      insight.type === 'optimization' ? 'bg-blue-500' :
                      insight.type === 'milestone' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm">{insight.message}</p>
                      {insight.actionable && (
                        <Button size="sm" variant="outline" className="mt-2">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHabits.map(habit => (
          <Card key={habit.id} className={`transition-all ${habit.isActive ? '' : 'opacity-60'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(habit.category)}</span>
                  <div>
                    <CardTitle className="text-lg">{habit.name}</CardTitle>
                    <p className="text-sm text-gray-600" dir="rtl">{habit.nameArabic}</p>
                  </div>
                </div>
                <Switch
                  checked={habit.isActive}
                  onCheckedChange={() => toggleHabit(habit.id)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {habit.currentValue}/{habit.targetValue} {habit.unit}
                  </span>
                  <span className="text-sm text-gray-600">
                    {Math.round((habit.currentValue / habit.targetValue) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(habit.currentValue / habit.targetValue) * 100} 
                  className="h-3"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="font-bold text-orange-600">{habit.streak}</span>
                  </div>
                  <div className="text-xs text-gray-600">Current Streak</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-yellow-600">{habit.bestStreak}</span>
                  </div>
                  <div className="text-xs text-gray-600">Best Streak</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-purple-500" />
                    <span className="font-bold text-purple-600">{habit.importance}/10</span>
                  </div>
                  <div className="text-xs text-gray-600">Importance</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => updateHabitProgress(habit.id, 1)}
                  disabled={!habit.isActive || habit.currentValue >= habit.targetValue}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  +1
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateHabitProgress(habit.id, habit.targetValue)}
                  disabled={!habit.isActive || habit.currentValue >= habit.targetValue}
                >
                  Complete
                </Button>
              </div>

              {/* AI Suggestions */}
              {habit.aiSuggestions && habit.aiSuggestions.length > 0 && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">AI Suggestions</span>
                  </div>
                  <ul className="text-xs text-blue-700 space-y-1">
                    {habit.aiSuggestions.map((suggestion, index) => (
                      <li key={index}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={resetDailyProgress} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Reset Daily Progress
            </Button>
            <Button onClick={generateInsights} variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh AI Insights
            </Button>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Set Weekly Goals
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligentHabitTracker;
