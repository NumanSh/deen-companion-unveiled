
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calendar, Trophy, Target, Clock, Book, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressData {
  dailyDhikr: { date: string; count: number }[];
  readingSessions: { date: string; minutes: number }[];
  completedSurahs: string[];
  favoritesDuas: number;
  streak: number;
}

const ProgressAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  useEffect(() => {
    // Generate mock progress data - in real app, this would come from localStorage/API
    const generateMockData = () => {
      const now = new Date();
      const dates = [];
      const dhikrData = [];
      const readingData = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dates.push(dateStr);
        
        dhikrData.push({
          date: dateStr,
          count: Math.floor(Math.random() * 100) + 20
        });
        
        readingData.push({
          date: dateStr,
          minutes: Math.floor(Math.random() * 60) + 10
        });
      }

      setProgressData({
        dailyDhikr: dhikrData,
        readingSessions: readingData,
        completedSurahs: ['Al-Fatihah', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'],
        favoritesDuas: 12,
        streak: 7
      });
    };

    generateMockData();
  }, [timeframe]);

  const chartColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

  const activityData = progressData?.dailyDhikr.map((dhikr, index) => ({
    date: new Date(dhikr.date).toLocaleDateString('en', { weekday: 'short' }),
    dhikr: dhikr.count,
    reading: progressData.readingSessions[index]?.minutes || 0
  })) || [];

  const categoryData = [
    { name: 'Dhikr', value: progressData?.dailyDhikr.reduce((sum, d) => sum + d.count, 0) || 0, color: '#10b981' },
    { name: 'Reading', value: progressData?.readingSessions.reduce((sum, r) => sum + r.minutes, 0) || 0, color: '#3b82f6' },
    { name: 'Duas', value: (progressData?.favoritesDuas || 0) * 5, color: '#8b5cf6' },
  ];

  if (!progressData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Progress Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{progressData.streak}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Calendar className="w-3 h-3" />
              Day Streak
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {progressData.readingSessions.reduce((sum, r) => sum + r.minutes, 0)}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              Minutes Read
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{progressData.completedSurahs.length}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Book className="w-3 h-3" />
              Surahs Read
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {progressData.dailyDhikr.reduce((sum, d) => sum + d.count, 0)}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" />
              Total Dhikr
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-blue-600" />
              Weekly Activity
            </CardTitle>
            <div className="flex gap-1">
              {['week', 'month', 'year'].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(period as any)}
                  className="text-xs capitalize"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="dhikr" fill="#10b981" name="Dhikr Count" />
              <Bar dataKey="reading" fill="#3b82f6" name="Reading (min)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Activity Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium text-sm">7-Day Streak!</p>
                <p className="text-xs text-gray-600">Keep up the consistency</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <Book className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-sm">Chapter Complete</p>
                <p className="text-xs text-gray-600">Finished Al-Fatihah</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
              <Target className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium text-sm">Daily Goal Met</p>
                <p className="text-xs text-gray-600">100+ dhikr today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
