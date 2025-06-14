
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Crown, Zap, Target, Calendar, Award, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Milestone {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  category: 'prayer' | 'quran' | 'dhikr' | 'charity' | 'knowledge' | 'character';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirement: string;
  progress: number;
  target: number;
  isCompleted: boolean;
  completedDate?: string;
  reward: string;
  badge: string;
  spiritualValue: string;
}

interface Achievement {
  id: string;
  title: string;
  unlockedDate: string;
  category: string;
  badge: string;
}

const IslamicMilestoneTracker = () => {
  const { toast } = useToast();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'prayer' | 'quran' | 'dhikr' | 'charity' | 'knowledge' | 'character'>('all');

  useEffect(() => {
    const sampleMilestones: Milestone[] = [
      {
        id: '1',
        title: 'Prayer Consistency Champion',
        titleArabic: 'بطل المحافظة على الصلاة',
        description: 'Maintain perfect prayer attendance for 30 consecutive days',
        category: 'prayer',
        difficulty: 'gold',
        requirement: 'Complete all 5 daily prayers for 30 days',
        progress: 23,
        target: 30,
        isCompleted: false,
        reward: 'Special dua collection unlock',
        badge: '🏆',
        spiritualValue: 'Building the foundation of Islamic practice through consistent prayer'
      },
      {
        id: '2',
        title: 'Quran Companion',
        titleArabic: 'رفيق القرآن',
        description: 'Read one page of Quran daily for 100 days',
        category: 'quran',
        difficulty: 'silver',
        requirement: 'Daily Quran reading streak',
        progress: 67,
        target: 100,
        isCompleted: false,
        reward: 'Advanced tafsir resources',
        badge: '📖',
        spiritualValue: 'Developing a lifelong relationship with the Book of Allah'
      },
      {
        id: '3',
        title: 'Dhikr Master',
        titleArabic: 'أستاذ الذكر',
        description: 'Complete 10,000 dhikr recitations',
        category: 'dhikr',
        difficulty: 'platinum',
        requirement: 'Accumulate dhikr count',
        progress: 8450,
        target: 10000,
        isCompleted: false,
        reward: 'Exclusive dhikr meditation guide',
        badge: '📿',
        spiritualValue: 'Purifying the heart through constant remembrance of Allah'
      },
      {
        id: '4',
        title: 'Generous Heart',
        titleArabic: 'القلب الكريم',
        description: 'Give charity for 40 consecutive days',
        category: 'charity',
        difficulty: 'gold',
        requirement: 'Daily charity giving',
        progress: 40,
        target: 40,
        isCompleted: true,
        completedDate: '2024-01-10',
        reward: 'Charity impact tracker',
        badge: '💰',
        spiritualValue: 'Developing generosity and helping those in need'
      },
      {
        id: '5',
        title: 'Seeker of Knowledge',
        titleArabic: 'طالب العلم',
        description: 'Complete 50 Islamic learning sessions',
        category: 'knowledge',
        difficulty: 'silver',
        requirement: 'Attend study sessions or complete lessons',
        progress: 32,
        target: 50,
        isCompleted: false,
        reward: 'Access to advanced courses',
        badge: '🎓',
        spiritualValue: 'Following the prophetic tradition of seeking knowledge'
      },
      {
        id: '6',
        title: 'Patient Soul',
        titleArabic: 'النفس الصابرة',
        description: 'Practice patience in challenging situations',
        category: 'character',
        difficulty: 'bronze',
        requirement: 'Self-reflection and patience exercises',
        progress: 15,
        target: 20,
        isCompleted: false,
        reward: 'Character development guide',
        badge: '🌱',
        spiritualValue: 'Building beautiful character traits through patience'
      }
    ];

    const sampleAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Generous Heart',
        unlockedDate: '2024-01-10',
        category: 'charity',
        badge: '💰'
      },
      {
        id: '2',
        title: 'First Week Warrior',
        unlockedDate: '2024-01-05',
        category: 'prayer',
        badge: '⚔️'
      },
      {
        id: '3',
        title: 'Dhikr Beginner',
        unlockedDate: '2024-01-03',
        category: 'dhikr',
        badge: '🌟'
      }
    ];

    setMilestones(sampleMilestones);
    setAchievements(sampleAchievements);
  }, []);

  const categories = [
    { key: 'all', label: 'الكل', icon: Target },
    { key: 'prayer', label: 'الصلاة', icon: Star },
    { key: 'quran', label: 'القرآن', icon: Crown },
    { key: 'dhikr', label: 'الذكر', icon: Zap },
    { key: 'charity', label: 'الصدقة', icon: Gift },
    { key: 'knowledge', label: 'العلم', icon: Award },
    { key: 'character', label: 'الأخلاق', icon: Trophy }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prayer': return 'bg-blue-100 text-blue-800';
      case 'quran': return 'bg-green-100 text-green-800';
      case 'dhikr': return 'bg-purple-100 text-purple-800';
      case 'charity': return 'bg-orange-100 text-orange-800';
      case 'knowledge': return 'bg-indigo-100 text-indigo-800';
      case 'character': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMilestones = milestones.filter(milestone => 
    selectedCategory === 'all' || milestone.category === selectedCategory
  );

  const claimReward = (milestoneId: string) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (milestone?.isCompleted) {
      toast({
        title: 'تم استلام المكافأة! 🎉',
        description: milestone.reward,
      });
    }
  };

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          متتبع المعالم الإسلامية
        </CardTitle>
        <p className="text-sm text-gray-600">حقق إنجازات روحية واكسب مكافآت في رحلتك الإيمانية</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.key}
                size="sm"
                variant={selectedCategory === category.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.key as any)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Recent Achievements */}
        {achievements.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              الإنجازات الأخيرة
            </h3>
            <div className="flex flex-wrap gap-2">
              {achievements.slice(0, 3).map(achievement => (
                <Badge key={achievement.id} className="bg-yellow-100 text-yellow-800">
                  <span className="mr-1">{achievement.badge}</span>
                  {achievement.title}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Milestones Grid */}
        <div className="space-y-4">
          {filteredMilestones.map(milestone => {
            const progressPercentage = getProgressPercentage(milestone.progress, milestone.target);
            
            return (
              <div 
                key={milestone.id} 
                className={`border rounded-lg p-6 transition-all ${
                  milestone.isCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white hover:shadow-md'
                }`}
              >
                {/* Milestone Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{milestone.badge}</span>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {milestone.title}
                        {milestone.isCompleted && (
                          <Badge className="bg-green-100 text-green-800">
                            ✅ مكتمل
                          </Badge>
                        )}
                      </h3>
                      <p className="text-right text-gray-600" dir="rtl">{milestone.titleArabic}</p>
                      <p className="text-sm text-gray-500">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getDifficultyColor(milestone.difficulty)}>
                      {milestone.difficulty.toUpperCase()}
                    </Badge>
                    <Badge className={getCategoryColor(milestone.category)}>
                      {milestone.category}
                    </Badge>
                  </div>
                </div>

                {/* Progress Section */}
                {!milestone.isCompleted && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">التقدم</span>
                      <span>{milestone.progress} / {milestone.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round(progressPercentage)}% مكتمل
                    </div>
                  </div>
                )}

                {/* Completion Info */}
                {milestone.isCompleted && milestone.completedDate && (
                  <div className="mb-4 p-3 bg-green-100 rounded">
                    <div className="flex items-center gap-2 text-green-800">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        تم الإكمال في: {new Date(milestone.completedDate).toLocaleDateString('ar')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Requirement */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-700 mb-1">المتطلب:</h4>
                  <p className="text-sm text-gray-600">{milestone.requirement}</p>
                </div>

                {/* Spiritual Value */}
                <div className="mb-4 p-3 bg-blue-50 rounded">
                  <h4 className="font-medium text-sm text-blue-800 mb-1">القيمة الروحية:</h4>
                  <p className="text-sm text-blue-700">{milestone.spiritualValue}</p>
                </div>

                {/* Reward */}
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sm text-purple-700 mb-1">المكافأة:</h4>
                    <p className="text-sm text-purple-600">{milestone.reward}</p>
                  </div>
                  {milestone.isCompleted && (
                    <Button size="sm" onClick={() => claimReward(milestone.id)}>
                      <Gift className="w-4 h-4 mr-1" />
                      استلم المكافأة
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Progress */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {milestones.filter(m => m.isCompleted).length}
            </div>
            <div className="text-xs text-purple-600">معالم مكتملة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {milestones.length - milestones.filter(m => m.isCompleted).length}
            </div>
            <div className="text-xs text-blue-600">قيد التقدم</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {achievements.length}
            </div>
            <div className="text-xs text-green-600">إنجازات محققة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">
              {Math.round((milestones.filter(m => m.isCompleted).length / milestones.length) * 100)}%
            </div>
            <div className="text-xs text-orange-600">نسبة الإكمال</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicMilestoneTracker;
