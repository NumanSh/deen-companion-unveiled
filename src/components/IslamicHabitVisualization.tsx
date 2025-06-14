
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Flame, Trophy, Target, TrendingUp, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HabitDay {
  date: string;
  completed: boolean;
  level: 'missed' | 'partial' | 'complete' | 'excellent';
}

interface IslamicHabit {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  completionRate: number;
  lastSevenDays: HabitDay[];
  category: 'prayer' | 'reading' | 'dhikr' | 'charity' | 'fasting';
  goal: number;
}

const IslamicHabitVisualization = () => {
  const { toast } = useToast();
  const [habits, setHabits] = useState<IslamicHabit[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    // Sample habit data
    const sampleHabits: IslamicHabit[] = [
      {
        id: '1',
        name: 'Five Daily Prayers',
        nameArabic: 'الصلوات الخمس',
        description: 'Complete all five daily prayers on time',
        currentStreak: 12,
        longestStreak: 45,
        totalDays: 180,
        completionRate: 89,
        lastSevenDays: [
          { date: '2024-01-08', completed: true, level: 'excellent' },
          { date: '2024-01-09', completed: true, level: 'complete' },
          { date: '2024-01-10', completed: false, level: 'missed' },
          { date: '2024-01-11', completed: true, level: 'complete' },
          { date: '2024-01-12', completed: true, level: 'excellent' },
          { date: '2024-01-13', completed: true, level: 'excellent' },
          { date: '2024-01-14', completed: true, level: 'complete' }
        ],
        category: 'prayer',
        goal: 5
      },
      {
        id: '2',
        name: 'Quran Reading',
        nameArabic: 'قراءة القرآن',
        description: 'Read at least one page of Quran daily',
        currentStreak: 8,
        longestStreak: 32,
        totalDays: 120,
        completionRate: 75,
        lastSevenDays: [
          { date: '2024-01-08', completed: true, level: 'complete' },
          { date: '2024-01-09', completed: true, level: 'excellent' },
          { date: '2024-01-10', completed: true, level: 'partial' },
          { date: '2024-01-11', completed: false, level: 'missed' },
          { date: '2024-01-12', completed: true, level: 'complete' },
          { date: '2024-01-13', completed: true, level: 'excellent' },
          { date: '2024-01-14', completed: true, level: 'complete' }
        ],
        category: 'reading',
        goal: 1
      },
      {
        id: '3',
        name: 'Morning Dhikr',
        nameArabic: 'أذكار الصباح',
        description: 'Complete morning remembrance of Allah',
        currentStreak: 15,
        longestStreak: 28,
        totalDays: 90,
        completionRate: 82,
        lastSevenDays: [
          { date: '2024-01-08', completed: true, level: 'excellent' },
          { date: '2024-01-09', completed: true, level: 'complete' },
          { date: '2024-01-10', completed: true, level: 'complete' },
          { date: '2024-01-11', completed: true, level: 'excellent' },
          { date: '2024-01-12', completed: true, level: 'complete' },
          { date: '2024-01-13', completed: false, level: 'missed' },
          { date: '2024-01-14', completed: true, level: 'excellent' }
        ],
        category: 'dhikr',
        goal: 1
      }
    ];
    setHabits(sampleHabits);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-green-500';
      case 'complete': return 'bg-blue-500';
      case 'partial': return 'bg-yellow-500';
      case 'missed': return 'bg-gray-300';
      default: return 'bg-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'prayer': return '🤲';
      case 'reading': return '📖';
      case 'dhikr': return '📿';
      case 'charity': return '💰';
      case 'fasting': return '🌙';
      default: return '⭐';
    }
  };

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return { text: 'Master', color: 'bg-purple-500 text-white' };
    if (streak >= 14) return { text: 'Champion', color: 'bg-gold-500 text-white' };
    if (streak >= 7) return { text: 'Consistent', color: 'bg-green-500 text-white' };
    if (streak >= 3) return { text: 'Building', color: 'bg-blue-500 text-white' };
    return { text: 'Starting', color: 'bg-gray-500 text-white' };
  };

  const calculateWeeklyProgress = (days: HabitDay[]) => {
    const completed = days.filter(day => day.completed).length;
    return Math.round((completed / days.length) * 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          مرئيات العادات الإسلامية
        </CardTitle>
        <p className="text-sm text-gray-600">تتبع وتحليل عاداتك الإسلامية بطريقة بصرية</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Period Selection */}
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map(period => (
            <Button
              key={period}
              size="sm"
              variant={selectedPeriod === period ? "default" : "outline"}
              onClick={() => setSelectedPeriod(period)}
            >
              {period === 'week' ? 'أسبوع' : period === 'month' ? 'شهر' : 'سنة'}
            </Button>
          ))}
        </div>

        {/* Habits List */}
        <div className="space-y-6">
          {habits.map(habit => {
            const streakBadge = getStreakBadge(habit.currentStreak);
            const weeklyProgress = calculateWeeklyProgress(habit.lastSevenDays);
            
            return (
              <div key={habit.id} className="border rounded-lg p-6 bg-white">
                {/* Habit Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCategoryIcon(habit.category)}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{habit.name}</h3>
                      <p className="text-right text-gray-600" dir="rtl">{habit.nameArabic}</p>
                      <p className="text-sm text-gray-500">{habit.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={streakBadge.color}>
                      <Flame className="w-3 h-3 mr-1" />
                      {habit.currentStreak} أيام
                    </Badge>
                  </div>
                </div>

                {/* Visual Progress */}
                <div className="space-y-4">
                  {/* 7-Day Grid */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">آخر 7 أيام</span>
                      <span className="text-sm text-gray-500">{weeklyProgress}% مكتمل</span>
                    </div>
                    <div className="flex gap-1">
                      {habit.lastSevenDays.map((day, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded ${getLevelColor(day.level)} flex items-center justify-center text-white text-xs font-medium`}
                          title={`${day.date} - ${day.level}`}
                        >
                          {day.completed ? '✓' : '×'}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">
                        {habit.currentStreak}
                      </div>
                      <div className="text-xs text-gray-600">سلسلة حالية</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {habit.longestStreak}
                      </div>
                      <div className="text-xs text-gray-600">أطول سلسلة</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {habit.totalDays}
                      </div>
                      <div className="text-xs text-gray-600">إجمالي الأيام</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {habit.completionRate}%
                      </div>
                      <div className="text-xs text-gray-600">معدل الإكمال</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>التقدم الإجمالي</span>
                      <span>{habit.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${habit.completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Target className="w-4 h-4 mr-1" />
                      سجل اليوم
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4 mr-1" />
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievement Section */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5" />
            إنجازات الأسبوع
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>3 عادات مكتملة</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>أطول سلسلة: 15 يوم</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicHabitVisualization;
