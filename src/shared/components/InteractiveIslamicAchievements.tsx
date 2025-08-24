
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
  BookOpen, 
  Clock,
  Heart,
  Zap,
  Crown,
  Gift,
  Flame,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: unknown;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'reading' | 'learning' | 'habits' | 'community' | 'special';
  reward: string;
  unlockedAt?: Date;
}

const InteractiveIslamicAchievements = () => {
  const { toast } = useToast();
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-quran-read',
      title: 'أول قراءة',
      description: 'اقرأ أول سورة من القرآن الكريم',
      icon: BookOpen,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      rarity: 'common',
      category: 'reading',
      reward: '+10 نقاط روحانية',
      unlockedAt: new Date()
    },
    {
      id: 'reading-streak-7',
      title: 'قارئ مثابر',
      description: 'اقرأ لمدة 7 أيام متتالية',
      icon: Flame,
      progress: 7,
      maxProgress: 7,
      unlocked: true,
      rarity: 'rare',
      category: 'habits',
      reward: 'شارة القارئ المثابر',
      unlockedAt: new Date(Date.now() - 86400000)
    },
    {
      id: 'quran-completion',
      title: 'ختم القرآن',
      description: 'أكمل قراءة القرآن الكريم كاملاً',
      icon: Crown,
      progress: 85,
      maxProgress: 114,
      unlocked: false,
      rarity: 'legendary',
      category: 'reading',
      reward: 'لقب حافظ القرآن'
    },
    {
      id: 'daily-dhikr',
      title: 'ذاكر الله',
      description: 'أكمل الأذكار اليومية لمدة 30 يوماً',
      icon: Heart,
      progress: 23,
      maxProgress: 30,
      unlocked: false,
      rarity: 'epic',
      category: 'habits',
      reward: 'تاج الذكر الذهبي'
    },
    {
      id: 'hadith-scholar',
      title: 'عالم الحديث',
      description: 'اقرأ 100 حديث مختلف',
      icon: Star,
      progress: 67,
      maxProgress: 100,
      unlocked: false,
      rarity: 'rare',
      category: 'learning',
      reward: '+50 نقاط علم'
    },
    {
      id: 'community-helper',
      title: 'مساعد المجتمع',
      description: 'ساعد 10 أشخاص في طلبات الدعاء',
      icon: Gift,
      progress: 3,
      maxProgress: 10,
      unlocked: false,
      rarity: 'epic',
      category: 'community',
      reward: 'شارة المساعد الأمين'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'reading': return BookOpen;
      case 'learning': return Star;
      case 'habits': return Target;
      case 'community': return Heart;
      case 'special': return Trophy;
      default: return Award;
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    const statusMatch = filter === 'all' || 
      (filter === 'unlocked' && achievement.unlocked) ||
      (filter === 'locked' && !achievement.unlocked);
    
    const categoryMatch = categoryFilter === 'all' || achievement.category === categoryFilter;
    
    return statusMatch && categoryMatch;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalProgress = achievements.reduce((sum, a) => sum + (a.progress / a.maxProgress), 0);

  const handleClaimReward = (achievement: Achievement) => {
    toast({
      title: `🏆 ${achievement.title}`,
      description: `تم استلام: ${achievement.reward}`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{unlockedCount}</div>
              <div className="text-sm text-gray-600">إنجازات مفتوحة</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{achievements.length}</div>
              <div className="text-sm text-gray-600">إجمالي الإنجازات</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{Math.round(totalProgress * 100 / achievements.length)}%</div>
              <div className="text-sm text-gray-600">التقدم الإجمالي</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1,245</div>
              <div className="text-sm text-gray-600">النقاط الكلية</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2">
          {['all', 'unlocked', 'locked'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType as any)}
            >
              {filterType === 'all' ? 'الكل' : filterType === 'unlocked' ? 'مفتوحة' : 'مغلقة'}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {['all', 'reading', 'learning', 'habits', 'community', 'special'].map((category) => (
            <Button
              key={category}
              variant={categoryFilter === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter(category)}
            >
              {category === 'all' ? 'جميع الفئات' : 
               category === 'reading' ? 'قراءة' :
               category === 'learning' ? 'تعلم' :
               category === 'habits' ? 'عادات' :
               category === 'community' ? 'مجتمع' : 'خاص'}
            </Button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => {
          const Icon = achievement.icon;
          const CategoryIcon = getCategoryIcon(achievement.category);
          
          return (
            <Card 
              key={achievement.id} 
              className={`transition-all duration-300 hover:shadow-lg ${
                achievement.unlocked 
                  ? 'border-emerald-200 bg-emerald-50/50' 
                  : 'border-gray-200 bg-gray-50/30'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${
                      achievement.unlocked 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <CategoryIcon className="w-4 h-4 text-gray-500" />
                        <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity === 'common' ? 'عادي' :
                           achievement.rarity === 'rare' ? 'نادر' :
                           achievement.rarity === 'epic' ? 'ملحمي' : 'أسطوري'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <div className="text-emerald-500">
                      <Award className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{achievement.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التقدم</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className={`h-2 ${achievement.unlocked ? 'bg-emerald-100' : ''}`}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500">المكافأة: </span>
                    <span className="font-medium text-amber-600">{achievement.reward}</span>
                  </div>
                  {achievement.unlocked && (
                    <Button 
                      size="sm" 
                      onClick={() => handleClaimReward(achievement)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      استلام
                    </Button>
                  )}
                </div>

                {achievement.unlockedAt && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    تم الفتح: {achievement.unlockedAt.toLocaleDateString('ar-SA')}
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

export default InteractiveIslamicAchievements;
