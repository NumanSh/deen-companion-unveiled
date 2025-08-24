
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Brain, TrendingUp, Calendar, CheckCircle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SmartIslamicGoalSetter = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const suggestedGoals = [
    "Read Quran 30 minutes daily",
    "Memorize 5 new duas this month",
    "Attend Friday prayers consistently",
    "Give sadaqah weekly",
    "Complete Islamic course on Fiqh"
  ];

  const analyzeAndCreateGoal = async (goalText: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const aiAnalysis = {
      feasibility: Math.floor(Math.random() * 30) + 70, // 70-100%
      timeline: ['2 weeks', '1 month', '3 months', '6 months'][Math.floor(Math.random() * 4)],
      milestones: [
        'Week 1: Establish routine',
        'Week 2: Build consistency',
        'Month 1: See measurable progress'
      ],
      tips: [
        'Start with small, manageable steps',
        'Set daily reminders',
        'Track progress weekly',
        'Find an accountability partner'
      ],
      spiritualBenefit: 'This goal will strengthen your connection with Allah and improve your Islamic knowledge.',
      difficulty: ['Easy', 'Medium', 'Challenging'][Math.floor(Math.random() * 3)]
    };

    const newGoalObj = {
      id: Date.now(),
      text: goalText,
      progress: 0,
      analysis: aiAnalysis,
      createdAt: new Date(),
      isActive: true
    };

    setGoals(prev => [...prev, newGoalObj]);
    setNewGoal('');
    setIsAnalyzing(false);

    toast({
      title: "Smart Goal Created!",
      description: "AI has analyzed your goal and created a personalized plan.",
    });
  };

  const updateProgress = (goalId: number, newProgress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    ));
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <Brain className="w-3 h-3 text-blue-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Smart Goal Setter
          </span>
        </CardTitle>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          AI-powered Islamic goal setting with personalized strategies
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Goal Creation */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Enter your Islamic goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="border-amber-200 dark:border-amber-700"
            />
            <Button 
              onClick={() => analyzeAndCreateGoal(newGoal)}
              disabled={!newGoal.trim() || isAnalyzing}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {isAnalyzing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Brain className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Suggested Goals */}
          <div>
            <h5 className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
              AI Suggested Goals:
            </h5>
            <div className="flex flex-wrap gap-2">
              {suggestedGoals.map((goal, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setNewGoal(goal)}
                  className="text-xs border-amber-200"
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Goals */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{goal.text}</h4>
                <Badge className={`${
                  goal.analysis.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  goal.analysis.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {goal.analysis.difficulty}
                </Badge>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              {/* AI Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="bg-amber-50 dark:bg-amber-900/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                      Feasibility: {goal.analysis.feasibility}%
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Timeline: {goal.analysis.timeline}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                      Smart Tips
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    {goal.analysis.tips[0]}
                  </p>
                </div>
              </div>

              {/* Progress Update */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateProgress(goal.id, Math.min(goal.progress + 10, 100))}
                  className="border-amber-200"
                >
                  +10%
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateProgress(goal.id, Math.min(goal.progress + 25, 100))}
                  className="border-amber-200"
                >
                  +25%
                </Button>
                {goal.progress === 100 && (
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Completed!
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {goals.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Create your first smart Islamic goal to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartIslamicGoalSetter;
