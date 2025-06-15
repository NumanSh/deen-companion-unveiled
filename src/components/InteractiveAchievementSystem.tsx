
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  Star, 
  Trophy, 
  Target, 
  Flame, 
  BookOpen,
  Clock,
  Heart,
  Zap,
  Crown,
  Medal,
  Gift
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
  isUnlocked: boolean;
  category: 'reading' | 'consistency' | 'exploration' | 'spiritual';
  reward: string;
}

const InteractiveAchievementSystem = () => {
  const { toast } = useToast();
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-read',
      title: 'First Steps',
      description: 'Read your first verse',
      icon: <BookOpen className="w-4 h-4" />,
      progress: 1,
      total: 1,
      isUnlocked: true,
      category: 'reading',
      reward: '10 points'
    },
    {
      id: 'week-streak',
      title: 'Consistent Believer',
      description: 'Read for 7 consecutive days',
      icon: <Flame className="w-4 h-4" />,
      progress: 5,
      total: 7,
      isUnlocked: false,
      category: 'consistency',
      reward: '50 points'
    },
    {
      id: 'hundred-verses',
      title: 'Devoted Reader',
      description: 'Read 100 verses',
      icon: <Star className="w-4 h-4" />,
      progress: 67,
      total: 100,
      isUnlocked: false,
      category: 'reading',
      reward: '100 points'
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Read before Fajr 5 times',
      icon: <Clock className="w-4 h-4" />,
      progress: 3,
      total: 5,
      isUnlocked: false,
      category: 'spiritual',
      reward: 'Special badge'
    },
    {
      id: 'explorer',
      title: 'Quran Explorer',
      description: 'Read from 10 different Surahs',
      icon: <Trophy className="w-4 h-4" />,
      progress: 7,
      total: 10,
      isUnlocked: false,
      category: 'exploration',
      reward: 'New theme unlock'
    },
    {
      id: 'dedicated',
      title: 'Dedicated Soul',
      description: 'Complete 30 reading sessions',
      icon: <Crown className="w-4 h-4" />,
      progress: 12,
      total: 30,
      isUnlocked: false,
      category: 'consistency',
      reward: 'Premium features'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);

  const categories = [
    { key: 'all', label: 'All', icon: <Award className="w-3 h-3" /> },
    { key: 'reading', label: 'Reading', icon: <BookOpen className="w-3 h-3" /> },
    { key: 'consistency', label: 'Consistency', icon: <Flame className="w-3 h-3" /> },
    { key: 'exploration', label: 'Exploration', icon: <Target className="w-3 h-3" /> },
    { key: 'spiritual', label: 'Spiritual', icon: <Heart className="w-3 h-3" /> }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const overallProgress = (unlockedCount / totalCount) * 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'reading': return 'bg-blue-500';
      case 'consistency': return 'bg-orange-500';
      case 'exploration': return 'bg-purple-500';
      case 'spiritual': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleClaimReward = (achievement: Achievement) => {
    toast({
      title: 'Achievement Unlocked! 🎉',
      description: `${achievement.title} - ${achievement.reward}`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Your Journey</h3>
              <p className="text-indigo-100 text-sm">Keep growing spiritually</p>
            </div>
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-1" />
              <div className="text-lg font-bold">{unlockedCount}/{totalCount}</div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-2 bg-indigo-400" />
          <p className="text-xs text-indigo-200 mt-2">{Math.round(overallProgress)}% complete</p>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
                className="h-8"
              >
                {category.icon}
                <span className="ml-1 text-xs">{category.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements List */}
      <div className="space-y-3">
        {filteredAchievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`transition-all duration-300 ${
              achievement.isUnlocked 
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg' 
                : 'hover:shadow-md'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.isUnlocked 
                        ? 'bg-yellow-400 text-white' 
                        : getCategoryColor(achievement.category) + ' text-white opacity-70'
                    }`}>
                      {achievement.isUnlocked ? <Crown className="w-5 h-5" /> : achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>

                  {!achievement.isUnlocked && (
                    <div className="ml-13">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{achievement.progress}/{achievement.total}</span>
                        <span>{Math.round((achievement.progress / achievement.total) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}

                  {achievement.isUnlocked && (
                    <div className="ml-13">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Gift className="w-3 h-3 mr-1" />
                        {achievement.reward}
                      </Badge>
                    </div>
                  )}
                </div>

                {achievement.isUnlocked && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleClaimReward(achievement)}
                    className="text-xs"
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Claim
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Motivational Message */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="p-4 text-center">
          <Medal className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
          <p className="text-sm text-emerald-700 font-medium">
            "And those who strive for Us - We will surely guide them to Our ways." 
          </p>
          <p className="text-xs text-emerald-600 mt-1">- Quran 29:69</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveAchievementSystem;
