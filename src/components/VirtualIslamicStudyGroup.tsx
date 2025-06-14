
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, BookOpen, Clock, Globe, Video, Mic, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudyGroupMember {
  id: string;
  name: string;
  avatar: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  timezone: string;
  isOnline: boolean;
  contributions: number;
}

interface StudySession {
  id: string;
  title: string;
  topic: string;
  type: 'quran' | 'hadith' | 'fiqh' | 'history' | 'arabic';
  host: string;
  participants: string[];
  scheduledTime: string;
  duration: number;
  isLive: boolean;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

interface Discussion {
  id: string;
  topic: string;
  question: string;
  asker: string;
  responses: number;
  lastActivity: string;
  isActive: boolean;
  tags: string[];
}

const VirtualIslamicStudyGroup = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'sessions' | 'discussions' | 'members'>('sessions');
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [members, setMembers] = useState<StudyGroupMember[]>([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    // Sample data
    const sampleSessions: StudySession[] = [
      {
        id: '1',
        title: 'Understanding Surah Al-Baqarah - Verses 1-20',
        topic: 'Quran Tafsir',
        type: 'quran',
        host: 'Sheikh Ahmad',
        participants: ['user1', 'user2', 'user3', 'user4'],
        scheduledTime: '2024-01-15T19:00:00Z',
        duration: 60,
        isLive: false,
        language: 'Arabic/English',
        difficulty: 'intermediate',
        description: 'Deep dive into the opening verses of Surah Al-Baqarah with focus on Arabic linguistics and classical tafsir.'
      },
      {
        id: '2',
        title: 'Hadith Study: 40 Nawawi - Hadith 1-5',
        topic: 'Hadith Analysis',
        type: 'hadith',
        host: 'Dr. Fatima',
        participants: ['user1', 'user5', 'user6'],
        scheduledTime: '2024-01-16T20:30:00Z',
        duration: 45,
        isLive: true,
        language: 'English',
        difficulty: 'beginner',
        description: 'Studying the first five hadiths from the famous 40 Hadith collection of Imam An-Nawawi.'
      },
      {
        id: '3',
        title: 'Islamic History: The Golden Age',
        topic: 'History',
        type: 'history',
        host: 'Prof. Ibrahim',
        participants: ['user2', 'user7', 'user8', 'user9'],
        scheduledTime: '2024-01-17T18:00:00Z',
        duration: 90,
        isLive: false,
        language: 'Arabic',
        difficulty: 'advanced',
        description: 'Exploring the Islamic Golden Age: achievements in science, philosophy, and civilization.'
      }
    ];

    const sampleDiscussions: Discussion[] = [
      {
        id: '1',
        topic: 'Prayer & Worship',
        question: 'What is the ruling on making up missed prayers from years ago?',
        asker: 'Ahmad_Student',
        responses: 12,
        lastActivity: '2 hours ago',
        isActive: true,
        tags: ['fiqh', 'prayer', 'qada']
      },
      {
        id: '2',
        topic: 'Quran Study',
        question: 'How to approach memorizing the Quran effectively?',
        asker: 'Memorizer123',
        responses: 8,
        lastActivity: '5 hours ago',
        isActive: true,
        tags: ['memorization', 'quran', 'tips']
      },
      {
        id: '3',
        topic: 'Islamic Finance',
        question: 'Understanding the principles of Islamic banking vs conventional banking',
        asker: 'BusinessStudent',
        responses: 15,
        lastActivity: '1 day ago',
        isActive: false,
        tags: ['finance', 'banking', 'halal']
      }
    ];

    const sampleMembers: StudyGroupMember[] = [
      {
        id: '1',
        name: 'Ahmad Al-Talib',
        avatar: '👨‍🎓',
        level: 'intermediate',
        timezone: 'GMT+3',
        isOnline: true,
        contributions: 45
      },
      {
        id: '2',
        name: 'Fatima Scholar',
        avatar: '👩‍🏫',
        level: 'advanced',
        timezone: 'GMT-5',
        isOnline: true,
        contributions: 78
      },
      {
        id: '3',
        name: 'Omar Learner',
        avatar: '👨‍💻',
        level: 'beginner',
        timezone: 'GMT+1',
        isOnline: false,
        contributions: 23
      },
      {
        id: '4',
        name: 'Aisha Student',
        avatar: '👩‍🎓',
        level: 'intermediate',
        timezone: 'GMT+8',
        isOnline: true,
        contributions: 56
      }
    ];

    setStudySessions(sampleSessions);
    setDiscussions(sampleDiscussions);
    setMembers(sampleMembers);
  }, []);

  const joinSession = (sessionId: string) => {
    const session = studySessions.find(s => s.id === sessionId);
    toast({
      title: 'انضمام للجلسة',
      description: `تم الانضمام لجلسة "${session?.title}"`,
    });
  };

  const startDiscussion = () => {
    if (newQuestion.trim()) {
      const newDiscussion: Discussion = {
        id: Date.now().toString(),
        topic: 'General',
        question: newQuestion,
        asker: 'أنت',
        responses: 0,
        lastActivity: 'الآن',
        isActive: true,
        tags: ['discussion']
      };
      setDiscussions(prev => [newDiscussion, ...prev]);
      setNewQuestion('');
      toast({
        title: 'تم إنشاء النقاش',
        description: 'تم نشر سؤالك للمجموعة',
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quran': return '📖';
      case 'hadith': return '📜';
      case 'fiqh': return '⚖️';
      case 'history': return '🏛️';
      case 'arabic': return '🔤';
      default: return '📚';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-500" />
          حلقة الدراسة الافتراضية
        </CardTitle>
        <p className="text-sm text-gray-600">ادرس العلوم الإسلامية مع مجتمع من المتعلمين حول العالم</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2">
          {[
            { key: 'sessions', label: 'الجلسات المباشرة', icon: Video },
            { key: 'discussions', label: 'النقاشات', icon: MessageSquare },
            { key: 'members', label: 'الأعضاء', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.key}
                size="sm"
                variant={activeTab === tab.key ? "default" : "outline"}
                onClick={() => setActiveTab(tab.key as any)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Study Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">الجلسات القادمة</h3>
              <Button size="sm">
                <BookOpen className="w-4 h-4 mr-1" />
                إنشاء جلسة
              </Button>
            </div>
            
            {studySessions.map(session => (
              <div key={session.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(session.type)}</span>
                    <div>
                      <h4 className="font-semibold">{session.title}</h4>
                      <p className="text-sm text-gray-600">بواسطة: {session.host}</p>
                    </div>
                  </div>
                  {session.isLive && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      🔴 مباشر الآن
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-3">{session.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">{session.topic}</Badge>
                  <Badge className={getDifficultyColor(session.difficulty)}>
                    {session.difficulty === 'beginner' ? 'مبتدئ' : 
                     session.difficulty === 'intermediate' ? 'متوسط' : 'متقدم'}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {session.duration} دقيقة
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {session.language}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{session.participants.length} مشارك</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{new Date(session.scheduledTime).toLocaleDateString('ar')}</span>
                  </div>
                  <div className="flex gap-2">
                    {session.isLive ? (
                      <Button size="sm" className="bg-red-500 hover:bg-red-600">
                        <Video className="w-4 h-4 mr-1" />
                        انضم الآن
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => joinSession(session.id)}>
                        احجز مكانك
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-4">
            {/* New Discussion */}
            <div className="border rounded-lg p-4 bg-blue-50">
              <h3 className="font-semibold mb-3">ابدأ نقاشاً جديداً</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="ما هو سؤالك أو موضوع النقاش؟"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={startDiscussion}>
                  <MessageSquare className="w-4 h-4 mr-1" />
                  نشر
                </Button>
              </div>
            </div>

            {/* Discussion List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">النقاشات النشطة</h3>
              {discussions.map(discussion => (
                <div key={discussion.id} className="border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        {discussion.topic}
                      </Badge>
                      <h4 className="font-medium mb-1">{discussion.question}</h4>
                      <p className="text-sm text-gray-500">
                        بواسطة: {discussion.asker} • {discussion.lastActivity}
                      </p>
                    </div>
                    {discussion.isActive && (
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {discussion.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>{discussion.responses} رد</span>
                    </div>
                    <Button size="sm" variant="outline">
                      شارك في النقاش
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">أعضاء المجموعة</h3>
              <Badge variant="outline">
                {members.length} عضو
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map(member => (
                <div key={member.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <span className="text-2xl">{member.avatar}</span>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.timezone}</p>
                    </div>
                    <Badge className={getDifficultyColor(member.level)}>
                      {member.level === 'beginner' ? 'مبتدئ' : 
                       member.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {member.contributions} مساهمة
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        رسالة
                      </Button>
                      <Button size="sm" variant="outline">
                        متابعة
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-indigo-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-600">{studySessions.length}</div>
            <div className="text-xs text-indigo-600">جلسة هذا الأسبوع</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{discussions.length}</div>
            <div className="text-xs text-purple-600">نقاش نشط</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">{members.length}</div>
            <div className="text-xs text-emerald-600">عضو متصل</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualIslamicStudyGroup;
