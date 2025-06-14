
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Brain, Headphones, Eye, Heart, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SmartQuranCompanion = () => {
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [insights, setInsights] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    generateSmartSession();
  }, []);

  const generateSmartSession = async () => {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sessions = [
      {
        type: 'morning-reflection',
        surah: 'Al-Fatiha',
        verses: '1:1-7',
        duration: '15 minutes',
        focus: 'Gratitude and guidance',
        aiPersonalization: 'Based on your prayer consistency, this surah will deepen your connection with daily prayers.',
        activities: [
          { type: 'recitation', duration: '5 min', icon: BookOpen },
          { type: 'listening', duration: '5 min', icon: Headphones },
          { type: 'reflection', duration: '5 min', icon: Heart }
        ]
      },
      {
        type: 'evening-contemplation',
        surah: 'Al-Mulk',
        verses: '67:1-5',
        duration: '20 minutes',
        focus: 'Allah\'s sovereignty and creation',
        aiPersonalization: 'Perfect for evening reflection. AI detected you enjoy contemplating Allah\'s creation.',
        activities: [
          { type: 'reading', duration: '7 min', icon: Eye },
          { type: 'memorization', duration: '8 min', icon: Brain },
          { type: 'discussion', duration: '5 min', icon: MessageCircle }
        ]
      }
    ];

    const currentTime = new Date().getHours();
    const selectedSession = currentTime < 12 ? sessions[0] : sessions[1];
    
    setCurrentSession(selectedSession);
    setProgress(0);
    
    const sessionInsights = [
      {
        title: 'Optimal Learning Time',
        description: `AI suggests this is your peak learning time based on your activity patterns.`,
        type: 'timing'
      },
      {
        title: 'Retention Strategy',
        description: 'Your learning style benefits from audio-visual combination for better memorization.',
        type: 'learning'
      },
      {
        title: 'Spiritual Connection',
        description: 'This surah aligns with your current spiritual goals and recent prayer reflections.',
        type: 'spiritual'
      }
    ];

    setInsights(sessionInsights);

    toast({
      title: "Smart Session Ready",
      description: "AI has personalized your Quran study session.",
    });
  };

  const startActivity = (activityIndex: number) => {
    setIsActive(true);
    const activity = currentSession.activities[activityIndex];
    
    // Simulate activity progress
    const duration = parseInt(activity.duration) * 60; // Convert to seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / duration);
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsActive(false);
          toast({
            title: "Activity Complete!",
            description: "Great job! Move to the next activity when ready.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 1000);
  };

  const resetSession = () => {
    setProgress(0);
    setIsActive(false);
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'timing': return 'bg-blue-100 text-blue-800';
      case 'learning': return 'bg-purple-100 text-purple-800';
      case 'spiritual': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 border-teal-200 dark:border-teal-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <Brain className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-teal-700 to-cyan-700 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Smart Quran Companion
          </span>
        </CardTitle>
        <p className="text-sm text-teal-700 dark:text-teal-300">
          AI-powered personalized Quran study sessions with adaptive learning
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={generateSmartSession}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          <Brain className="w-4 h-4 mr-2" />
          Generate New Smart Session
        </Button>

        {currentSession && (
          <div className="space-y-4">
            {/* Session Overview */}
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-teal-200 dark:border-teal-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">
                    Surah {currentSession.surah}
                  </h4>
                  <p className="text-sm text-teal-600 dark:text-teal-400">
                    {currentSession.verses} • {currentSession.duration}
                  </p>
                </div>
                <Badge className="bg-teal-100 text-teal-800">
                  {currentSession.type}
                </Badge>
              </div>
              
              <div className="bg-teal-50 dark:bg-teal-900/50 p-3 rounded-lg mb-3">
                <p className="text-sm text-teal-700 dark:text-teal-300">
                  <strong>Focus:</strong> {currentSession.focus}
                </p>
                <p className="text-sm text-teal-600 dark:text-teal-400 mt-1">
                  <strong>AI Insight:</strong> {currentSession.aiPersonalization}
                </p>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Session Progress</span>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-3">
              <h5 className="font-medium text-teal-700 dark:text-teal-300">Study Activities</h5>
              {currentSession.activities.map((activity: any, index: number) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg border border-teal-200 dark:border-teal-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                            {activity.type}
                          </h6>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.duration}
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => startActivity(index)}
                        disabled={isActive}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Insights */}
            <div className="space-y-2">
              <h5 className="font-medium text-teal-700 dark:text-teal-300">AI Insights</h5>
              {insights.map((insight, index) => (
                <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg border border-teal-200 dark:border-teal-700">
                  <div className="flex items-start gap-3">
                    <Badge className={getInsightColor(insight.type)}>
                      {insight.type}
                    </Badge>
                    <div>
                      <h6 className="font-medium text-gray-800 dark:text-gray-200">{insight.title}</h6>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <Button 
                onClick={resetSession}
                variant="outline"
                className="border-teal-200"
              >
                Reset Progress
              </Button>
              <Button 
                onClick={generateSmartSession}
                variant="outline"
                className="border-teal-200"
              >
                New Session
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartQuranCompanion;
