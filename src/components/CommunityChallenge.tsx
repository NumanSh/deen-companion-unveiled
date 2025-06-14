import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Target, Star, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  unit: string;
  reward: string;
  emoji: string;
  category: 'reading' | 'dhikr' | 'charity' | 'prayer';
  duration: number; // days
}

interface UserProgress {
  challengeId: string;
  progress: number;
  completed: boolean;
  joinDate: string;
}

const CommunityChallenge: React.FC = () => {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [todayProgress, setTodayProgress] = useState(0);
  const [participants, setParticipants] = useState(1247); // Simulated
  const { toast } = useToast();

  const challenges: Challenge[] = [
    {
      id: 'ramadan-quran',
      title: 'Complete Quran in Ramadan',
      description: 'Read the entire Quran during the holy month of Ramadan',
      target: 114,
      unit: 'Surahs',
      reward: '🏆 Ramadan Completion Badge',
      emoji: '📖',
      category: 'reading',
      duration: 30
    },
    {
      id: 'daily-dhikr',
      title: '1000 Daily Dhikr',
      description: 'Recite 1000 dhikr daily for spiritual purification',
      target: 30000,
      unit: 'Dhikr',
      reward: '⭐ Dhikr Master Badge',
      emoji: '📿',
      category: 'dhikr',
      duration: 30
    },
    {
      id: 'charity-challenge',
      title: 'Daily Charity',
      description: 'Give charity every day, no matter how small',
      target: 30,
      unit: 'Days',
      reward: '💝 Generous Heart Badge',
      emoji: '🤲',
      category: 'charity',
      duration: 30
    },
    {
      id: 'tahajjud-challenge',
      title: 'Night Prayer Challenge',
      description: 'Perform Tahajjud prayer for 21 consecutive days',
      target: 21,
      unit: 'Nights',
      reward: '🌙 Night Worshipper Badge',
      emoji: '🌙',
      category: 'prayer',
      duration: 21
    }
  ];

  useEffect(() => {
    // Load active challenge
    const saved = localStorage.getItem('community-challenge');
    if (saved) {
      const data = JSON.parse(saved);
      setActiveChallenge(challenges.find(c => c.id === data.challengeId) || null);
      setUserProgress(data);
    } else {
      // Set default challenge
      setActiveChallenge(challenges[1]); // Daily Dhikr challenge
    }

    // Simulate participants count
    const interval = setInterval(() => {
      setParticipants(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const joinChallenge = (challenge: Challenge) => {
    const newProgress: UserProgress = {
      challengeId: challenge.id,
      progress: 0,
      completed: false,
      joinDate: new Date().toISOString()
    };

    setActiveChallenge(challenge);
    setUserProgress(newProgress);
    setTodayProgress(0);
    
    localStorage.setItem('community-challenge', JSON.stringify(newProgress));
    
    toast({
      title: "Challenge Joined!",
      description: `You've joined the ${challenge.title} challenge. Good luck!`,
    });
  };

  const updateProgress = (amount: number) => {
    if (!activeChallenge || !userProgress) return;

    const newProgress = Math.min(userProgress.progress + amount, activeChallenge.target);
    const isCompleted = newProgress >= activeChallenge.target;
    
    const updated: UserProgress = {
      ...userProgress,
      progress: newProgress,
      completed: isCompleted
    };

    setUserProgress(updated);
    setTodayProgress(prev => prev + amount);
    localStorage.setItem('community-challenge', JSON.stringify(updated));

    if (isCompleted && !userProgress.completed) {
      toast({
        title: "🎉 Challenge Completed!",
        description: `Congratulations! You've earned: ${activeChallenge.reward}`,
      });
    } else {
      toast({
        title: "Progress Updated",
        description: `+${amount} ${activeChallenge.unit}. Keep going!`,
      });
    }
  };

  const getProgressPercentage = () => {
    if (!activeChallenge || !userProgress) return 0;
    return Math.min((userProgress.progress / activeChallenge.target) * 100, 100);
  };

  const getDaysRemaining = () => {
    if (!userProgress) return 0;
    const joinDate = new Date(userProgress.joinDate);
    const endDate = new Date(joinDate.getTime() + (activeChallenge?.duration || 30) * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
  };

  if (!activeChallenge) return null;

  return (
    <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-violet-600" />
          Community Challenge
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Challenge Header */}
        <div className="text-center space-y-2">
          <div className="text-4xl mb-2">{activeChallenge.emoji}</div>
          <h3 className="text-xl font-bold text-violet-800 dark:text-violet-200">
            {activeChallenge.title}
          </h3>
          <p className="text-sm text-violet-600 dark:text-violet-400">
            {activeChallenge.description}
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-violet-600" />
              <span>{participants.toLocaleString()} participants</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-violet-600" />
              <span>{getDaysRemaining()} days left</span>
            </div>
          </div>
        </div>

        {userProgress ? (
          <>
            {/* Progress Display */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Your Progress</span>
                <span className="text-sm text-violet-600">
                  {userProgress.progress} / {activeChallenge.target} {activeChallenge.unit}
                </span>
              </div>
              
              <Progress value={getProgressPercentage()} className="h-3" />
              
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-700 dark:text-violet-300">
                  {getProgressPercentage().toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Complete</div>
              </div>
            </div>

            {/* Today's Progress */}
            <div className="bg-violet-100 dark:bg-violet-900/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Today's Progress</span>
                <span className="text-sm text-violet-600">
                  +{todayProgress} {activeChallenge.unit}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => updateProgress(1)}
                  disabled={userProgress.completed}
                  className="flex-1"
                >
                  +1
                </Button>
                <Button
                  size="sm"
                  onClick={() => updateProgress(5)}
                  disabled={userProgress.completed}
                  className="flex-1"
                >
                  +5
                </Button>
                <Button
                  size="sm"
                  onClick={() => updateProgress(10)}
                  disabled={userProgress.completed}
                  className="flex-1"
                >
                  +10
                </Button>
              </div>
            </div>

            {/* Completion Status */}
            {userProgress.completed && (
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-green-800 dark:text-green-200 font-semibold">
                  Challenge Completed! 🎉
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                  {activeChallenge.reward}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Join Challenge */
          <div className="text-center space-y-4">
            <div className="bg-violet-100 dark:bg-violet-900/30 p-4 rounded-lg">
              <Star className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="text-violet-800 dark:text-violet-200 font-semibold">
                Ready to join the challenge?
              </div>
              <div className="text-sm text-violet-600 dark:text-violet-400 mt-1">
                Target: {activeChallenge.target} {activeChallenge.unit} in {activeChallenge.duration} days
              </div>
            </div>
            
            <Button
              onClick={() => joinChallenge(activeChallenge)}
              className="w-full bg-violet-600 hover:bg-violet-700"
            >
              Join Challenge
            </Button>
          </div>
        )}

        {/* Other Challenges */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Other Challenges</div>
          <div className="grid grid-cols-2 gap-2">
            {challenges
              .filter(c => c.id !== activeChallenge.id)
              .slice(0, 4)
              .map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => joinChallenge(challenge)}
                  className="p-2 bg-white dark:bg-gray-800 rounded-lg border hover:border-violet-300 transition-colors text-left"
                >
                  <div className="text-lg mb-1">{challenge.emoji}</div>
                  <div className="text-xs font-medium line-clamp-2">
                    {challenge.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {challenge.duration} days
                  </div>
                </button>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityChallenge;
