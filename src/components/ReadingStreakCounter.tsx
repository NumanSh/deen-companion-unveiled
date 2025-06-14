
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Trophy, Target, Calendar } from 'lucide-react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  lastReadDate: string | null;
}

const ReadingStreakCounter: React.FC = () => {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 7,
    longestStreak: 15,
    totalDays: 45,
    lastReadDate: new Date().toDateString()
  });

  const [showCelebration, setShowCelebration] = useState(false);

  const markTodayAsRead = () => {
    const today = new Date().toDateString();
    if (streakData.lastReadDate !== today) {
      setStreakData(prev => ({
        ...prev,
        currentStreak: prev.currentStreak + 1,
        longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
        totalDays: prev.totalDays + 1,
        lastReadDate: today
      }));
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return { level: 'Master', color: 'text-purple-600', icon: '🏆' };
    if (streak >= 14) return { level: 'Expert', color: 'text-gold-600', icon: '⭐' };
    if (streak >= 7) return { level: 'Committed', color: 'text-green-600', icon: '🌟' };
    if (streak >= 3) return { level: 'Growing', color: 'text-blue-600', icon: '🌱' };
    return { level: 'Beginner', color: 'text-gray-600', icon: '📖' };
  };

  const streakLevel = getStreakLevel(streakData.currentStreak);
  const isReadToday = streakData.lastReadDate === new Date().toDateString();

  return (
    <Card className="relative overflow-hidden">
      {showCelebration && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse z-10 flex items-center justify-center">
          <div className="text-4xl animate-bounce">🎉</div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Reading Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Streak */}
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 flex items-center justify-center gap-2">
            <Flame className="w-8 h-8" />
            {streakData.currentStreak}
          </div>
          <p className="text-sm text-muted-foreground mt-1">Days in a row</p>
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 mt-2 ${streakLevel.color}`}>
            <span>{streakLevel.icon}</span>
            <span className="text-sm font-medium">{streakLevel.level}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Trophy className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <div className="font-semibold text-blue-800 dark:text-blue-200">
              {streakData.longestStreak}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-300">Longest Streak</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <div className="font-semibold text-green-800 dark:text-green-200">
              {streakData.totalDays}
            </div>
            <div className="text-xs text-green-600 dark:text-green-300">Total Days</div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={markTodayAsRead}
          disabled={isReadToday}
          className={`w-full ${isReadToday ? 'bg-green-600 hover:bg-green-600' : ''}`}
        >
          {isReadToday ? (
            <>✅ Completed Today</>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" />
              Mark Today as Read
            </>
          )}
        </Button>

        {/* Motivation */}
        <div className="text-center text-sm text-muted-foreground">
          {streakData.currentStreak === 0 ? (
            "Start your reading journey today! 🌟"
          ) : streakData.currentStreak < 7 ? (
            "You're building a great habit! Keep going! 💪"
          ) : (
            "Amazing dedication! You're an inspiration! 🎯"
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingStreakCounter;
