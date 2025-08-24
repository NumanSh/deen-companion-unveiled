
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Target, Calendar, Trophy, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastReadingDate: string;
  weeklyProgress: number;
  monthlyProgress: number;
  versesReadToday: number;
  totalVersesRead: number;
}

const ReadingStreakCounter: React.FC = () => {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastReadingDate: '',
    weeklyProgress: 0,
    monthlyProgress: 0,
    versesReadToday: 0,
    totalVersesRead: 0
  });
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const weeklyGoal = 7;
  const monthlyGoal = 30;
  const { toast } = useToast();

  // Load streak data from localStorage
  useEffect(() => {
    const loadStreakData = () => {
      const savedData = localStorage.getItem('readingStreakData');
      const today = new Date().toDateString();
      
      if (savedData) {
        const parsedData: StreakData = JSON.parse(savedData);
        
        // Check if streak should be reset (missed a day)
        const lastReadingDate = new Date(parsedData.lastReadingDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        // If last reading was not today or yesterday, reset streak
        if (parsedData.lastReadingDate !== today && 
            parsedData.lastReadingDate !== yesterday.toDateString()) {
          parsedData.currentStreak = 0;
        }
        
        // Check if today is already completed
        setTodayCompleted(parsedData.lastReadingDate === today);
        setStreakData(parsedData);
      } else {
        // Initialize with default values
        const defaultData: StreakData = {
          currentStreak: 0,
          longestStreak: 0,
          lastReadingDate: '',
          weeklyProgress: 0,
          monthlyProgress: 0,
          versesReadToday: 0,
          totalVersesRead: 0
        };
        setStreakData(defaultData);
        localStorage.setItem('readingStreakData', JSON.stringify(defaultData));
      }
      setIsLoading(false);
    };

    loadStreakData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('readingStreakData', JSON.stringify(streakData));
    }
  }, [streakData, isLoading]);

  const markTodayComplete = () => {
    if (!todayCompleted) {
      const today = new Date().toDateString();
      const newStreak = streakData.currentStreak + 1;
      const versesToday = Math.floor(Math.random() * 15) + 5; // Random verses between 5-20
      
      setStreakData(prev => ({
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastReadingDate: today,
        weeklyProgress: Math.min(prev.weeklyProgress + 1, weeklyGoal),
        monthlyProgress: Math.min(prev.monthlyProgress + 1, monthlyGoal),
        versesReadToday: versesToday,
        totalVersesRead: prev.totalVersesRead + versesToday
      }));
      
      setTodayCompleted(true);
      
      if (newStreak > streakData.longestStreak) {
        toast({
          title: "🏆 New Record!",
          description: `New longest streak: ${newStreak} days!`,
        });
      } else {
        toast({
          title: "🔥 Streak Continued!",
          description: `Day ${newStreak} of your reading journey!`,
        });
      }
    }
  };

  const resetStreak = () => {
    const resetData: StreakData = {
      currentStreak: 0,
      longestStreak: streakData.longestStreak, // Keep longest streak
      lastReadingDate: '',
      weeklyProgress: 0,
      monthlyProgress: 0,
      versesReadToday: 0,
      totalVersesRead: streakData.totalVersesRead // Keep total verses
    };
    
    setStreakData(resetData);
    setTodayCompleted(false);
    
    toast({
      title: "Streak Reset",
      description: "Starting fresh! Your longest streak record is preserved.",
    });
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

  const weeklyPercentage = (streakData.weeklyProgress / weeklyGoal) * 100;
  const monthlyPercentage = (streakData.monthlyProgress / monthlyGoal) * 100;

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-600" />
            Reading Streaks & Goals
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl">
              {getStreakEmoji(streakData.currentStreak)}
            </div>
            <Button 
              onClick={resetStreak}
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              Reset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Streak Display */}
        <div className="text-center bg-white/60 dark:bg-gray-800/60 rounded-lg p-6">
          <div className={`text-6xl font-bold mb-2 ${getStreakColor(streakData.currentStreak)}`}>
            {streakData.currentStreak}
          </div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Day Streak
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Longest: {streakData.longestStreak} days
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Total verses read: {streakData.totalVersesRead}
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
                {streakData.weeklyProgress}/{weeklyGoal}
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
                {streakData.monthlyProgress}/{monthlyGoal}
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
                {streakData.versesReadToday} verses read
              </div>
            </div>
            <div className="text-3xl">📖</div>
          </div>
        </div>

        {/* Motivational Messages */}
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
            {streakData.currentStreak >= 7 
              ? "🌟 Amazing dedication! Keep up the excellent work!"
              : streakData.currentStreak > 0
              ? "💪 Building a strong reading habit, one day at a time!"
              : "🚀 Start your reading journey today!"
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingStreakCounter;
