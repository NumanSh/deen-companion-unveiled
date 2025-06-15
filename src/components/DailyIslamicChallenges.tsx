import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Star, 
  Calendar, 
  Clock,
  CheckCircle,
  Trophy,
  Flame,
  Gift,
  BookOpen,
  Heart,
  Moon,
  Sun,
  Zap,
  LucideIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  category: 'prayer' | 'quran' | 'dhikr' | 'charity' | 'reflection' | 'community';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeEstimate: number; // in minutes
  requirement: {
    type: 'count' | 'duration' | 'completion';
    target: number;
    unit?: string;
  };
  progress: number;
  completed: boolean;
  completedAt?: number;
  streak?: number;
  icon: LucideIcon;
}

const DailyIslamicChallenges = () => {
  const { toast } = useToast();
  const [currentDate] = useState(new Date().toDateString());
  const [totalStreak, setTotalStreak] = useState(12);
  const [dailyPoints, setDailyPoints] = useState(0);
  const [weeklyPoints, setWeeklyPoints] = useState(850);
  
  const [challenges, setChallenges] = useState<DailyChallenge[]>([
    {
      id: 'morning-dhikr',
      title: 'Morning Remembrance',
      description: 'Recite morning adhkar after Fajr prayer',
      category: 'dhikr',
      difficulty: 'easy',
      points: 30,
      timeEstimate: 10,
      requirement: { type: 'completion', target: 1 },
      progress: 0,
      completed: false,
      icon: Sun
    },
    {
      id: 'quran-verses',
      title: 'Daily Quran Reading',
      description: 'Read at least 20 verses from the Quran',
      category: 'quran',
      difficulty: 'medium',
      points: 50,
      timeEstimate: 15,
      requirement: { type: 'count', target: 20, unit: 'verses' },
      progress: 8,
      completed: false,
      icon: BookOpen
    },
    {
      id: 'istighfar-100',
      title: 'Seek Forgiveness',
      description: 'Say "Astaghfirullah" 100 times',
      category: 'dhikr',
      difficulty: 'easy',
      points: 25,
      timeEstimate: 5,
      requirement: { type: 'count', target: 100, unit: 'times' },
      progress: 45,
      completed: false,
      icon: Heart
    },
    {
      id: 'charity-act',
      title: 'Act of Kindness',
      description: 'Perform one act of charity or kindness',
      category: 'charity',
      difficulty: 'medium',
      points: 40,
      timeEstimate: 20,
      requirement: { type: 'completion', target: 1 },
      progress: 1,
      completed: true,
      completedAt: Date.now() - 2 * 60 * 60 * 1000,
      icon: Gift
    },
    {
      id: 'reflection-dua',
      title: 'Evening Reflection',
      description: 'Spend 10 minutes in personal dua and reflection',
      category: 'reflection',
      difficulty: 'medium',
      points: 35,
      timeEstimate: 10,
      requirement: { type: 'duration', target: 10, unit: 'minutes' },
      progress: 0,
      completed: false,
      icon: Moon
    },
    {
      id: 'salawat-prophet',
      title: 'Send Blessings',
      description: 'Recite Salawat on Prophet Muhammad (PBUH) 50 times',
      category: 'dhikr',
      difficulty: 'easy',
      points: 20,
      timeEstimate: 5,
      requirement: { type: 'count', target: 50, unit: 'times' },
      progress: 0,
      completed: false,
      icon: Star
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prayer': return 'text-blue-600';
      case 'quran': return 'text-green-600';
      case 'dhikr': return 'text-purple-600';
      case 'charity': return 'text-pink-600';
      case 'reflection': return 'text-indigo-600';
      case 'community': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const completeChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId && !challenge.completed
          ? { 
              ...challenge, 
              completed: true, 
              completedAt: Date.now(),
              progress: challenge.requirement.target 
            }
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      setDailyPoints(prev => prev + challenge.points);
      setWeeklyPoints(prev => prev + challenge.points);
      
      toast({
        title: '🎉 Challenge Completed!',
        description: `${challenge.title} - Earned ${challenge.points} points`,
      });
    }
  };

  const updateProgress = (challengeId: string, progress: number) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId
          ? { ...challenge, progress: Math.min(progress, challenge.requirement.target) }
          : challenge
      )
    );
  };

  const completedChallenges = challenges.filter(c => c.completed);
  const completionRate = Math.round((completedChallenges.length / challenges.length) * 100);

  return (
    <div className="space-y-6">
      {/* Daily Progress Header */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-orange-600" />
            Daily Islamic Challenges
          </CardTitle>
          <p className="text-sm text-gray-600">{currentDate}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{completionRate}%</div>
              <div className="text-sm text-gray-600">Daily Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{dailyPoints}</div>
              <div className="text-sm text-gray-600">Points Today</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-6 h-6 text-red-500" />
                <span className="text-2xl font-bold text-red-600">{totalStreak}</span>
              </div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{weeklyPoints}</div>
              <div className="text-sm text-gray-600">Week Total</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Completion</span>
              <span>{completedChallenges.length}/{challenges.length}</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Challenge Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {['prayer', 'quran', 'dhikr', 'charity', 'reflection', 'community'].map(category => {
          const categoryCount = challenges.filter(c => c.category === category).length;
          const completedCount = challenges.filter(c => c.category === category && c.completed).length;
          
          return (
            <Card key={category} className="p-3">
              <div className="text-center">
                <div className={`text-lg font-semibold ${getCategoryColor(category)} capitalize`}>
                  {category}
                </div>
                <div className="text-sm text-gray-600">
                  {completedCount}/{categoryCount} completed
                </div>
                <Progress value={(completedCount / categoryCount) * 100} className="h-2 mt-2" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {challenges.map((challenge) => {
          const Icon = challenge.icon;
          const progress = challenge.requirement.type === 'completion' 
            ? (challenge.completed ? 100 : 0)
            : (challenge.progress / challenge.requirement.target) * 100;
          
          return (
            <Card 
              key={challenge.id} 
              className={`transition-all ${
                challenge.completed 
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20' 
                  : 'hover:shadow-md'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-6 h-6 ${getCategoryColor(challenge.category)}`} />
                      <h3 className="font-semibold text-lg">{challenge.title}</h3>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      {challenge.completed && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {challenge.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {challenge.points} points
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {challenge.timeEstimate} min
                      </span>
                    </div>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {challenge.requirement.type === 'completion' 
                            ? (challenge.completed ? 'Complete' : 'Not started')
                            : `${challenge.progress}/${challenge.requirement.target} ${challenge.requirement.unit || ''}`
                          }
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="ml-4 flex flex-col gap-2">
                    {!challenge.completed && (
                      <>
                        {challenge.requirement.type === 'completion' ? (
                          <Button
                            onClick={() => completeChallenge(challenge.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Complete
                          </Button>
                        ) : (
                          <div className="space-y-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateProgress(challenge.id, challenge.progress + 1)}
                            >
                              +1
                            </Button>
                            {challenge.progress >= challenge.requirement.target && (
                              <Button
                                onClick={() => completeChallenge(challenge.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        )}
                      </>
                    )}
                    
                    {challenge.completed && challenge.completedAt && (
                      <div className="text-xs text-green-600 text-center">
                        Completed at<br />
                        {new Date(challenge.completedAt).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completion Reward */}
      {completionRate === 100 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-yellow-800 mb-2">
              🎉 Daily Challenge Complete!
            </h3>
            <p className="text-yellow-700 mb-4">
              Masha'Allah! You've completed all today's challenges. 
            </p>
            <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
              +50 Bonus Points
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DailyIslamicChallenges;
