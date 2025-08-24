
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  Star, 
  BookOpen, 
  Zap,
  Award,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { smartLearningService, LearningRecommendation } from '@/features/learning/services/smartLearningService';
import { useToast } from '@/shared';

const SmartLearningDashboard = () => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([]);
  const [stats, setStats] = useState<any>({});
  const [completedToday, setCompletedToday] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const recs = smartLearningService.getPersonalizedRecommendations();
    const learningStats = smartLearningService.getLearningStats();
    
    setRecommendations(recs);
    setStats(learningStats);

    // Load today's completed activities
    const today = new Date().toDateString();
    const completed = localStorage.getItem(`completed-${today}`);
    if (completed) {
      setCompletedToday(new Set(JSON.parse(completed)));
    }
  };

  const handleRecommendationComplete = (rec: LearningRecommendation) => {
    // Mark as completed
    const newCompleted = new Set(completedToday);
    newCompleted.add(rec.id);
    setCompletedToday(newCompleted);

    // Save to localStorage
    const today = new Date().toDateString();
    localStorage.setItem(`completed-${today}`, JSON.stringify([...newCompleted]));

    // Update learning progress
    if (rec.type === 'quran') {
      smartLearningService.updateLearningProgress('quran', { surahNumber: Math.floor(Math.random() * 114) + 1 });
    } else if (rec.type === 'dhikr') {
      smartLearningService.updateLearningProgress('dhikr', {});
    }

    toast({
      title: 'Great Work! 🌟',
      description: `You completed: ${rec.title}`,
    });

    // Refresh recommendations
    loadDashboardData();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quran': return BookOpen;
      case 'hadith': return Star;
      case 'dua': return Target;
      case 'dhikr': return Zap;
      case 'reflection': return Brain;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Stats Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Smart Learning Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalSurahsRead || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Surahs Read</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.prayerStreak || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Prayer Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.readingStreak || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reading Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{Math.round(stats.progress || 0)}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Quran Progress</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Learning Progress</span>
              <span>{Math.round(stats.progress || 0)}%</span>
            </div>
            <Progress value={stats.progress || 0} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Today's Achievements */}
      {completedToday.size > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Today's Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from(completedToday).map((id) => (
                <Badge key={id} variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Personalized Learning Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.slice(0, 5).map((rec) => {
              const Icon = getTypeIcon(rec.type);
              const isCompleted = completedToday.has(rec.id);
              
              return (
                <div
                  key={rec.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${isCompleted ? 'text-green-600' : 'text-blue-600'}`} />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {rec.title}
                        </h3>
                        <Badge className={getDifficultyColor(rec.difficulty)}>
                          {rec.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {rec.description}
                      </p>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {rec.content}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rec.estimatedTime} min
                        </div>
                        <div className="flex gap-1">
                          {rec.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {isCompleted ? (
                        <Button variant="outline" disabled className="text-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleRecommendationComplete(rec)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Complete
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

      {/* Learning Insights */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            Learning Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Your Learning Style</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You prefer {stats.level || 'beginner'} level content and show consistent progress in Quran reading.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Next Milestone</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stats.totalSurahsRead < 10 
                  ? 'Read 10 different surahs to unlock advanced recommendations'
                  : 'Complete daily goals for 7 days to achieve consistency badge'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartLearningDashboard;
