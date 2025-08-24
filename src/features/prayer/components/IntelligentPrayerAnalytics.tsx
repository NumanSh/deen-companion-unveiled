
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Clock, TrendingUp, Brain, Target, Award, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IntelligentPrayerAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<unknown>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const { toast } = useToast();

  const weeklyData = [
    { day: 'Mon', prayers: 4, onTime: 3, quality: 85 },
    { day: 'Tue', prayers: 5, onTime: 4, quality: 90 },
    { day: 'Wed', prayers: 3, onTime: 2, quality: 70 },
    { day: 'Thu', prayers: 5, onTime: 5, quality: 95 },
    { day: 'Fri', prayers: 5, onTime: 4, quality: 88 },
    { day: 'Sat', prayers: 4, onTime: 3, quality: 82 },
    { day: 'Sun', prayers: 5, onTime: 4, quality: 90 }
  ];

  useEffect(() => {
    const mockAnalytics = {
      totalPrayers: 31,
      onTimePercentage: 78,
      currentStreak: 12,
      bestTime: 'Fajr',
      improvements: ['More consistent Maghrib timing', 'Increase Sunnah prayers'],
      spiritualScore: 87,
      weeklyGoal: 35,
      trends: {
        improving: ['Fajr consistency', 'Overall punctuality'],
        declining: ['Evening prayers duration'],
        stable: ['Dhikr after prayer', 'Sunnah prayers']
      }
    };

    const mockInsights = [
      {
        type: 'pattern',
        title: 'Fajr Excellence',
        description: 'You\'ve been consistently praying Fajr on time this week! Your early morning spirituality is strong.',
        icon: '🌅',
        priority: 'high'
      },
      {
        type: 'suggestion',
        title: 'Maghrib Opportunity',
        description: 'AI detected you sometimes delay Maghrib. Try setting a reminder 10 minutes before sunset.',
        icon: '🔔',
        priority: 'medium'
      },
      {
        type: 'achievement',
        title: 'Streak Milestone',
        description: 'Congratulations! You\'ve maintained a 12-day prayer streak. Keep going!',
        icon: '🏆',
        priority: 'celebration'
      }
    ];

    setAnalyticsData(mockAnalytics);
    setInsights(mockInsights);
  }, [selectedPeriod]);

  const generateAIReport = () => {
    toast({
      title: "AI Analysis Complete",
      description: "Your personalized prayer insights have been updated.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'celebration': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 border-cyan-200 dark:border-cyan-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Clock className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <Brain className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-cyan-700 to-blue-700 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            Intelligent Prayer Analytics
          </span>
        </CardTitle>
        <p className="text-sm text-cyan-700 dark:text-cyan-300">
          AI-powered insights into your prayer patterns and spiritual growth
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Period Selection */}
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period ? "bg-cyan-600" : ""}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        {analyticsData && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg text-center border border-cyan-200 dark:border-cyan-700">
              <div className="text-2xl font-bold text-cyan-600">{analyticsData.totalPrayers}</div>
              <div className="text-xs text-cyan-600">Total Prayers</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg text-center border border-cyan-200 dark:border-cyan-700">
              <div className="text-2xl font-bold text-blue-600">{analyticsData.onTimePercentage}%</div>
              <div className="text-xs text-blue-600">On Time</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg text-center border border-cyan-200 dark:border-cyan-700">
              <div className="text-2xl font-bold text-green-600">{analyticsData.currentStreak}</div>
              <div className="text-xs text-green-600">Day Streak</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg text-center border border-cyan-200 dark:border-cyan-700">
              <div className="text-2xl font-bold text-purple-600">{analyticsData.spiritualScore}</div>
              <div className="text-xs text-purple-600">Spirit Score</div>
            </div>
          </div>
        )}

        {/* Prayer Chart */}
        <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-cyan-200 dark:border-cyan-700">
          <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-4 flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Weekly Prayer Patterns
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Bar dataKey="prayers" fill="#0891b2" />
              <Bar dataKey="onTime" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Insights
            </h4>
            <Button onClick={generateAIReport} size="sm" variant="outline">
              <TrendingUp className="w-4 h-4 mr-1" />
              Generate Report
            </Button>
          </div>
          
          {insights.map((insight, index) => (
            <div
              key={index}
              className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-cyan-200 dark:border-cyan-700"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{insight.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-medium text-gray-800 dark:text-gray-200">{insight.title}</h5>
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Towards Goal */}
        {analyticsData && (
          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-cyan-700 dark:text-cyan-300">Weekly Goal Progress</span>
              <span className="text-sm text-cyan-600 dark:text-cyan-400">
                {analyticsData.totalPrayers}/{analyticsData.weeklyGoal}
              </span>
            </div>
            <Progress 
              value={(analyticsData.totalPrayers / analyticsData.weeklyGoal) * 100} 
              className="h-2 mb-3" 
            />
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-600" />
              <span className="text-sm text-cyan-600 dark:text-cyan-400">
                {analyticsData.weeklyGoal - analyticsData.totalPrayers} prayers to reach your weekly goal
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntelligentPrayerAnalytics;
