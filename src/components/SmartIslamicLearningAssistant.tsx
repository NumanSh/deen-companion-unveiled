
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Target, Brain, TrendingUp, BookOpen, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SmartIslamicLearningAssistant = () => {
  const [userLevel, setUserLevel] = useState('beginner');
  const [currentTopic, setCurrentTopic] = useState<any>(null);
  const [progress, setProgress] = useState({
    overallProgress: 35,
    currentStreak: 7,
    completedLessons: 12,
    totalLessons: 50
  });
  const { toast } = useToast();

  const learningPaths = {
    beginner: {
      title: "Islamic Foundations",
      topics: ["Five Pillars", "Basic Duas", "Prayer Basics", "Quranic Arabic"],
      currentLesson: "Understanding Salah",
      nextMilestone: "Complete Pillar Studies"
    },
    intermediate: {
      title: "Deepening Faith",
      topics: ["Hadith Studies", "Fiqh Basics", "Islamic History", "Tafsir Introduction"],
      currentLesson: "Hadith Classification",
      nextMilestone: "Hadith Memorization"
    },
    advanced: {
      title: "Islamic Scholarship",
      topics: ["Advanced Tafsir", "Comparative Fiqh", "Islamic Philosophy", "Arabic Grammar"],
      currentLesson: "Usul al-Fiqh Principles",
      nextMilestone: "Research Project"
    }
  };

  useEffect(() => {
    const mockTopic = {
      title: "The Importance of Salah",
      difficulty: userLevel,
      estimatedTime: "15 minutes",
      aiInsights: "Based on your prayer tracking, you might benefit from learning about the spiritual aspects of Salah timing.",
      content: "Salah is the second pillar of Islam and the most important act of worship after believing in Allah.",
      interactiveElements: ["Quiz", "Reflection Questions", "Audio Recitation"],
      personalizedTips: "Since you often pray Fajr, learn about the special blessings of morning prayers."
    };
    setCurrentTopic(mockTopic);
  }, [userLevel]);

  const completeLesson = () => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons + 1,
      overallProgress: Math.min(prev.overallProgress + 2, 100)
    }));

    toast({
      title: "Lesson Completed! 🎉",
      description: "Your learning progress has been updated. Keep going!",
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <Brain className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Smart Learning Assistant
          </span>
        </CardTitle>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          AI-powered personalized Islamic education tailored to your level
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Learning Path Selection */}
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(learningPaths).map(([level, path]) => (
            <Button
              key={level}
              variant={userLevel === level ? "default" : "outline"}
              size="sm"
              onClick={() => setUserLevel(level)}
              className={userLevel === level ? "bg-blue-600" : ""}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{progress.overallProgress}%</div>
              <div className="text-sm text-blue-600">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{progress.currentStreak}</div>
              <div className="text-sm text-indigo-600">Day Streak</div>
            </div>
          </div>
          <Progress value={progress.overallProgress} className="h-2" />
          <div className="text-xs text-gray-500 mt-2">
            {progress.completedLessons} of {progress.totalLessons} lessons completed
          </div>
        </div>

        {/* Current Lesson */}
        {currentTopic && (
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">{currentTopic.title}</h4>
              <Badge className={getLevelColor(currentTopic.difficulty)}>
                {currentTopic.difficulty}
              </Badge>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{currentTopic.content}</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-700 dark:text-blue-300">AI Insight</span>
              </div>
              <p className="text-blue-600 dark:text-blue-400 text-sm">{currentTopic.aiInsights}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {currentTopic.estimatedTime}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Interactive
                </span>
              </div>
              <Button onClick={completeLesson} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Award className="w-4 h-4 mr-1" />
                Complete Lesson
              </Button>
            </div>
          </div>
        )}

        {/* Learning Path Topics */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 p-4 rounded-lg">
          <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
            {learningPaths[userLevel as keyof typeof learningPaths].title} Path
          </h5>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {learningPaths[userLevel as keyof typeof learningPaths].topics.map((topic, index) => (
              <div key={index} className="bg-white/50 dark:bg-gray-800/50 p-2 rounded text-sm text-center">
                {topic}
              </div>
            ))}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            Next: {learningPaths[userLevel as keyof typeof learningPaths].nextMilestone}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartIslamicLearningAssistant;
