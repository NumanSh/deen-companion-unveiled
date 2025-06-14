
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Target, 
  TrendingUp, 
  Award,
  Heart,
  Star,
  Flame,
  CheckCircle
} from 'lucide-react';
import DailyProgress from './DailyProgress';
import ReadingStreakCounter from './ReadingStreakCounter';

const EnhancedDashboard = () => {
  const quickStats = [
    {
      title: 'Verses Read Today',
      value: '42',
      change: '+12 from yesterday',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Prayer Streak',
      value: '7 days',
      change: 'Keep it up!',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Weekly Goal',
      value: '85%',
      change: '15% remaining',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Total Points',
      value: '1,247',
      change: '+38 today',
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const recentAchievements = [
    {
      title: 'First Week Complete',
      description: 'Completed 7 consecutive days of reading',
      icon: CheckCircle,
      earned: '2 days ago',
      points: 50
    },
    {
      title: 'Early Bird',
      description: 'Completed Fajr prayer 5 days in a row',
      icon: Star,
      earned: '1 week ago',
      points: 30
    },
    {
      title: 'Consistent Reader',
      description: 'Read Quran for 14 consecutive days',
      icon: Flame,
      earned: '2 weeks ago',
      points: 100
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border-emerald-200 dark:border-emerald-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                As-salamu alaykum! 🌙
              </h2>
              <p className="text-emerald-600 dark:text-emerald-400 mt-1">
                Continue your spiritual journey today
              </p>
            </div>
            <div className="text-4xl animate-pulse">☪️</div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.bgColor} border-0`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs">
                  Today
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Progress Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyProgress />
        <ReadingStreakCounter />
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <achievement.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    +{achievement.points} pts
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Earned {achievement.earned}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Read Quran</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Heart className="w-5 h-5" />
              <span className="text-xs">Dhikr</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Prayer Times</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Target className="w-5 h-5" />
              <span className="text-xs">Set Goals</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDashboard;
