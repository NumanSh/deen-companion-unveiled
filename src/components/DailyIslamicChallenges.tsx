
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, Flame, Gift, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'worship' | 'knowledge' | 'character' | 'charity';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
  timeLimit?: string;
}

const DailyIslamicChallenges = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'اقرأ سورة الفاتحة 10 مرات',
      description: 'اقرأ سورة الفاتحة مع التدبر والخشوع',
      category: 'worship',
      difficulty: 'easy',
      points: 50,
      completed: false,
      progress: 3,
      maxProgress: 10,
      timeLimit: 'اليوم'
    },
    {
      id: '2',
      title: 'تعلم 5 أسماء من أسماء الله الحسنى',
      description: 'احفظ وافهم معاني 5 أسماء من أسماء الله',
      category: 'knowledge',
      difficulty: 'medium',
      points: 100,
      completed: false,
      progress: 2,
      maxProgress: 5,
      timeLimit: 'اليوم'
    },
    {
      id: '3',
      title: 'ساعد شخصاً محتاجاً',
      description: 'قدم المساعدة لشخص محتاج في مجتمعك',
      category: 'character',
      difficulty: 'hard',
      points: 200,
      completed: false,
      progress: 0,
      maxProgress: 1,
      timeLimit: 'اليوم'
    },
    {
      id: '4',
      title: 'تصدق بأي مبلغ',
      description: 'تصدق ولو بالقليل في سبيل الله',
      category: 'charity',
      difficulty: 'easy',
      points: 75,
      completed: true,
      progress: 1,
      maxProgress: 1,
      timeLimit: 'اليوم'
    }
  ]);

  const [userStats, setUserStats] = useState({
    dailyPoints: 75,
    totalPoints: 1250,
    streak: 5,
    level: 3,
    rank: 'طالب علم'
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      worship: 'bg-green-100 text-green-800',
      knowledge: 'bg-blue-100 text-blue-800',
      character: 'bg-purple-100 text-purple-800',
      charity: 'bg-orange-100 text-orange-800'
    };
    return colors[category];
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      worship: <Star className="w-4 h-4" />,
      knowledge: <Target className="w-4 h-4" />,
      character: <Crown className="w-4 h-4" />,
      charity: <Gift className="w-4 h-4" />
    };
    return icons[category];
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'text-green-600',
      medium: 'text-yellow-600',
      hard: 'text-red-600'
    };
    return colors[difficulty];
  };

  const completeChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId && !challenge.completed) {
        const newProgress = challenge.maxProgress;
        setUserStats(prevStats => ({
          ...prevStats,
          dailyPoints: prevStats.dailyPoints + challenge.points,
          totalPoints: prevStats.totalPoints + challenge.points
        }));
        
        toast({
          title: '🎉 تم إنجاز التحدي!',
          description: `حصلت على ${challenge.points} نقطة. بارك الله فيك!`,
        });
        
        return { ...challenge, completed: true, progress: newProgress };
      }
      return challenge;
    }));
  };

  const updateProgress = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId && !challenge.completed) {
        const newProgress = Math.min(challenge.progress + 1, challenge.maxProgress);
        if (newProgress === challenge.maxProgress) {
          completeChallenge(challengeId);
        }
        return { ...challenge, progress: newProgress };
      }
      return challenge;
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          التحديات الإسلامية اليومية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-yellow-800">{userStats.dailyPoints}</div>
            <div className="text-xs text-yellow-600">نقاط اليوم</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Star className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-800">{userStats.totalPoints}</div>
            <div className="text-xs text-blue-600">إجمالي النقاط</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Flame className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-800">{userStats.streak}</div>
            <div className="text-xs text-orange-600">أيام متتالية</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Crown className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-sm font-bold text-purple-800">{userStats.rank}</div>
            <div className="text-xs text-purple-600">المستوى {userStats.level}</div>
          </div>
        </div>

        {/* Daily Challenges */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">تحديات اليوم</h3>
          {challenges.map((challenge) => (
            <div key={challenge.id} className={`p-4 border rounded-lg ${challenge.completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className={`font-semibold ${challenge.completed ? 'text-green-800' : 'text-gray-800'}`}>
                      {challenge.title}
                    </h4>
                    {challenge.completed && <Badge className="bg-green-500 text-white">مكتمل</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(challenge.category)}>
                      {getCategoryIcon(challenge.category)}
                      <span className="ml-1">
                        {challenge.category === 'worship' ? 'عبادة' : 
                         challenge.category === 'knowledge' ? 'علم' :
                         challenge.category === 'character' ? 'أخلاق' : 'صدقة'}
                      </span>
                    </Badge>
                    <span className={`text-sm font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty === 'easy' ? 'سهل' : 
                       challenge.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                    </span>
                    <span className="text-sm text-blue-600 font-semibold">{challenge.points} نقطة</span>
                  </div>
                </div>
                {!challenge.completed && (
                  <Button 
                    onClick={() => updateProgress(challenge.id)}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    تقدم
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>التقدم: {challenge.progress}/{challenge.maxProgress}</span>
                  <span>{Math.round((challenge.progress / challenge.maxProgress) * 100)}%</span>
                </div>
                <Progress 
                  value={(challenge.progress / challenge.maxProgress) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Islamic Motivation */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Star className="w-5 h-5" />
            تذكير إيماني
          </h4>
          <p className="text-sm text-blue-700">
            "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ"
          </p>
          <p className="text-xs text-blue-600 mt-1">سورة الطلاق - آية 2-3</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyIslamicChallenges;
