
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Medal, 
  Award, 
  Target, 
  Calendar,
  BookOpen,
  Heart,
  Zap,
  Crown,
  Gift
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  category: 'prayer' | 'quran' | 'dhikr' | 'charity' | 'knowledge' | 'consistency';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirement: number;
  currentProgress: number;
  unlocked: boolean;
  unlockedAt?: number;
  reward: string;
}

const IslamicAchievementSystem = () => {
  const { toast } = useToast();
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'prayer-consistency-7',
      title: 'Steadfast Believer',
      description: 'Maintain prayer consistency for 7 days',
      icon: Calendar,
      category: 'prayer',
      difficulty: 'bronze',
      requirement: 7,
      currentProgress: 3,
      unlocked: false,
      reward: '50 Spiritual Points'
    },
    {
      id: 'quran-reader-30',
      title: 'Quran Devotee',
      description: 'Read Quran for 30 sessions',
      icon: BookOpen,
      category: 'quran',
      difficulty: 'silver',
      requirement: 30,
      currentProgress: 12,
      unlocked: false,
      reward: 'Special Quran Theme'
    },
    {
      id: 'dhikr-master-1000',
      title: 'Dhikr Master',
      description: 'Complete 1000 dhikr recitations',
      icon: Heart,
      category: 'dhikr',
      difficulty: 'gold',
      requirement: 1000,
      currentProgress: 420,
      unlocked: false,
      reward: 'Golden Tasbih Badge'
    },
    {
      id: 'charity-giver-10',
      title: 'Generous Heart',
      description: 'Track 10 charitable acts',
      icon: Gift,
      category: 'charity',
      difficulty: 'silver',
      requirement: 10,
      currentProgress: 3,
      unlocked: false,
      reward: 'Charity Impact Dashboard'
    },
    {
      id: 'knowledge-seeker-100',
      title: 'Knowledge Seeker',
      description: 'Complete 100 learning sessions',
      icon: Star,
      category: 'knowledge',
      difficulty: 'platinum',
      requirement: 100,
      currentProgress: 45,
      unlocked: false,
      reward: 'Advanced AI Tutor Access'
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(1250);
  const [currentLevel, setCurrentLevel] = useState(8);
  const [nextLevelProgress, setNextLevelProgress] = useState(75);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'bronze': return 'text-amber-600 bg-amber-50';
      case 'silver': return 'text-gray-600 bg-gray-50';
      case 'gold': return 'text-yellow-600 bg-yellow-50';
      case 'platinum': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prayer': return 'text-blue-600';
      case 'quran': return 'text-green-600';
      case 'dhikr': return 'text-purple-600';
      case 'charity': return 'text-pink-600';
      case 'knowledge': return 'text-indigo-600';
      case 'consistency': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const claimAchievement = (achievement: Achievement) => {
    if (achievement.currentProgress >= achievement.requirement && !achievement.unlocked) {
      setAchievements(prev => 
        prev.map(a => 
          a.id === achievement.id 
            ? { ...a, unlocked: true, unlockedAt: Date.now() }
            : a
        )
      );
      
      setTotalPoints(prev => prev + 100);
      
      toast({
        title: '🎉 Achievement Unlocked!',
        description: `${achievement.title} - ${achievement.reward}`,
      });
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const availableAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="space-y-6">
      {/* Player Stats */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-600" />
            Your Islamic Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{currentLevel}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{totalPoints}</div>
              <div className="text-sm text-gray-600">Spiritual Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{unlockedAchievements.length}</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{Math.round(nextLevelProgress)}%</div>
              <div className="text-sm text-gray-600">Next Level</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Level {currentLevel + 1}</span>
              <span>{nextLevelProgress}%</span>
            </div>
            <Progress value={nextLevelProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Available Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Current Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableAchievements.slice(0, 4).map((achievement) => {
              const Icon = achievement.icon;
              const progress = Math.min((achievement.currentProgress / achievement.requirement) * 100, 100);
              const isClaimable = achievement.currentProgress >= achievement.requirement;
              
              return (
                <div key={achievement.id} className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${getCategoryColor(achievement.category)}`} />
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(achievement.difficulty)}>
                      {achievement.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.currentProgress}/{achievement.requirement}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-green-600">🎁 {achievement.reward}</span>
                    {isClaimable && (
                      <Button 
                        size="sm" 
                        onClick={() => claimAchievement(achievement)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Claim
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Medal className="w-5 h-5 text-gold-600" />
              Your Achievements ({unlockedAchievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement) => {
                const Icon = achievement.icon;
                
                return (
                  <div key={achievement.id} className="p-3 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${getCategoryColor(achievement.category)}`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IslamicAchievementSystem;
