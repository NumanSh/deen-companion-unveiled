
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Calendar, Trophy, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface HabitStreak {
  id: string;
  name: string;
  currentStreak: number;
  longestStreak: number;
  lastCompleted: string;
  category: 'worship' | 'knowledge' | 'character';
}

const SpiritualHabitStreaks = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [habits, setHabits] = useState<HabitStreak[]>([
    {
      id: '1',
      name: 'قراءة القرآن يومياً',
      currentStreak: 12,
      longestStreak: 25,
      lastCompleted: new Date().toISOString(),
      category: 'worship'
    },
    {
      id: '2', 
      name: 'أذكار الصباح والمساء',
      currentStreak: 8,
      longestStreak: 15,
      lastCompleted: new Date().toISOString(),
      category: 'worship'
    },
    {
      id: '3',
      name: 'تعلم حديث جديد',
      currentStreak: 5,
      longestStreak: 12,
      lastCompleted: new Date().toISOString(),
      category: 'knowledge'
    },
    {
      id: '4',
      name: 'بر الوالدين',
      currentStreak: 18,
      longestStreak: 30,
      lastCompleted: new Date().toISOString(),
      category: 'character'
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'worship': return 'bg-green-100 text-green-800';
      case 'knowledge': return 'bg-blue-100 text-blue-800';
      case 'character': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (streak >= 15) return <Star className="w-5 h-5 text-yellow-500" />;
    if (streak >= 7) return <Flame className="w-5 h-5 text-orange-500" />;
    return <Calendar className="w-5 h-5 text-gray-500" />;
  };

  const completeHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newStreak = habit.currentStreak + 1;
        return {
          ...habit,
          currentStreak: newStreak,
          longestStreak: Math.max(habit.longestStreak, newStreak),
          lastCompleted: new Date().toISOString()
        };
      }
      return habit;
    }));

    toast({
      title: '🔥 السلسلة مستمرة!',
      description: 'تم تسجيل إنجاز العادة اليوم. بارك الله فيك!',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500" />
          متتبع سلاسل العادات الروحية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {habits.map((habit) => (
            <div key={habit.id} className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStreakIcon(habit.currentStreak)}
                  <div>
                    <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                    <Badge className={getCategoryColor(habit.category)}>
                      {habit.category === 'worship' ? 'عبادة' : 
                       habit.category === 'knowledge' ? 'علم' : 'أخلاق'}
                    </Badge>
                  </div>
                </div>
                <Button 
                  onClick={() => completeHabit(habit.id)}
                  className="bg-green-500 hover:bg-green-600"
                  size="sm"
                >
                  تم اليوم
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex gap-4">
                  <span>السلسلة الحالية: <strong className="text-orange-600">{habit.currentStreak} يوم</strong></span>
                  <span>أطول سلسلة: <strong className="text-blue-600">{habit.longestStreak} يوم</strong></span>
                </div>
              </div>
              
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((habit.currentStreak / 30) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">إحصائيات الأسبوع</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600">العادات النشطة:</span>
              <span className="font-bold"> {habits.filter(h => h.currentStreak > 0).length}</span>
            </div>
            <div>
              <span className="text-blue-600">إجمالي الأيام:</span>
              <span className="font-bold"> {habits.reduce((sum, h) => sum + h.currentStreak, 0)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpiritualHabitStreaks;
