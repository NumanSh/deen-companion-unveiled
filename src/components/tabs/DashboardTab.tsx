
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, BookOpen, Clock, Target, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import PrayerTimesWidget from '@/components/PrayerTimesWidget';
import QuranicWordLearning from '@/components/QuranicWordLearning';
import SmartLearningDashboard from '@/components/SmartLearningDashboard';

const DashboardTab = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Day Streak', value: '7', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Minutes Read', value: '45', icon: Clock, color: 'text-blue-600' },
    { label: 'Surahs Read', value: '3', icon: BookOpen, color: 'text-purple-600' },
    { label: 'Goals Met', value: '5/7', icon: Target, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Smart Learning Dashboard - NEW FEATURE */}
      <SmartLearningDashboard />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prayer Times Widget */}
        <PrayerTimesWidget />

        {/* Today's Progress */}
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Prayers Completed</span>
                  <span>4/5</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Quran Reading</span>
                  <span>30/30 min</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Dhikr Count</span>
                  <span>75/100</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/books?tab=habits')}
            >
              View All Goals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quranic Word Learning */}
      <QuranicWordLearning />

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/books?tab=quran')}
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">Read Quran</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/prayer-times')}
            >
              <Clock className="w-6 h-6" />
              <span className="text-xs">Prayer Times</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/books?tab=duas')}
            >
              <Star className="w-6 h-6" />
              <span className="text-xs">Daily Duas</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/calendar')}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Islamic Calendar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;
