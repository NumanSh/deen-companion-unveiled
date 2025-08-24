
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Calendar, 
  Target, 
  TrendingUp, 
  Award,
  Clock,
  BarChart3,
  Flame
} from 'lucide-react';

interface ReadingSession {
  date: string;
  surahs: number[];
  duration: number;
  versesRead: number;
}

interface ReadingStats {
  totalSurahs: number;
  totalVerses: number;
  currentStreak: number;
  longestStreak: number;
  totalReadingTime: number;
  averageDaily: number;
}

const ReadingProgressVisualization = () => {
  const [readingStats, setReadingStats] = useState<ReadingStats>({
    totalSurahs: 15,
    totalVerses: 342,
    currentStreak: 7,
    longestStreak: 21,
    totalReadingTime: 1250, // minutes
    averageDaily: 25
  });

  const [recentSessions, setRecentSessions] = useState<ReadingSession[]>([
    {
      date: '2024-01-15',
      surahs: [1, 2, 36],
      duration: 45,
      versesRead: 28
    },
    {
      date: '2024-01-14',
      surahs: [18, 55],
      duration: 32,
      versesRead: 22
    },
    {
      date: '2024-01-13',
      surahs: [67, 68, 69],
      duration: 38,
      versesRead: 35
    }
  ]);

  const quranProgress = (readingStats.totalSurahs / 114) * 100;
  const monthlyGoal = 30; // days
  const daysThisMonth = new Date().getDate();
  const readingDays = Math.min(readingStats.currentStreak, daysThisMonth);

  const achievements = [
    { 
      id: 1, 
      title: 'أسبوع من القراءة', 
      description: '7 أيام متتالية', 
      earned: readingStats.currentStreak >= 7,
      icon: Flame
    },
    { 
      id: 2, 
      title: 'ربع القرآن', 
      description: '25% من السور', 
      earned: readingStats.totalSurahs >= 29,
      icon: BookOpen
    },
    { 
      id: 3, 
      title: 'قارئ مجتهد', 
      description: '500 آية', 
      earned: readingStats.totalVerses >= 500,
      icon: Award
    }
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}س ${mins}د`;
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm opacity-90">السور المكتملة</span>
            </div>
            <div className="text-2xl font-bold">{readingStats.totalSurahs}</div>
            <div className="text-xs opacity-75">من أصل 114</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5" />
              <span className="text-sm opacity-90">الأيام المتتالية</span>
            </div>
            <div className="text-2xl font-bold">{readingStats.currentStreak}</div>
            <div className="text-xs opacity-75">أطول فترة: {readingStats.longestStreak}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm opacity-90">وقت القراءة</span>
            </div>
            <div className="text-2xl font-bold">{formatTime(readingStats.totalReadingTime)}</div>
            <div className="text-xs opacity-75">هذا الشهر</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm opacity-90">متوسط يومي</span>
            </div>
            <div className="text-2xl font-bold">{readingStats.averageDaily}</div>
            <div className="text-xs opacity-75">دقيقة</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quran Completion Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              تقدم ختم القرآن
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>السور المكتملة</span>
                  <span>{readingStats.totalSurahs}/114</span>
                </div>
                <Progress value={quranProgress} className="h-3" />
                <div className="text-xs text-gray-500 mt-1">
                  {quranProgress.toFixed(1)}% مكتمل
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-emerald-50 rounded">
                  <div className="text-lg font-bold text-emerald-600">29</div>
                  <div className="text-xs text-gray-600">الجزء الأول</div>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">56</div>
                  <div className="text-xs text-gray-600">الجزء الثاني</div>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="text-lg font-bold text-purple-600">29</div>
                  <div className="text-xs text-gray-600">الجزء الثالث</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Reading Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              هدف الشهر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>أيام القراءة</span>
                  <span>{readingDays}/{monthlyGoal}</span>
                </div>
                <Progress value={(readingDays / monthlyGoal) * 100} className="h-3" />
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((readingDays / monthlyGoal) * 100)}% من الهدف
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-blue-800">ممتاز!</div>
                  <div className="text-sm text-blue-600">تقدم مستمر</div>
                </div>
                <Award className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            الإنجازات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'border-amber-300 bg-amber-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${
                      achievement.earned ? 'bg-amber-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        achievement.earned ? 'text-amber-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <div className={`font-semibold ${
                        achievement.earned ? 'text-amber-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                  {achievement.earned && (
                    <Badge className="bg-amber-100 text-amber-800 text-xs">
                      مكتمل ✓
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            جلسات القراءة الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">
                    {new Date(session.date).toLocaleDateString('ar-SA')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {session.surahs.length} سور • {session.versesRead} آية
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{session.duration} دقيقة</div>
                  <div className="text-xs text-gray-500">
                    السور: {session.surahs.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingProgressVisualization;
