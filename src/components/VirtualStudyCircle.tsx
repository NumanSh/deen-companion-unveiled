
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Calendar, Clock, MessageSquare, BookOpen, Trophy, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudySession {
  id: number;
  title: string;
  topic: string;
  instructor: string;
  participants: number;
  maxParticipants: number;
  startTime: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'quran' | 'hadith' | 'fiqh' | 'seerah';
  isLive: boolean;
}

interface Participant {
  id: number;
  name: string;
  level: number;
  contributions: number;
  joined: string;
}

const VirtualStudyCircle = () => {
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'sessions' | 'community' | 'achievements'>('sessions');
  const [joinedSessions, setJoinedSessions] = useState<Set<number>>(new Set());
  
  const studySessions: StudySession[] = [
    {
      id: 1,
      title: "تفسير سورة البقرة",
      topic: "الآيات 1-20",
      instructor: "الشيخ أحمد محمد",
      participants: 45,
      maxParticipants: 50,
      startTime: "20:00",
      duration: 60,
      level: 'intermediate',
      type: 'quran',
      isLive: true
    },
    {
      id: 2,
      title: "أحاديث الأخلاق",
      topic: "بر الوالدين في السنة",
      instructor: "الأستاذة فاطمة علي",
      participants: 23,
      maxParticipants: 30,
      startTime: "21:30",
      duration: 45,
      level: 'beginner',
      type: 'hadith',
      isLive: false
    },
    {
      id: 3,
      title: "السيرة النبوية",
      topic: "غزوة بدر - دروس وعبر",
      instructor: "الدكتور محمد حسن",
      participants: 67,
      maxParticipants: 80,
      startTime: "19:00",
      duration: 90,
      level: 'advanced',
      type: 'seerah',
      isLive: false
    }
  ];

  const communityMembers: Participant[] = [
    { id: 1, name: "أحمد محمد", level: 15, contributions: 142, joined: "منذ شهرين" },
    { id: 2, name: "فاطمة أحمد", level: 12, contributions: 89, joined: "منذ شهر" },
    { id: 3, name: "محمد علي", level: 18, contributions: 203, joined: "منذ 3 أشهر" },
    { id: 4, name: "عائشة حسن", level: 9, contributions: 67, joined: "منذ أسبوعين" }
  ];

  const [userStats] = useState({
    sessionsAttended: 23,
    hoursLearned: 45,
    rank: 15,
    streakDays: 12,
    certificates: 3
  });

  const joinSession = (sessionId: number) => {
    setJoinedSessions(prev => new Set([...prev, sessionId]));
    const session = studySessions.find(s => s.id === sessionId);
    
    toast({
      title: '🎉 تم الانضمام بنجاح',
      description: `انضممت إلى جلسة "${session?.title}"`,
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quran': return 'bg-green-100 text-green-800';
      case 'hadith': return 'bg-blue-100 text-blue-800';
      case 'fiqh': return 'bg-purple-100 text-purple-800';
      case 'seerah': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'quran': return 'قرآن';
      case 'hadith': return 'حديث';
      case 'fiqh': return 'فقه';
      case 'seerah': return 'سيرة';
      default: return 'عام';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-500" />
          حلقة الدراسة الافتراضية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Stats */}
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-indigo-600">{userStats.sessionsAttended}</div>
              <div className="text-xs text-indigo-600">جلسة حضرت</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">{userStats.hoursLearned}</div>
              <div className="text-xs text-purple-600">ساعة تعلم</div>
            </div>
            <div>
              <div className="text-lg font-bold text-pink-600">#{userStats.rank}</div>
              <div className="text-xs text-pink-600">الترتيب</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{userStats.streakDays}</div>
              <div className="text-xs text-green-600">يوم متتالي</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">{userStats.certificates}</div>
              <div className="text-xs text-orange-600">شهادة</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          {[
            { key: 'sessions', label: 'الجلسات', icon: Calendar },
            { key: 'community', label: 'المجتمع', icon: Users },
            { key: 'achievements', label: 'الإنجازات', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                variant={activeTab === tab.key ? 'default' : 'ghost'}
                className="flex-1 gap-2"
                size="sm"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            {studySessions.map((session) => (
              <div key={session.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{session.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{session.topic}</p>
                    <p className="text-sm text-gray-500">المدرس: {session.instructor}</p>
                  </div>
                  {session.isLive && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      مباشر
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getTypeColor(session.type)}>
                    {getTypeLabel(session.type)}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getLevelColor(session.level)}`}></div>
                    {session.level === 'beginner' ? 'مبتدئ' : session.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.startTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.participants}/{session.maxParticipants}
                    </span>
                  </div>
                  <span>{session.duration} دقيقة</span>
                </div>

                <div className="flex gap-2">
                  {joinedSessions.has(session.id) ? (
                    <Button disabled className="bg-green-500 text-white">
                      منضم ✓
                    </Button>
                  ) : (
                    <Button
                      onClick={() => joinSession(session.id)}
                      disabled={session.participants >= session.maxParticipants}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      انضم للجلسة
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    التفاصيل
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-4">
            <h4 className="font-semibold">أعضاء نشطون</h4>
            {communityMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      {member.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.joined}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">المستوى {member.level}</span>
                  </div>
                  <div className="text-sm text-gray-600">{member.contributions} مساهمة</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">طالب مجتهد</span>
                </div>
                <p className="text-sm text-yellow-700">حضرت 20+ جلسة دراسية</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-blue-800">حافظ القرآن</span>
                </div>
                <p className="text-sm text-blue-700">أتممت حفظ 3 سور كاملة</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-800">عضو فعال</span>
                </div>
                <p className="text-sm text-green-700">شاركت في المناقشات 50+ مرة</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <span className="font-semibold text-purple-800">ملتزم بالوقت</span>
                </div>
                <p className="text-sm text-purple-700">حافظت على حضورك 12 يوم متتالي</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VirtualStudyCircle;
