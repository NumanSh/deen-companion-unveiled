import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Award, 
  Calendar,
  Clock,
  BarChart3,
  Star,
  Lightbulb,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  totalPrayers: number;
  onTimePercentage: number;
  currentStreak: number;
  spiritualScore: number;
  weeklyGoal: number;
}

const IntelligentPrayerAnalytics = () => {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [insights, setInsights] = useState<Array<{
    type: string;
    title: string;
    description: string;
    icon: string;
    priority: string;
  }>>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    // Mock analytics data
    const mockAnalytics: AnalyticsData = {
      totalPrayers: 28,
      onTimePercentage: 85,
      currentStreak: 7,
      spiritualScore: 92,
      weeklyGoal: 35
    };

    setAnalytics(mockAnalytics);

    const mockInsights = [
      {
        type: 'pattern',
        title: 'Fajr Excellence',
        description: 'You\'ve been consistently praying Fajr on time this week! Your early morning spirituality is strong.',
        icon: '🌅',
        priority: 'high'
      },
      {
        type: 'improvement',
        title: 'Evening Prayers',
        description: 'Consider setting reminders for Maghrib and Isha to maintain your consistency throughout the day.',
        icon: '🌙',
        priority: 'medium'
      },
      {
        type: 'achievement',
        title: 'Weekly Milestone',
        description: 'Congratulations! You\'ve reached 80% of your weekly prayer goal. Keep up the excellent work!',
        icon: '🏆',
        priority: 'high'
      }
    ];

    setInsights(mockInsights);
  };

  const generatePersonalizedTip = () => {
    const tips = [
      "Try reciting different surahs to keep your prayers engaging and meaningful.",
      "Consider incorporating more dhikr after your prayers for deeper spiritual connection.",
      "Set gentle reminders 10 minutes before each prayer time to prepare mentally.",
      "Use a prayer rug and face the same direction consistently to build routine."
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    toast({
      title: "Personal Prayer Tip 💡",
      description: randomTip,
    });
  };

  if (!analytics) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading prayer analytics...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Intelligent Prayer Analytics</h2>
        <p className="text-gray-600 dark:text-gray-400">
          AI-powered insights to enhance your spiritual journey
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{analytics.totalPrayers}</div>
            <div className="text-xs text-gray-600">Total Prayers</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{analytics.onTimePercentage}%</div>
            <div className="text-xs text-gray-600">On Time</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{analytics.currentStreak}</div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{analytics.spiritualScore}</div>
            <div className="text-xs text-gray-600">Spiritual Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Prayer Goal Progress</span>
              <span className="text-sm text-gray-600">
                {analytics.totalPrayers} / {analytics.weeklyGoal}
              </span>
            </div>
            <Progress 
              value={(analytics.totalPrayers / analytics.weeklyGoal) * 100} 
              className="h-3"
            />
            <p className="text-xs text-gray-600">
              {analytics.weeklyGoal - analytics.totalPrayers} prayers remaining to reach your weekly goal
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {insight.priority} priority
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={generatePersonalizedTip} variant="outline">
              <Lightbulb className="w-4 h-4 mr-2" />
              Get Prayer Tip
            </Button>
            <Button onClick={loadAnalytics} variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligentPrayerAnalytics;