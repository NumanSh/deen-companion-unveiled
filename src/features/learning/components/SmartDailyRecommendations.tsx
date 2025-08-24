
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Star, 
  Clock, 
  TrendingUp, 
  Target, 
  Sparkles,
  BookOpen,
  Heart,
  Flame,
  Zap,
  Lightbulb
} from 'lucide-react';
import { useToast } from '@/shared';
import { aiPersonalizationEngine, AIRecommendation, PersonalizationInsights } from '@/features/learning/services/aiPersonalizationEngine';

const SmartDailyRecommendations = () => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [insights, setInsights] = useState<PersonalizationInsights | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'quick' | 'deep' | 'priority'>('all');

  useEffect(() => {
    loadPersonalizationData();
  }, []);

  const loadPersonalizationData = () => {
    const recs = aiPersonalizationEngine.generatePersonalizedRecommendations();
    const personalInsights = aiPersonalizationEngine.generatePersonalizationInsights();
    const userStats = aiPersonalizationEngine.getPersonalizationStats();
    
    setRecommendations(recs);
    setInsights(personalInsights);
    setStats(userStats);
  };

  const filteredRecommendations = recommendations.filter(rec => {
    switch (selectedFilter) {
      case 'quick':
        return rec.estimatedTime <= 10;
      case 'deep':
        return rec.estimatedTime > 20;
      case 'priority':
        return rec.priority >= 8;
      default:
        return true;
    }
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quran': return '📖';
      case 'hadith': return '📜';
      case 'dua': return '🤲';
      case 'dhikr': return '📿';
      case 'reflection': return '🤔';
      default: return '📚';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quran': return 'bg-green-100 text-green-800';
      case 'hadith': return 'bg-purple-100 text-purple-800';
      case 'dua': return 'bg-blue-100 text-blue-800';
      case 'dhikr': return 'bg-orange-100 text-orange-800';
      case 'reflection': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
      default: return <Target className="w-4 h-4 text-blue-600" />;
    }
  };

  const handleStartRecommendation = (recommendation: AIRecommendation) => {
    // Map recommendation types to valid content types
    let contentType: 'quran' | 'hadith' | 'dua' | 'dhikr';
    
    switch (recommendation.type) {
      case 'reflection':
        contentType = 'quran';
        break;
      case 'quran':
      case 'hadith':
      case 'dua':
      case 'dhikr':
        contentType = recommendation.type;
        break;
      default:
        contentType = 'quran';
    }
    
    // Track the interaction
    aiPersonalizationEngine.trackReadingSession(
      contentType,
      recommendation.title,
      recommendation.estimatedTime,
      8 // Assume good engagement when user clicks
    );
    
    toast({
      title: 'Starting Content',
      description: recommendation.title,
      duration: 2000,
    });
    
    // Refresh recommendations after interaction
    setTimeout(loadPersonalizationData, 1000);
  };

  const filters = [
    { key: 'all', label: 'All', icon: BookOpen },
    { key: 'quick', label: 'Quick (≤10min)', icon: Zap },
    { key: 'deep', label: 'Deep (20min+)', icon: Brain },
    { key: 'priority', label: 'Priority', icon: Star },
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            AI-Powered Daily Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insights && (
            <div className="space-y-4">
              {/* Motivational Message */}
              <div className="p-3 bg-white rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Today's Insight</span>
                </div>
                <p className="text-sm text-purple-700">{insights.motivationalMessage}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-2 bg-white rounded border">
                  <div className="flex items-center justify-center mb-1">
                    {getTrendIcon(insights.spiritualTrend)}
                  </div>
                  <div className="text-sm font-medium">{insights.spiritualTrend}</div>
                  <div className="text-xs text-gray-600">Trend</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium">{insights.bestReadingTime}</div>
                  <div className="text-xs text-gray-600">Best Time</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="flex items-center justify-center mb-1">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">{insights.nextMilestone}</div>
                  <div className="text-xs text-gray-600">Next Goal</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="flex items-center justify-center mb-1">
                    <Flame className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium">{stats?.currentStreak || 0}</div>
                  <div className="text-xs text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => {
          const Icon = filter.icon;
          return (
            <Button
              key={filter.key}
              size="sm"
              variant={selectedFilter === filter.key ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter.key as any)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </Button>
          );
        })}
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.map(recommendation => (
          <Card key={recommendation.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{getTypeIcon(recommendation.type)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{recommendation.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(recommendation.type)}>
                        {recommendation.type}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(recommendation.difficulty)}>
                        {recommendation.difficulty}
                      </Badge>
                      {recommendation.aiGenerated && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Brain className="w-3 h-3 mr-1" />
                          AI
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{recommendation.personalizedScore}%</span>
                  </div>
                  <div className="text-xs text-gray-500">Personalized</div>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                {recommendation.content}
              </p>

              {/* AI Reason */}
              <div className="p-2 bg-blue-50 rounded text-sm text-blue-700 mb-3">
                <div className="flex items-center gap-1 mb-1">
                  <Lightbulb className="w-3 h-3" />
                  <span className="font-medium">Why this content?</span>
                </div>
                {recommendation.reason}
              </div>

              {/* Tags and Timing */}
              <div className="flex flex-wrap gap-1 mb-3">
                {recommendation.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {recommendation.estimatedTime} minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    Priority {recommendation.priority}/10
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-8"
                  >
                    <Heart className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleStartRecommendation(recommendation)}
                    className="h-8"
                  >
                    Start Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No recommendations for the selected filter.</p>
            <p className="text-sm text-gray-400">Try a different filter or continue using the app to get personalized content!</p>
          </CardContent>
        </Card>
      )}

      {/* Learning Progress */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Your Learning Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Sessions Completed</span>
                <span className="font-medium">{stats.totalSessions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Engagement</span>
                <span className="font-medium">{stats.averageEngagement}/10</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Engagement Progress</span>
                  <span className="text-xs text-gray-500">{Math.round(stats.averageEngagement * 10)}%</span>
                </div>
                <Progress value={stats.averageEngagement * 10} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartDailyRecommendations;
