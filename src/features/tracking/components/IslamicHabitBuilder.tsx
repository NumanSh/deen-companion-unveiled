
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Trophy, Flame, Star, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface IslamicHabit {
  id: string;
  nameKey: string;
  descriptionKey: string;
  streak: number;
  completedToday: boolean;
  level: number;
  xp: number;
  category: 'worship' | 'knowledge' | 'character' | 'health';
}

const IslamicHabitBuilder: React.FC = () => {
  const { t } = useLanguage();
  const [habits, setHabits] = useState<IslamicHabit[]>([
    {
      id: '1',
      nameKey: 'morning-adhkar',
      descriptionKey: 'recite-morning-remembrance',
      streak: 5,
      completedToday: false,
      level: 1,
      xp: 50,
      category: 'worship'
    },
    {
      id: '2',
      nameKey: 'read-quran',
      descriptionKey: 'read-one-page-daily',
      streak: 12,
      completedToday: true,
      level: 2,
      xp: 120,
      category: 'knowledge'
    },
    {
      id: '3',
      nameKey: 'make-dua-parents',
      descriptionKey: 'remember-parents-prayers',
      streak: 8,
      completedToday: false,
      level: 1,
      xp: 80,
      category: 'character'
    }
  ]);

  const { toast } = useToast();

  const completeHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId && !habit.completedToday) {
        const newXp = habit.xp + 10;
        const newLevel = Math.floor(newXp / 100) + 1;
        const newStreak = habit.streak + 1;
        
        toast({
          title: `${t('habit-completed')} 🎉`,
          description: `+10 ${t('points')} ${t(habit.nameKey)}. ${t('streak-days')}: ${newStreak}!`,
        });

        if (newLevel > habit.level) {
          toast({
            title: `${t('level-up')} 🌟`,
            description: `${t(habit.nameKey)} ${t('reached-level')} ${newLevel}!`,
          });
        }

        return {
          ...habit,
          completedToday: true,
          streak: newStreak,
          xp: newXp,
          level: newLevel
        };
      }
      return habit;
    }));
  };

  const getTotalXP = () => habits.reduce((total, habit) => total + habit.xp, 0);
  const getOverallLevel = () => Math.floor(getTotalXP() / 300) + 1;
  const completedToday = habits.filter(h => h.completedToday).length;
  const totalHabits = habits.length;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'worship': return 'bg-green-100 text-green-800 border-green-200';
      case 'knowledge': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'character': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'health': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelProgress = (xp: number, level: number) => {
    const currentLevelXP = (level - 1) * 100;
    const nextLevelXP = level * 100;
    return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-600" />
          {t('islamic-habit-builder')}
        </CardTitle>
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800/20 dark:to-orange-800/20 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{t('overall-level')} {getOverallLevel()}</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              {getTotalXP()} XP
            </span>
          </div>
          <Progress value={getLevelProgress(getTotalXP(), getOverallLevel())} className="h-3" />
          <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            {completedToday}/{totalHabits} {t('habits-completed-today')}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Habits List */}
        {habits.map((habit) => (
          <div key={habit.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{t(habit.nameKey)}</h4>
                  <Badge className={getCategoryColor(habit.category)}>
                    {t(habit.category)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t(habit.descriptionKey)}
                </p>
                
                {/* Habit Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>{habit.streak} {t('streak-days')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>Lv.{habit.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-blue-500" />
                    <span>{habit.xp} XP</span>
                  </div>
                </div>

                {/* Level Progress */}
                <div className="mt-2">
                  <Progress 
                    value={getLevelProgress(habit.xp, habit.level)} 
                    className="h-2" 
                  />
                </div>
              </div>
              
              <Button
                onClick={() => completeHabit(habit.id)}
                disabled={habit.completedToday}
                size="sm"
                className={habit.completedToday ? 'bg-green-600' : 'bg-amber-600 hover:bg-amber-700'}
              >
                {habit.completedToday ? `✅ ${t('done')}` : t('complete')}
              </Button>
            </div>
          </div>
        ))}

        {/* Achievement Section */}
        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-800/20 dark:to-amber-800/20 p-4 rounded-lg">
          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            {t('recent-achievement')}
          </h4>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            🏆 {t('consistent-reader')}
          </p>
        </div>

        {/* Add New Habit */}
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          {t('add-new-islamic-habit')}
        </Button>

        {/* Motivational Quote */}
        <div className="bg-amber-100 dark:bg-amber-800/20 p-3 rounded-lg text-center">
          <p className="text-sm italic text-amber-800 dark:text-amber-200">
            {t('most-beloved-deeds')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicHabitBuilder;
