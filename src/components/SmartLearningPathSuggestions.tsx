
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  BookOpen, 
  Star, 
  TrendingUp, 
  Target, 
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Award,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LearningLevel {
  id: string;
  name: string;
  description: string;
  progress: number;
  isActive: boolean;
}

interface SuggestedPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  topics: string[];
  aiReason: string;
  priority: number;
  prerequisites?: string[];
}

const SmartLearningPathSuggestions = () => {
  const { toast } = useToast();
  const [userLevel, setUserLevel] = useState<string>('intermediate');
  const [suggestedPaths, setSuggestedPaths] = useState<SuggestedPath[]>([]);
  const [learningHistory, setLearningHistory] = useState<any>({});

  useEffect(() => {
    // Load user's learning history and generate suggestions
    const history = localStorage.getItem('learning-history') || '{}';
    const parsedHistory = JSON.parse(history);
    setLearningHistory(parsedHistory);
    
    // Generate AI-powered path suggestions based on user data
    generateSmartSuggestions(parsedHistory);
  }, []);

  const generateSmartSuggestions = (history: any) => {
    // AI-powered analysis of user's learning patterns
    const completedQuran = history.completedSurahs || 0;
    const prayerConsistency = history.prayerStreak || 0;
    const hadithStudied = history.hadithCount || 0;
    
    const suggestions: SuggestedPath[] = [];

    // Beginner path suggestions
    if (completedQuran < 10) {
      suggestions.push({
        id: 'quran-foundation',
        title: 'Quran Foundation Path',
        description: 'Build a strong foundation with essential Surahs and basic recitation',
        difficulty: 'beginner',
        duration: '4-6 weeks',
        topics: ['Basic Recitation', 'Short Surahs', 'Tajweed Basics'],
        aiReason: 'Based on your current Quran reading progress, this path will strengthen your foundation',
        priority: 10
      });
    }

    // Prayer-focused suggestions
    if (prayerConsistency < 30) {
      suggestions.push({
        id: 'prayer-mastery',
        title: 'Prayer Mastery Journey',
        description: 'Master the spiritual and practical aspects of Salah',
        difficulty: 'intermediate',
        duration: '3-4 weeks',
        topics: ['Prayer Etiquette', 'Dua Integration', 'Khushu Development'],
        aiReason: 'Your prayer tracking shows room for deeper spiritual connection',
        priority: 9
      });
    }

    // Advanced suggestions for consistent users
    if (completedQuran > 20 && prayerConsistency > 60) {
      suggestions.push({
        id: 'tafsir-advanced',
        title: 'Advanced Tafsir Study',
        description: 'Deep dive into Quranic interpretation and classical commentary',
        difficulty: 'advanced',
        duration: '8-12 weeks',
        topics: ['Classical Tafsir', 'Linguistic Analysis', 'Historical Context'],
        aiReason: 'Your excellent Quran knowledge qualifies you for advanced study',
        priority: 8,
        prerequisites: ['Quran Foundation Path']
      });
    }

    // Hadith-focused path
    if (hadithStudied < 50) {
      suggestions.push({
        id: 'hadith-essentials',
        title: 'Essential Hadith Collection',
        description: 'Study the most important prophetic traditions',
        difficulty: 'intermediate',
        duration: '6-8 weeks',
        topics: ['Sahih Collections', 'Hadith Sciences', 'Practical Application'],
        aiReason: 'Hadith study will complement your Quran knowledge beautifully',
        priority: 7
      });
    }

    // Personal development path
    suggestions.push({
      id: 'spiritual-development',
      title: 'Spiritual Development Path',
      description: 'Enhance your spiritual practice with dhikr, dua, and reflection',
      difficulty: 'beginner',
      duration: '4-5 weeks',
      topics: ['Daily Dhikr', 'Dua Memorization', 'Spiritual Reflection'],
      aiReason: 'This path will enhance your daily spiritual practice',
      priority: 6
    });

    setSuggestedPaths(suggestions.sort((a, b) => b.priority - a.priority));
  };

  const startLearningPath = (path: SuggestedPath) => {
    // Save user's choice and update learning history
    const newHistory = {
      ...learningHistory,
      activePath: path.id,
      pathStartDate: new Date().toISOString(),
      [`${path.id}_started`]: true
    };
    
    localStorage.setItem('learning-history', JSON.stringify(newHistory));
    setLearningHistory(newHistory);

    toast({
      title: 'Learning Path Started! 🚀',
      description: `You've begun the ${path.title}. Your personalized journey awaits!`,
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

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600" />
          Smart Learning Path Suggestions
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          AI-powered recommendations based on your Islamic knowledge level and learning patterns
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Insight Banner */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-800/30 dark:to-blue-800/30 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-700 dark:text-purple-300">AI Analysis</span>
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Based on your reading of {learningHistory.completedSurahs || 0} Surahs and {learningHistory.prayerStreak || 0}-day prayer streak, 
            we've curated these personalized learning paths to accelerate your Islamic knowledge journey.
          </p>
        </div>

        {/* Suggested Learning Paths */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Recommended for You
          </h3>

          {suggestedPaths.slice(0, 3).map((path, index) => (
            <Card key={path.id} className="border-2 hover:border-purple-300 transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-purple-600">#{index + 1} Recommendation</span>
                      </div>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold mb-1">{path.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{path.description}</p>
                    
                    {/* AI Reasoning */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Why this path?</span>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{path.aiReason}</p>
                    </div>

                    {/* Path Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {path.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {path.topics.length} topics
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {path.topics.map((topic, topicIndex) => (
                        <span 
                          key={topicIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Prerequisites */}
                    {path.prerequisites && (
                      <div className="text-xs text-gray-500 mb-3">
                        Prerequisites: {path.prerequisites.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-purple-600 font-medium">
                    Priority Score: {path.priority}/10
                  </div>
                  <Button 
                    onClick={() => startLearningPath(path)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Start Path
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Tracking */}
        {learningHistory.activePath && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800/30 dark:to-emerald-800/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-700 dark:text-green-300">Active Learning Path</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mb-3">
              You're currently following a personalized learning path. Keep up the great work!
            </p>
            <Progress value={35} className="h-2" />
            <div className="text-xs text-green-600 mt-1">Progress: 35% complete</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartLearningPathSuggestions;
