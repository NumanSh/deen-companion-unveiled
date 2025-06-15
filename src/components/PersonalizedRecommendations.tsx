
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Clock, Star, TrendingUp, RefreshCw, BookOpen, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiPersonalizationEngine, AIRecommendation, PersonalizationInsights } from '@/services/aiPersonalizationEngine';

const PersonalizedRecommendations = () => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [insights, setInsights] = useState<PersonalizationInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadRecommendations();
    loadInsights();
  }, []);

  const loadRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newRecommendations = aiPersonalizationEngine.generatePersonalizedRecommendations();
      setRecommendations(newRecommendations);
      setIsLoading(false);
    }, 1000);
  };

  const loadInsights = () => {
    const personalizedInsights = aiPersonalizationEngine.generatePersonalizationInsights();
    setInsights(personalizedInsights);
  };

  const refreshRecommendations = () => {
    loadRecommendations();
    loadInsights();
    toast({
      title: 'Recommendations Updated',
      description: 'Your personalized content has been refreshed based on your latest activity.',
    });
  };

  const handleRecommendationClick = (recommendation: AIRecommendation) => {
    // Simulate tracking the recommendation engagement
    aiPersonalizationEngine.trackReadingSession(
      recommendation.type as any,
      recommendation.title,
      recommendation.estimatedTime,
      8 // Default engagement score
    );

    toast({
      title: 'Content Opened',
      description: `Starting: ${recommendation.title}`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quran': return <BookOpen className="w-4 h-4" />;
      case 'hadith': return <Heart className="w-4 h-4" />;
      case 'dua': return <Star className="w-4 h-4" />;
      case 'reflection': return <Brain className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      {insights && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              Your Spiritual Journey Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Spiritual Trend</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{insights.spiritualTrend}</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Best Reading Time</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{insights.bestReadingTime}</p>
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-amber-600" />
                <span className="font-medium">Next Milestone</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{insights.nextMilestone}</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900 dark:to-blue-900 p-3 rounded-lg">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{insights.motivationalMessage}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI-Powered Recommendations
            </CardTitle>
            <Button
              onClick={refreshRecommendations}
              size="sm"
              variant="outline"
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <p className="text-sm text-gray-600">Personalized content based on your reading patterns and spiritual goals</p>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                  onClick={() => handleRecommendationClick(recommendation)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(recommendation.type)}
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {recommendation.title}
                      </h4>
                      {recommendation.aiGenerated && (
                        <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                          AI Generated
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      {recommendation.estimatedTime}m
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {recommendation.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(recommendation.difficulty)}>
                        {recommendation.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Match:</span>
                        <Progress 
                          value={recommendation.personalizedScore} 
                          className="w-16 h-2" 
                        />
                        <span className="text-xs text-gray-500">{recommendation.personalizedScore}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-gray-500">Priority: {recommendation.priority}/10</span>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    <strong>Why this is recommended:</strong> {recommendation.reason}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {recommendation.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendations;
