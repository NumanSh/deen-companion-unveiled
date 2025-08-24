
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { BookOpen, Brain, Star, Target, Clock, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface MemorizationSession {
  id: string;
  surahName: string;
  ayahRange: string;
  progress: number;
  totalAyahs: number;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed: string;
  memorized: boolean;
  reviewCount: number;
}

const QuranMemorizationTracker = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [sessions, setSessions] = useState<MemorizationSession[]>([
    {
      id: '1',
      surahName: 'سورة الفاتحة',
      ayahRange: 'الآيات 1-7',
      progress: 7,
      totalAyahs: 7,
      difficulty: 'easy',
      lastReviewed: new Date().toISOString(),
      memorized: true,
      reviewCount: 15
    },
    {
      id: '2',
      surahName: 'سورة البقرة',
      ayahRange: 'الآيات 1-10',
      progress: 6,
      totalAyahs: 10,
      difficulty: 'medium',
      lastReviewed: new Date(Date.now() - 86400000).toISOString(),
      memorized: false,
      reviewCount: 8
    },
    {
      id: '3',
      surahName: 'سورة آل عمران',
      ayahRange: 'الآيات 1-5',
      progress: 2,
      totalAyahs: 5,
      difficulty: 'hard',
      lastReviewed: new Date(Date.now() - 172800000).toISOString(),
      memorized: false,
      reviewCount: 3
    }
  ]);

  const [memorizationStats, setMemorizationStats] = useState({
    totalAyahsMemorized: 13,
    currentStreak: 12,
    averageAccuracy: 85,
    dailyGoal: 5,
    todayProgress: 3
  });

  const [newSession, setNewSession] = useState({
    surahName: '',
    ayahRange: '',
    totalAyahs: 1
  });

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty];
  };

  const addMemorizationProgress = (sessionId: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const newProgress = Math.min(session.progress + 1, session.totalAyahs);
        const isCompleted = newProgress === session.totalAyahs;
        
        if (isCompleted && !session.memorized) {
          toast({
            title: '🎉 تم حفظ المقطع!',
            description: `مبارك! تم حفظ ${session.ayahRange} من ${session.surahName}`,
          });
          
          setMemorizationStats(prev => ({
            ...prev,
            totalAyahsMemorized: prev.totalAyahsMemorized + 1,
            todayProgress: prev.todayProgress + 1
          }));
        }
        
        return {
          ...session,
          progress: newProgress,
          memorized: isCompleted,
          lastReviewed: new Date().toISOString(),
          reviewCount: session.reviewCount + 1
        };
      }
      return session;
    }));
  };

  const reviewSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          lastReviewed: new Date().toISOString(),
          reviewCount: session.reviewCount + 1
        };
      }
      return session;
    }));
    
    toast({
      title: '📖 تمت المراجعة',
      description: 'تم تسجيل جلسة مراجعة جديدة',
    });
  };

  const addNewSession = () => {
    if (newSession.surahName && newSession.ayahRange) {
      const newSessionObj: MemorizationSession = {
        id: Date.now().toString(),
        surahName: newSession.surahName,
        ayahRange: newSession.ayahRange,
        progress: 0,
        totalAyahs: newSession.totalAyahs,
        difficulty: 'medium',
        lastReviewed: new Date().toISOString(),
        memorized: false,
        reviewCount: 0
      };
      
      setSessions(prev => [...prev, newSessionObj]);
      setNewSession({ surahName: '', ayahRange: '', totalAyahs: 1 });
      
      toast({
        title: '✅ تم إضافة مقطع جديد',
        description: 'بدأ مشروع حفظ جديد بنجاح',
      });
    }
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          متتبع حفظ القرآن الكريم
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-800">{memorizationStats.totalAyahsMemorized}</div>
            <div className="text-xs text-green-600">آيات محفوظة</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Target className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-800">{memorizationStats.todayProgress}/{memorizationStats.dailyGoal}</div>
            <div className="text-xs text-blue-600">هدف اليوم</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Clock className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-800">{memorizationStats.currentStreak}</div>
            <div className="text-xs text-orange-600">أيام متتالية</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Award className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-purple-800">{memorizationStats.averageAccuracy}%</div>
            <div className="text-xs text-purple-600">متوسط الدقة</div>
          </div>
        </div>

        {/* Daily Goal Progress */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">هدف اليوم</h4>
          <div className="flex justify-between text-sm mb-2">
            <span>التقدم: {memorizationStats.todayProgress}/{memorizationStats.dailyGoal} آيات</span>
            <span>{Math.round((memorizationStats.todayProgress / memorizationStats.dailyGoal) * 100)}%</span>
          </div>
          <Progress value={(memorizationStats.todayProgress / memorizationStats.dailyGoal) * 100} className="h-3" />
        </div>

        {/* Active Sessions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">جلسات الحفظ النشطة</h3>
          {sessions.map((session) => (
            <div key={session.id} className={`p-4 border rounded-lg ${session.memorized ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{session.surahName}</h4>
                  <p className="text-sm text-gray-600 mb-2">{session.ayahRange}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getDifficultyColor(session.difficulty)}>
                      {session.difficulty === 'easy' ? 'سهل' : 
                       session.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                    </Badge>
                    {session.memorized && <Badge className="bg-green-500 text-white">مكتمل</Badge>}
                    <span className="text-xs text-gray-500">
                      آخر مراجعة: منذ {getDaysAgo(session.lastReviewed)} أيام
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => reviewSession(session.id)}
                    size="sm"
                    variant="outline"
                  >
                    مراجعة
                  </Button>
                  {!session.memorized && (
                    <Button 
                      onClick={() => addMemorizationProgress(session.id)}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      تقدم
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>التقدم: {session.progress}/{session.totalAyahs} آيات</span>
                  <span>{Math.round((session.progress / session.totalAyahs) * 100)}%</span>
                </div>
                <Progress value={(session.progress / session.totalAyahs) * 100} className="h-2" />
                <div className="text-xs text-gray-500">
                  عدد المراجعات: {session.reviewCount}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Session */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">إضافة مقطع جديد للحفظ</h4>
          <div className="grid gap-3">
            <Input
              placeholder="اسم السورة"
              value={newSession.surahName}
              onChange={(e) => setNewSession(prev => ({ ...prev, surahName: e.target.value }))}
            />
            <Input
              placeholder="نطاق الآيات (مثال: الآيات 1-5)"
              value={newSession.ayahRange}
              onChange={(e) => setNewSession(prev => ({ ...prev, ayahRange: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="عدد الآيات"
              value={newSession.totalAyahs}
              onChange={(e) => setNewSession(prev => ({ ...prev, totalAyahs: parseInt(e.target.value) || 1 }))}
            />
            <Button onClick={addNewSession} className="bg-blue-500 hover:bg-blue-600">
              إضافة مقطع جديد
            </Button>
          </div>
        </div>

        {/* Islamic Motivation */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
            <Star className="w-5 h-5" />
            فضل حفظ القرآن
          </h4>
          <p className="text-sm text-purple-700">
            قال رسول الله صلى الله عليه وسلم: "اقرؤوا القرآن فإنه يأتي يوم القيامة شفيعاً لأصحابه"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranMemorizationTracker;
