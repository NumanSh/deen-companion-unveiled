
import React from 'react';
import BottomTabBar from '@/components/BottomTabBar';
import QuranicVerseOfDay from '@/components/QuranicVerseOfDay';
import PrayerNotifications from '@/components/PrayerNotifications';
import TasbihCounter from '@/components/TasbihCounter';
import ReadingStreakCounter from '@/components/ReadingStreakCounter';
import DailyProgress from '@/components/DailyProgress';
import QuickAccessWidget from '@/components/QuickAccessWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Heart, Target, Star, Calendar, Compass } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
              <path d="M20,12 L28,20 L20,28 L12,20 Z" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
        </svg>
      </div>

      <div className="flex-1 px-4 py-6 relative">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Enhanced Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="relative inline-flex items-center gap-3">
              <div className="relative">
                <BookOpen className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                <Star className="w-4 h-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 via-blue-700 to-purple-700 dark:from-emerald-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Deen Companion
              </h1>
              <div className="relative">
                <Heart className="w-10 h-10 text-rose-500 dark:text-rose-400" />
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </div>
            <p className="text-xl text-emerald-700 dark:text-emerald-300 font-medium">
              Your comprehensive Islamic companion for spiritual growth
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Prayer Times</span>
              </div>
              <div className="flex items-center gap-1">
                <Compass className="w-4 h-4" />
                <span>Qibla Direction</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>Progress Tracking</span>
              </div>
            </div>
          </div>

          {/* Quick Access Widget */}
          <QuickAccessWidget />

          {/* Daily Progress Overview */}
          <DailyProgress />

          {/* Reading Streak Counter */}
          <ReadingStreakCounter />

          {/* Enhanced Verse of the Day */}
          <QuranicVerseOfDay />

          {/* Prayer Notifications */}
          <PrayerNotifications />

          {/* Digital Tasbih Counter */}
          <TasbihCounter />

          {/* Achievement Summary */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-medium">7-Day Streak</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Daily Quran Reading</div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">📖</div>
                  <div className="text-sm font-medium">50 Verses</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">This Month</div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🤲</div>
                  <div className="text-sm font-medium">1000 Dhikr</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">This Week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Home;
