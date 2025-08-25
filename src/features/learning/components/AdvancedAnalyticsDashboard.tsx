
import React, { useState, useEffect } from 'react';

interface AnalyticsResponse {
  patterns: {
    preferredTimes: number[];
    averageSessionLength: number;
    strongTopics: string[];
    improvementAreas: string[];
    learningVelocity: number;
    consistency: number;
  } | null;
  insights: Array<{
    id: string;
    type: 'strength' | 'improvement' | 'recommendation' | 'milestone';
    title: string;
    description: string;
    priority: number;
    actionable: boolean;
    estimatedImpact: 'low' | 'medium' | 'high';
  }>;
  sessionCount: number;
  lastAnalysis: number | null;
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Clock, 
  Award, 
  Lightbulb,
  Calendar,
  BarChart3,
  Zap,
  Star,
  BookOpen,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { advancedLearningAnalytics, LearningPattern, AIInsight } from '@/features/learning/services/advancedLearningAnalytics';
import { useToast } from '@/shared';

const AdvancedAnalyticsDashboard = () => {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [selectedInsightType, setSelectedInsightType] = useState<'all' | 'strength' | 'improvement' | 'recommendation' | 'milestone'>('all');

  useEffect(() => {
    loadAnalytics();
  }, []); // TODO: Add missing dependencies;

  const loadAnalytics = () => {
    const data = advancedLearningAnalytics.getAnalytics();
    setAnalytics(data);
  };

  const simulateLearningSession = () => {
    // Simulate a learning session for demo purposes
    advancedLearningAnalytics.recordSession({
      type: 'quran',
      duration: Math.floor(Math.random() * 30) + 10,
      completed: Math.random() > 0.2,
      engagement: Math.floor(Math.random() * 4) + 7,
      difficulty: 'intermediate',
      topics: ['recitation', 'tafsir', 'memorization']
    });
    
    loadAnalytics();
    toast({
      title: 'Learning Session Recorded',
      description: 'Your progress has been analyzed and insights updated.',
    });
  };

  if (!analytics || !analytics.patterns) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Advanced Learning Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Complete a few learning sessions to unlock AI-powered insights</p>
            <Button onClick={simulateLearningSession} className="bg-purple-600 hover:bg-purple-700">
              <Zap className="w-4 h-4 mr-2" />
              Simulate Learning Session
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const patterns: LearningPattern = analytics.patterns;
  const insights: AIInsight[] = analytics.insights || [];

  const filteredInsights = insights.filter(insight => 
    selectedInsightType === 'all' || insight.type === selectedInsightType
  );

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return Star;
      case 'improvement': return Target;
      case 'recommendation': return Lightbulb;
      case 'milestone': return Award;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'text-green-600 bg-green-50';
      case 'improvement': return 'text-orange-600 bg-orange-50';
      case 'recommendation': return 'text-blue-600 bg-blue-50';
      case 'milestone': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (value: number) => {
    if (value >= 7) return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (value <= 3) return <ArrowDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            AI Learning Analytics
          </CardTitle>
          <p className="text-sm text-gray-600">Advanced insights powered by machine learning</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-bold text-purple-600">{patterns.consistency}%</span>
                {getTrendIcon(patterns.consistency / 10)}
              </div>
              <div className="text-xs text-gray-600">Consistency Score</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-bold text-indigo-600">{Math.round(patterns.learningVelocity)}</span>
                {getTrendIcon(patterns.learningVelocity)}
              </div>
              <div className="text-xs text-gray-600">Learning Velocity</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">{patterns.averageSessionLength}m</div>
              <div className="text-xs text-gray-600">Avg Session</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">{analytics.sessionCount}</div>
              <div className="text-xs text-gray-600">Total Sessions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Optimal Learning Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patterns.preferredTimes.slice(0, 3).map((hour, index) => {
                const timeString = `${hour.toString().padStart(2, '0')}:00`;
                const timeOfDay = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';
                
                return (
                  <div key={hour} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <span className="font-semibold">{timeString}</span>
                      <span className="text-sm text-gray-600 ml-2">({timeOfDay})</span>
                    </div>
                    <Badge variant="secondary">#{index + 1}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Topic Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patterns.strongTopics.slice(0, 4).map((topic, index) => (
                <div key={topic} className="flex items-center justify-between">
                  <span className="font-medium capitalize">{topic}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={90 - index * 10} className="w-20 h-2" />
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            AI-Powered Insights
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {['all', 'strength', 'improvement', 'recommendation', 'milestone'].map(type => (
              <Button
                key={type}
                size="sm"
                variant={selectedInsightType === type ? "default" : "outline"}
                onClick={() => setSelectedInsightType(type as any)}
                className="text-xs"
              >
                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInsights.map(insight => {
              const Icon = getInsightIcon(insight.type);
              const colorClass = getInsightColor(insight.type);
              
              return (
                <div
                  key={insight.id}
                  className={`p-4 rounded-lg border ${colorClass} border-opacity-20`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${insight.estimatedImpact === 'high' ? 'bg-red-100 text-red-800' : 
                            insight.estimatedImpact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'}`}
                        >
                          {insight.estimatedImpact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {insight.description}
                      </p>
                      {insight.actionable && (
                        <Button size="sm" variant="outline" className="mt-2">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
            <Button onClick={simulateLearningSession} variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Record Session
            </Button>
            <Button onClick={loadAnalytics} variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh Analytics
            </Button>
            <Button 
              onClick={() => {
                const data = advancedLearningAnalytics.exportData();
                console.log('Analytics Data:', data);
                toast({
                  title: 'Data Exported',
                  description: 'Check console for detailed analytics data',
                });
              }}
              variant="outline"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
