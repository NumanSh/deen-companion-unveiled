
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Trophy, 
  Target,
  Calendar,
  BookOpen,
  Heart,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Clock,
  Award
} from 'lucide-react';

interface CommunityMetrics {
  totalMembers: number;
  activeMembers: number;
  monthlyGrowth: number;
  engagementRate: number;
  studyCircleParticipation: number;
  challengeCompletionRate: number;
  mentorshipMatches: number;
  averageSessionDuration: number;
}

interface EngagementData {
  category: string;
  value: number;
  change: number;
  color: string;
}

const AdvancedCommunityAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<CommunityMetrics>({
    totalMembers: 12400,
    activeMembers: 8960,
    monthlyGrowth: 12.5,
    engagementRate: 74.3,
    studyCircleParticipation: 45.8,
    challengeCompletionRate: 67.2,
    mentorshipMatches: 156,
    averageSessionDuration: 28.5
  });

  const [engagementData, setEngagementData] = useState<EngagementData[]>([
    { category: 'Quran Reading', value: 89, change: 5.2, color: 'bg-green-500' },
    { category: 'Study Circles', value: 76, change: 8.1, color: 'bg-blue-500' },
    { category: 'Community Challenges', value: 67, change: -2.3, color: 'bg-purple-500' },
    { category: 'Mentorship Sessions', value: 54, change: 12.7, color: 'bg-orange-500' },
    { category: 'Prayer Tracking', value: 92, change: 3.4, color: 'bg-teal-500' },
    { category: 'Islamic Learning', value: 71, change: 6.8, color: 'bg-indigo-500' }
  ]);

  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'quarter'>('month');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Community Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Deep insights into community engagement and growth
          </p>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'quarter'] as const).map((period) => (
            <Button
              key={period}
              variant={timeFrame === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFrame(period)}
              className="capitalize"
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold">{metrics.totalMembers.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+{metrics.monthlyGrowth}%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold">{metrics.activeMembers.toLocaleString()}</p>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((metrics.activeMembers / metrics.totalMembers) * 100)}% of total
                </div>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold">{metrics.engagementRate}%</p>
                <Progress value={metrics.engagementRate} className="h-1 mt-2" />
              </div>
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Session</p>
                <p className="text-2xl font-bold">{metrics.averageSessionDuration}m</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-blue-600" />
                  <span className="text-xs text-blue-600">Quality time</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Engagement by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {engagementData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{item.value}%</span>
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      item.change >= 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      {item.change >= 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Community Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Study Streak Champions</p>
                    <p className="text-sm text-gray-600">847 members with 30+ day streaks</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">New!</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Quran Completion</p>
                    <p className="text-sm text-gray-600">156 full Quran readings this month</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Community Support</p>
                    <p className="text-sm text-gray-600">2,341 acts of kindness logged</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participation Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600" />
            Participation Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {metrics.studyCircleParticipation}%
              </div>
              <p className="text-sm text-gray-600 mb-2">Study Circle Participation</p>
              <Progress value={metrics.studyCircleParticipation} className="h-2" />
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {metrics.challengeCompletionRate}%
              </div>
              <p className="text-sm text-gray-600 mb-2">Challenge Completion Rate</p>
              <Progress value={metrics.challengeCompletionRate} className="h-2" />
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {metrics.mentorshipMatches}
              </div>
              <p className="text-sm text-gray-600 mb-2">Active Mentorship Pairs</p>
              <div className="text-xs text-purple-600 mt-1">+23 this month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedCommunityAnalytics;
