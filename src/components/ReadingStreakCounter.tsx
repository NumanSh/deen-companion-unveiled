
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Target, Calendar, Trophy, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReadingStreakCounter: React.FC = () => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(15);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState(7);
  const [monthlyGoal, setMonthlyGoal] = useState(30);
  const [versesReadToday, setVersesReadToday] = useState(12);
  const [weeklyProgress, setWeeklyProgress] = useState(5);
  const [monthlyProgress, setMonthlyProgress] = useState(22);
  const { toast } = useToast();

  const markTodayComplete = () => {
    if (!todayCompleted) {
      setTodayCompleted(true);
      setCurrentStreak(prev => prev + 1);
      setWeeklyProgress(prev => prev + 1);
      setMonthlyProgress(prev => prev + 1);
      
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
        toast({
          title: "🏆 New Record!",
          description: `New longest streak: ${currentStreak + 1} days!`,
        });
      } else {
        toast({
          title: "🔥 Streak Continued!",
          description: `Day ${currentStreak + 1} of your reading journey!`,
        });
      }
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 14) return 'text-blue-600';
    if (streak >= 7) return 'text-green-600';
    return 'text-orange-600';
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🏆';
    if (streak >= 14) return '💎';
    if (streak >= 7) return '🔥';
    return '⭐';
  };

  const weeklyPercentage = (weeklyProgress / weeklyGoal) * 100;
  const monthlyPercentage = (monthlyProgress / monthlyGoal) * 100;

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-600" />
            Reading Streaks & Goals
          </div>
          <div className="text-2xl">
            {getStreakEmoji(currentStreak)}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Streak Display */}
        <div className="text-center bg-white/60 dark:bg-gray-800/60 rounded-lg p-6">
          <div className={`text-6xl font-bold mb-2 ${getStreakColor(currentStreak)}`}>
            {currentStreak}
          </div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Day Streak
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Longest: {longestStreak} days
          </div>
          
          {/* Today's Status */}
          <div className="mt-4">
            {todayCompleted ? (
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
                ✅ Today's reading completed!
              </div>
            ) : (
              <Button 
                onClick={markTodayComplete}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Mark Today Complete
              </Button>
            )}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weekly Goal */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800 dark:text-blue-200">Weekly Goal</span>
              </div>
              <span className="text-sm text-blue-600 dark:text-blue-400">
                {weeklyProgress}/{weeklyGoal}
              </span>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(weeklyPercentage, 100)}%` }}
              />
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {weeklyPercentage.toFixed(0)}% Complete
            </div>
          </div>

          {/* Monthly Goal */}
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-purple-800 dark:text-purple-200">Monthly Goal</span>
              </div>
              <span className="text-sm text-purple-600 dark:text-purple-400">
                {monthlyProgress}/{monthlyGoal}
              </span>
            </div>
            <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(monthlyPercentage, 100)}%` }}
              />
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              {monthlyPercentage.toFixed(0)}% Complete
            </div>
          </div>
        </div>

        {/* Today's Reading Stats */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-green-800 dark:text-green-200">
                Today's Progress
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                {versesReadToday} verses read
              </div>
            </div>
            <div className="text-3xl">📖</div>
          </div>
        </div>

        {/* Motivational Messages */}
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
            {currentStreak >= 7 
              ? "🌟 Amazing dedication! Keep up the excellent work!"
              : "💪 Building a strong reading habit, one day at a time!"
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingStreakCounter;
