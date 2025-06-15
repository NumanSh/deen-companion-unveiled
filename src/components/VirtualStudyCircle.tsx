
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { 
  Users, 
  BookOpen, 
  Clock,
  Star,
  Calendar,
  Heart,
  Play,
  User,
  Globe,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudyCircle {
  id: string;
  title: string;
  description: string;
  topic: string;
  instructor: string;
  participants: number;
  maxParticipants: number;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  rating: number;
  nextSession: Date;
  isLive: boolean;
  category: 'quran' | 'hadith' | 'fiqh' | 'arabic' | 'general';
}

interface StudySession {
  id: string;
  title: string;
  time: string;
  duration: number;
  participants: number;
  topic: string;
  isJoined: boolean;
}

const VirtualStudyCircle = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'browse' | 'joined' | 'schedule'>('browse');

  const studyCircles: StudyCircle[] = [
    {
      id: '1',
      title: 'Tafsir Study Group',
      description: 'Weekly deep dive into Quranic interpretation with scholarly guidance',
      topic: 'Tafsir Al-Tabari',
      instructor: 'Sheikh Ahmad Hassan',
      participants: 24,
      maxParticipants: 30,
      duration: 90,
      level: 'intermediate',
      language: 'Arabic/English',
      rating: 4.8,
      nextSession: new Date(Date.now() + 86400000),
      isLive: false,
      category: 'quran'
    },
    {
      id: '2',
      title: 'Hadith Sciences Workshop',
      description: 'Learn the methodology of hadith authentication and classification',
      topic: 'Hadith Authentication',
      instructor: 'Dr. Fatima Al-Zahra',
      participants: 18,
      maxParticipants: 25,
      duration: 60,
      level: 'advanced',
      language: 'English',
      rating: 4.9,
      nextSession: new Date(Date.now() + 172800000),
      isLive: true,
      category: 'hadith'
    },
    {
      id: '3',
      title: 'Arabic Grammar Circle',
      description: 'Master Quranic Arabic through interactive lessons and practice',
      topic: 'Nahw & Sarf',
      instructor: 'Ustadh Muhammad Ali',
      participants: 32,
      maxParticipants: 40,
      duration: 75,
      level: 'beginner',
      language: 'Arabic',
      rating: 4.7,
      nextSession: new Date(Date.now() + 259200000),
      isLive: false,
      category: 'arabic'
    },
    {
      id: '4',
      title: 'Fiqh Q&A Session',
      description: 'Interactive session addressing contemporary Islamic jurisprudence questions',
      topic: 'Contemporary Fiqh',
      instructor: 'Sheikh Omar Ibn Malik',
      participants: 45,
      maxParticipants: 50,
      duration: 120,
      level: 'intermediate',
      language: 'English',
      rating: 4.6,
      nextSession: new Date(Date.now() + 345600000),
      isLive: false,
      category: 'fiqh'
    }
  ];

  const upcomingSessions: StudySession[] = [
    {
      id: '1',
      title: 'Tafsir Study Group',
      time: '8:00 PM',
      duration: 90,
      participants: 24,
      topic: 'Surah Al-Baqarah Verses 1-10',
      isJoined: true
    },
    {
      id: '2',
      title: 'Arabic Grammar Circle',
      time: '7:00 PM',
      duration: 75,
      participants: 32,
      topic: 'Verb Conjugations in Quran',
      isJoined: true
    },
    {
      id: '3',
      title: 'Hadith Sciences Workshop',
      time: '9:30 PM',
      duration: 60,
      participants: 18,
      topic: 'Chain of Narration Analysis',
      isJoined: false
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'quran': return BookOpen;
      case 'hadith': return Star;
      case 'fiqh': return Award;
      case 'arabic': return Globe;
      default: return BookOpen;
    }
  };

  const handleJoinCircle = (circle: StudyCircle) => {
    toast({
      title: `Joined ${circle.title}`,
      description: `You'll receive notifications for upcoming sessions`,
      duration: 3000,
    });
  };

  const handleJoinSession = (session: StudySession) => {
    toast({
      title: 'Joining Session',
      description: `Connecting you to ${session.title}...`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Virtual Study Circles</h1>
                <p className="text-teal-200">Connect, Learn, and Grow Together in Islamic Knowledge</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-teal-200">Active Learners</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {[
          { id: 'browse', label: 'Browse Circles', icon: Users },
          { id: 'joined', label: 'My Circles', icon: Heart },
          { id: 'schedule', label: 'Schedule', icon: Calendar }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Browse Circles */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Study Circles</h2>
          {studyCircles.map((circle) => {
            const CategoryIcon = getCategoryIcon(circle.category);
            return (
              <Card key={circle.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-teal-100 rounded-full">
                        <CategoryIcon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{circle.title}</h3>
                          {circle.isLive && (
                            <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                          )}
                          <Badge className={getLevelColor(circle.level)}>
                            {circle.level}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{circle.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Instructor:</span>
                            <div className="font-medium">{circle.instructor}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Topic:</span>
                            <div className="font-medium">{circle.topic}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <div className="font-medium">{circle.duration} min</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Language:</span>
                            <div className="font-medium">{circle.language}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{circle.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {circle.participants}/{circle.maxParticipants} members
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Next: {circle.nextSession.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{circle.participants} joined</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button onClick={() => handleJoinCircle(circle)} className="bg-teal-600 hover:bg-teal-700">
                        <Users className="w-4 h-4 mr-2" />
                        Join Circle
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* My Circles */}
      {activeTab === 'joined' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Study Circles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyCircles.slice(0, 2).map((circle) => {
              const CategoryIcon = getCategoryIcon(circle.category);
              return (
                <Card key={circle.id} className="border-teal-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CategoryIcon className="w-5 h-5 text-teal-600" />
                      <h3 className="font-semibold">{circle.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{circle.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div>Next session:</div>
                        <div className="font-medium">{circle.nextSession.toLocaleDateString()}</div>
                      </div>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        <Play className="w-4 h-4 mr-2" />
                        Enter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Schedule */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Today's Schedule</h2>
          {upcomingSessions.map((session) => (
            <Card key={session.id} className={`${
              session.isJoined ? 'border-green-200 bg-green-50' : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{session.time}</div>
                      <div className="text-sm text-gray-500">{session.duration}min</div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{session.title}</h3>
                      <p className="text-sm text-gray-600">{session.topic}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{session.participants} participants</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.isJoined && (
                      <Badge className="bg-green-100 text-green-800">Joined</Badge>
                    )}
                    <Button
                      onClick={() => handleJoinSession(session)}
                      className={session.isJoined ? 'bg-green-600 hover:bg-green-700' : 'bg-teal-600 hover:bg-teal-700'}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {session.isJoined ? 'Enter' : 'Join'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VirtualStudyCircle;
