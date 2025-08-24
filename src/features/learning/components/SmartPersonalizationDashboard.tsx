
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Target, 
  Flame, 
  Clock, 
  Star, 
  TrendingUp,
  Calendar,
  Heart,
  Award,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserStats {
  currentStreak: number;
  totalMinutesRead: number;
  versesRead: number;
  favoriteSurah: string;
  weeklyGoal: number;
  weeklyProgress: number;
  achievements: string[];
  lastReadDate: string;
}

const SmartPersonalizationDashboard = () => {
  const { toast } = useToast();
  const [userStats, setUserStats] = useState<UserStats>({
    currentStreak: 5,
    totalMinutesRead: 240,
    versesRead: 127,
    favoriteSurah: 'Al-Fatiha',
    weeklyGoal: 300,
    weeklyProgress: 240,
    achievements: ['7-Day Streak', 'Early Bird', 'Consistent Reader'],
    lastReadDate: new Date().toISOString()
  });

  const [timeOfDay, setTimeOfDay] = useState('');
  const [personalizedMessage, setPersonalizedMessage] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
      setPersonalizedMessage('Start your day with the beauty of the Quran');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
      setPersonalizedMessage('Take a peaceful break with some verses');
    } else {
      setTimeOfDay('evening');
      setPersonalizedMessage('Reflect on your day with evening recitation');
    }
  }, []);

  const weeklyProgressPercentage = (userStats.weeklyProgress / userStats.weeklyGoal) * 100;

  const handleQuickAction = (action: string) => {
    toast({
      title: `Opening ${action}`,
      description: 'Continue your spiritual journey',
      duration: 1500,
    });
  };

  const recentAchievements = userStats.achievements.slice(-2);

  return (
    <div className="space-y-4">
      {/* Personalized Greeting */}
      <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">
                {timeOfDay === 'morning' ? 'صباح الخير' : 
                 timeOfDay === 'afternoon' ? 'مساء الخير' : 'مساء النور'}
              </h2>
              <p className="text-emerald-100 text-sm">{personalizedMessage}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-emerald-100">
                <Flame className="w-4 h-4" />
                <span className="font-bold">{userStats.currentStreak}</span>
              </div>
              <p className="text-xs text-emerald-200">day streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-700">{userStats.totalMinutesRead}</div>
            <div className="text-xs text-blue-600">minutes read</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-700">{userStats.versesRead}</div>
            <div className="text-xs text-purple-600">verses read</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-emerald-600" />
            Weekly Reading Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{userStats.weeklyProgress} min</span>
              <span className="text-gray-500">{userStats.weeklyGoal} min</span>
            </div>
            <Progress value={weeklyProgressPercentage} className="h-3" />
            <div className="text-center">
              <span className="text-xs text-gray-600">
                {Math.round(weeklyProgressPercentage)}% complete
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-yellow-600" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {recentAchievements.map((achievement, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-yellow-100 text-yellow-800 border-yellow-300"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {achievement}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Smart Recommendations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-indigo-600" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => handleQuickAction('Continue Reading')}
            >
              <div className="text-left">
                <div className="font-medium text-sm">Continue Surah {userStats.favoriteSurah}</div>
                <div className="text-xs text-gray-500">Pick up where you left off</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => handleQuickAction('Morning Dhikr')}
            >
              <div className="text-left">
                <div className="font-medium text-sm">Morning Dhikr</div>
                <div className="text-xs text-gray-500">Start your day with remembrance</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartPersonalizationDashboard;
