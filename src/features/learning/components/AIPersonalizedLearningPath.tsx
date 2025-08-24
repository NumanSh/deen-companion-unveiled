
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Target, 
  BookOpen, 
  Star,
  Clock,
  Award,
  TrendingUp,
  CheckCircle,
  Play,
  Lock,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'quran' | 'hadith' | 'fiqh' | 'arabic' | 'tajweed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  progress: number;
  isUnlocked: boolean;
  prerequisites: string[];
  aiRecommendation: string;
}

interface UserProfile {
  level: string;
  interests: string[];
  completedModules: string[];
  studyGoal: string;
  weeklyTarget: number;
  currentStreak: number;
}

const AIPersonalizedLearningPath = () => {
  const { toast } = useToast();
  const [userProfile] = useState<UserProfile>({
    level: 'intermediate',
    interests: ['quran', 'hadith', 'fiqh'],
    completedModules: ['quran-basics', 'hadith-intro'],
    studyGoal: 'Complete Tafsir Studies',
    weeklyTarget: 5,
    currentStreak: 12
  });

  const [learningPath, setLearningPath] = useState<LearningModule[]>([
    {
      id: 'tajweed-basics',
      title: 'Tajweed Fundamentals',
      description: 'Master the rules of Quranic recitation',
      type: 'tajweed',
      difficulty: 'beginner',
      duration: 45,
      progress: 85,
      isUnlocked: true,
      prerequisites: [],
      aiRecommendation: 'Perfect for improving your recitation quality'
    },
    {
      id: 'tafsir-fatihah',
      title: 'Tafsir Al-Fatihah',
      description: 'Deep dive into the opening chapter of the Quran',
      type: 'quran',
      difficulty: 'intermediate',
      duration: 60,
      progress: 0,
      isUnlocked: true,
      prerequisites: ['tajweed-basics'],
      aiRecommendation: 'Recommended based on your Quran study goals'
    },
    {
      id: 'sahih-bukhari-study',
      title: 'Sahih Bukhari Collection',
      description: 'Study authentic hadith from Imam Bukhari',
      type: 'hadith',
      difficulty: 'intermediate',
      duration: 90,
      progress: 0,
      isUnlocked: true,
      prerequisites: [],
      aiRecommendation: 'Matches your hadith interest perfectly'
    },
    {
      id: 'arabic-grammar',
      title: 'Quranic Arabic Grammar',
      description: 'Understand the language of the Quran',
      type: 'arabic',
      difficulty: 'advanced',
      duration: 120,
      progress: 0,
      isUnlocked: false,
      prerequisites: ['tafsir-fatihah'],
      aiRecommendation: 'Unlock by completing Tafsir Al-Fatihah'
    },
    {
      id: 'fiqh-salah',
      title: 'Fiqh of Prayer',
      description: 'Complete guide to Islamic prayer rulings',
      type: 'fiqh',
      difficulty: 'intermediate',
      duration: 75,
      progress: 0,
      isUnlocked: true,
      prerequisites: [],
      aiRecommendation: 'Essential knowledge for daily practice'
    },
    {
      id: 'advanced-tafsir',
      title: 'Advanced Tafsir Methods',
      description: 'Learn classical and modern interpretation methods',
      type: 'quran',
      difficulty: 'advanced',
      duration: 150,
      progress: 0,
      isUnlocked: false,
      prerequisites: ['tafsir-fatihah', 'arabic-grammar'],
      aiRecommendation: 'The ultimate goal for your learning journey'
    }
  ]);

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
      case 'quran': return BookOpen;
      case 'hadith': return Star;
      case 'fiqh': return Target;
      case 'arabic': return Brain;
      case 'tajweed': return Zap;
      default: return BookOpen;
    }
  };

  const handleStartModule = (module: LearningModule) => {
    if (!module.isUnlocked) {
      toast({
        title: 'Module Locked',
        description: 'Complete prerequisites to unlock this module',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: `Starting ${module.title}`,
      description: `AI has prepared a personalized study plan for you`,
      duration: 3000,
    });
  };

  const handleContinueModule = (module: LearningModule) => {
    toast({
      title: `Continuing ${module.title}`,
      description: `Resume from where you left off`,
      duration: 2000,
    });
  };

  const completedModules = learningPath.filter(m => m.progress === 100).length;
  const totalProgress = learningPath.reduce((sum, m) => sum + m.progress, 0) / learningPath.length;

  return (
    <div className="space-y-6">
      {/* AI Learning Dashboard */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">AI Learning Assistant</h2>
                <p className="text-purple-200">Personalized Islamic Education Path</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{Math.round(totalProgress)}%</div>
              <div className="text-purple-200">Overall Progress</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{completedModules}</div>
              <div className="text-sm text-purple-200">Completed</div>
            </div>
            <div className="text-center">
              <Target className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{userProfile.weeklyTarget}</div>
              <div className="text-sm text-purple-200">Weekly Goal</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{userProfile.currentStreak}</div>
              <div className="text-sm text-purple-200">Day Streak</div>
            </div>
            <div className="text-center">
              <Award className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{userProfile.level}</div>
              <div className="text-sm text-purple-200">Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Goal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-600" />
            Current Learning Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-amber-800">{userProfile.studyGoal}</h3>
              <p className="text-sm text-amber-600">AI-optimized learning path designed for you</p>
            </div>
            <Badge className="bg-amber-100 text-amber-800">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Personalized Learning Path
        </h3>
        
        {learningPath.map((module, index) => {
          const TypeIcon = getTypeIcon(module.type);
          const isInProgress = module.progress > 0 && module.progress < 100;
          const isCompleted = module.progress === 100;
          
          return (
            <Card key={module.id} className={`transition-all duration-200 hover:shadow-lg ${
              !module.isUnlocked ? 'opacity-60' : ''
            } ${isCompleted ? 'border-green-500 bg-green-50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      module.isUnlocked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {module.isUnlocked ? <TypeIcon className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold">{module.title}</h4>
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                        {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                      </div>
                      <p className="text-gray-600 mb-2">{module.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Brain className="w-4 h-4" />
                          <span className="text-purple-600 font-medium">{module.aiRecommendation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-1">{module.progress}%</div>
                    <Progress value={module.progress} className="w-20" />
                  </div>
                </div>

                {module.isUnlocked && (
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {isCompleted ? (
                        <Button variant="outline" className="border-green-500 text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </Button>
                      ) : isInProgress ? (
                        <Button onClick={() => handleContinueModule(module)} className="bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      ) : (
                        <Button onClick={() => handleStartModule(module)} className="bg-green-600 hover:bg-green-700">
                          <Play className="w-4 h-4 mr-2" />
                          Start Module
                        </Button>
                      )}
                    </div>
                    
                    {module.prerequisites.length > 0 && (
                      <div className="text-sm text-gray-500">
                        Prerequisites: {module.prerequisites.join(', ')}
                      </div>
                    )}
                  </div>
                )}

                {!module.isUnlocked && (
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <Lock className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-gray-500">Complete prerequisites to unlock</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AIPersonalizedLearningPath;
