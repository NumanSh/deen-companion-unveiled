
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Award, Target, Flame, BookOpen, Heart, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: number;
  title: string;
  description: string;
  category: 'prayer' | 'quran' | 'dhikr' | 'knowledge' | 'charity' | 'habits';
  icon: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  reward: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserLevel {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  title: string;
}

const IslamicAchievementSystem = () => {
  const { toast } = useToast();
  
  const [userLevel, setUserLevel] = useState<UserLevel>({
    currentLevel: 12,
    currentXP: 450,
    xpToNextLevel: 550,
    totalXP: 2450,
    title: 'طالب علم مجتهد'
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: 'محافظ على الصلاة',
      description: 'صل 30 يوماً متتالياً في الوقت',
      category: 'prayer',
      icon: '🕌',
      progress: 23,
      maxProgress: 30,
      isCompleted: false,
      reward: '50 نقطة + لقب المصلي المنتظم',
      rarity: 'rare'
    },
    {
      id: 2,
      title: 'حافظ القرآن الصغير',
      description: 'احفظ 5 سور كاملة',
      category: 'quran',
      icon: '📖',
      progress: 5,
      maxProgress: 5,
      isCompleted: true,
      reward: '100 نقطة + شارة حافظ القرآن',
      rarity: 'epic'
    },
    {
      id: 3,
      title: 'ذاكر الله',
      description: 'اكمل 1000 تسبيحة',
      category: 'dhikr',
      icon: '📿',
      progress: 756,
      maxProgress: 1000,
      isCompleted: false,
      reward: '30 نقطة + عداد ذهبي',
      rarity: 'common'
    },
    {
      id: 4,
      title: 'طالب علم',
      description: 'اقرأ 20 حديث مع شروحاتها',
      category: 'knowledge',
      icon: '🎓',
      progress: 12,
      maxProgress: 20,
      isCompleted: false,
      reward: '40 نقطة + مكتبة خاصة',
      rarity: 'rare'
    },
    {
      id: 5,
      title: 'المتصدق الكريم',
      description: 'تبرع لـ 10 مشاريع خيرية',
      category: 'charity',
      icon: '💝',
      progress: 7,
      maxProgress: 10,
      isCompleted: false,
      reward: '75 نقطة + شارة الكرم',
      rarity: 'epic'
    },
    {
      id: 6,
      title: 'الملتزم بالعادات',
      description: 'حافظ على 5 عادات إسلامية لمدة أسبوع',
      category: 'habits',
      icon: '✅',
      progress: 5,
      maxProgress: 5,
      isCompleted: true,
      reward: '25 نقطة + منظم العادات',
      rarity: 'common'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [streaks, setStreaks] = useState({
    prayer: 23,
    quran: 15,
    dhikr: 8,
    charity: 5
  });

  const categories = [
    { key: 'all', label: 'الكل', icon: Trophy },
    { key: 'prayer', label: 'الصلاة', icon: Calendar },
    { key: 'quran', label: 'القرآن', icon: BookOpen },
    { key: 'dhikr', label: 'الذكر', icon: Heart },
    { key: 'knowledge', label: 'العلم', icon: Star },
    { key: 'charity', label: 'الصدقة', icon: Award },
    { key: 'habits', label: 'العادات', icon: Target }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'عادي';
      case 'rare': return 'نادر';
      case 'epic': return 'ملحمي';
      case 'legendary': return 'أسطوري';
      default: return 'عادي';
    }
  };

  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === activeCategory);

  const completedCount = achievements.filter(a => a.isCompleted).length;
  const progressPercentage = (userLevel.currentXP / (userLevel.currentXP + userLevel.xpToNextLevel)) * 100;

  const claimReward = (achievementId: number) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && achievement.progress >= achievement.maxProgress && !achievement.isCompleted) {
      setAchievements(prev => prev.map(a => 
        a.id === achievementId ? { ...a, isCompleted: true } : a
      ));
      
      // Add XP based on rarity
      const xpGain = achievement.rarity === 'legendary' ? 100 : 
                     achievement.rarity === 'epic' ? 75 :
                     achievement.rarity === 'rare' ? 50 : 25;
      
      setUserLevel(prev => ({
        ...prev,
        currentXP: prev.currentXP + xpGain,
        totalXP: prev.totalXP + xpGain
      }));

      toast({
        title: '🎉 تهانينا!',
        description: `أنجزت "${achievement.title}" وحصلت على ${xpGain} نقطة خبرة!`,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          نظام الإنجازات الإسلامية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Level Section */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-yellow-800">المستوى {userLevel.currentLevel}</h3>
              <p className="text-yellow-700">{userLevel.title}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-800">{userLevel.totalXP}</div>
              <div className="text-sm text-yellow-600">نقطة خبرة إجمالية</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>التقدم للمستوى التالي</span>
              <span>{userLevel.currentXP}/{userLevel.currentXP + userLevel.xpToNextLevel}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <div className="text-xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-green-600">إنجاز مكتمل</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <div className="text-xl font-bold text-blue-600">{streaks.prayer}</div>
            <div className="text-sm text-blue-600">يوم صلاة متتالي</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <div className="text-xl font-bold text-purple-600">{streaks.quran}</div>
            <div className="text-sm text-purple-600">يوم قراءة قرآن</div>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg text-center">
            <div className="text-xl font-bold text-pink-600">{streaks.dhikr}</div>
            <div className="text-sm text-pink-600">يوم ذكر منتظم</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                variant={activeCategory === category.key ? 'default' : 'outline'}
                size="sm"
                className="gap-1"
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Achievements List */}
        <div className="space-y-4">
          {filteredAchievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 border-2 rounded-lg ${getRarityColor(achievement.rarity)} ${
                achievement.isCompleted ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2">
                      {achievement.title}
                      {achievement.isCompleted && <Badge className="bg-green-500 text-white">مكتمل</Badge>}
                    </h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {getRarityLabel(achievement.rarity)}
                </Badge>
              </div>

              {/* Progress Bar */}
              {!achievement.isCompleted && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>التقدم</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className="h-2" 
                  />
                </div>
              )}

              {/* Reward and Action */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">المكافأة:</span> {achievement.reward}
                </div>
                {achievement.progress >= achievement.maxProgress && !achievement.isCompleted && (
                  <Button
                    onClick={() => claimReward(achievement.id)}
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Award className="w-4 h-4 mr-1" />
                    استلم المكافأة
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg text-center">
          <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h4 className="font-semibold text-indigo-800 mb-1">استمر في التقدم!</h4>
          <p className="text-sm text-indigo-700">
            كل عمل صالح تقوم به يقربك أكثر من أهدافك الروحية
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicAchievementSystem;
