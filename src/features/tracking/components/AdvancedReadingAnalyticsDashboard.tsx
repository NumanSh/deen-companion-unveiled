import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Book, TrendingUp, Clock, Target, Award, Calendar } from 'lucide-react';

interface ReadingStats {
  totalSurahs: number;
  completedSurahs: number;
  currentStreak: number;
  totalMinutes: number;
  averagePerDay: number;
  weeklyGoal: number;
}

const AdvancedReadingAnalyticsDashboard: React.FC = () => {
  const [stats] = useState<ReadingStats>({
    totalSurahs: 114,
    completedSurahs: 45,
    currentStreak: 12,
    totalMinutes: 2340,
    averagePerDay: 23,
    weeklyGoal: 160
  });

  const weeklyProgress = (stats.totalMinutes / 7 / stats.weeklyGoal) * 100;
  const completionRate = (stats.completedSurahs / stats.totalSurahs) * 100;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Surahs Read</p>
                <p className="text-2xl font-bold">{stats.completedSurahs}/{stats.totalSurahs}</p>
              </div>
              <Book className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold">{stats.currentStreak} days</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="text-2xl font-bold">{Math.floor(stats.totalMinutes / 60)}h</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Average</p>
                <p className="text-2xl font-bold">{stats.averagePerDay}m</p>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-green-600" />
              Quran Completion Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{completionRate.toFixed(1)}%</span>
              </div>
              <Progress value={completionRate} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{stats.completedSurahs}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{stats.totalSurahs - stats.completedSurahs}</p>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Weekly Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">This Week</span>
                <span className="text-sm text-gray-600">{weeklyProgress.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(weeklyProgress, 100)} className="h-3" />
              
              <div className="text-center mt-4">
                <p className="text-2xl font-bold">{Math.floor(stats.totalMinutes / 7)}/{stats.weeklyGoal}</p>
                <p className="text-sm text-gray-600">minutes this week</p>
                
                {weeklyProgress >= 100 && (
                  <Badge className="mt-2 bg-green-100 text-green-800">
                    <Award className="w-3 h-3 mr-1" />
                    Weekly Goal Achieved!
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">12-Day Streak</h3>
                <p className="text-sm text-gray-600">Consistent daily reading for 12 days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Surah Al-Baqarah Complete</h3>
                <p className="text-sm text-gray-600">Finished the longest surah</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">1000 Minutes Milestone</h3>
                <p className="text-sm text-gray-600">Reached 1000 minutes of total reading time</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedReadingAnalyticsDashboard;