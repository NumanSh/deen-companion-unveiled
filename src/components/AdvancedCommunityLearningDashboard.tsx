
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  Target, 
  Trophy,
  TrendingUp,
  Brain,
  Star,
  Clock,
  Award,
  Zap,
  Calendar,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  GraduationCap,
  MessageCircle,
  Heart,
  Share
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  instructor: string;
  rating: number;
  enrolledCount: number;
}

interface StudySession {
  id: string;
  title: string;
  subject: string;
  participants: number;
  startTime: string;
  duration: number;
  type: 'live' | 'recorded' | 'interactive';
  instructor: string;
  level: string;
}

interface LearningAchievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface CommunityLearningStats {
  totalStudents: number;
  activeSessions: number;
  completedCourses: number;
  studyHours: number;
  averageRating: number;
  knowledgePoints: number;
}

const AdvancedCommunityLearningDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'paths' | 'sessions' | 'achievements'>('overview');
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [achievements, setAchievements] = useState<LearningAchievement[]>([]);
  const [stats, setStats] = useState<CommunityLearningStats>({
    totalStudents: 8750,
    activeSessions: 23,
    completedCourses: 1247,
    studyHours: 15680,
    averageRating: 4.7,
    knowledgePoints: 2340
  });

  useEffect(() => {
    // Load mock learning paths
    const mockPaths: LearningPath[] = [
      {
        id: '1',
        title: 'Foundations of Islamic Faith',
        description: 'Comprehensive introduction to the pillars of Islam and core beliefs',
        totalLessons: 24,
        completedLessons: 18,
        estimatedTime: '6 weeks',
        difficulty: 'beginner',
        category: 'Aqeedah',
        instructor: 'Dr. Aisha Rahman',
        rating: 4.9,
        enrolledCount: 2456
      },
      {
        id: '2',
        title: 'Advanced Quranic Tafsir',
        description: 'Deep dive into Quranic interpretation and classical commentaries',
        totalLessons: 36,
        completedLessons: 8,
        estimatedTime: '12 weeks',
        difficulty: 'advanced',
        category: 'Quran',
        instructor: 'Sheikh Omar Hassan',
        rating: 4.8,
        enrolledCount: 1134
      },
      {
        id: '3',
        title: 'Islamic History Timeline',
        description: 'Journey through the rich history of Islamic civilization',
        totalLessons: 18,
        completedLessons: 12,
        estimatedTime: '4 weeks',
        difficulty: 'intermediate',
        category: 'History',
        instructor: 'Dr. Fatima Al-Zahra',
        rating: 4.7,
        enrolledCount: 1876
      }
    ];

    const mockSessions: StudySession[] = [
      {
        id: '1',
        title: 'Tafsir Discussion Circle',
        subject: 'Surah Al-Baqarah Analysis',
        participants: 47,
        startTime: '2024-01-16T19:00:00Z',
        duration: 90,
        type: 'live',
        instructor: 'Dr. Aisha Rahman',
        level: 'Intermediate'
      },
      {
        id: '2',
        title: 'Hadith Study Group',
        subject: 'Sahih Bukhari Collection',
        participants: 32,
        startTime: '2024-01-16T20:30:00Z',
        duration: 60,
        type: 'interactive',
        instructor: 'Sheikh Omar Hassan',
        level: 'Advanced'
      },
      {
        id: '3',
        title: 'Beginner Arabic Class',
        subject: 'Quranic Arabic Basics',
        participants: 68,
        startTime: '2024-01-17T18:00:00Z',
        duration: 75,
        type: 'live',
        instructor: 'Sister Khadijah',
        level: 'Beginner'
      }
    ];

    const mockAchievements: LearningAchievement[] = [
      {
        id: '1',
        title: 'Knowledge Seeker',
        description: 'Completed your first learning path',
        icon: BookOpen,
        unlockedAt: '2024-01-10T00:00:00Z',
        rarity: 'common'
      },
      {
        id: '2',
        title: 'Tafsir Scholar',
        description: 'Mastered advanced Quranic interpretation',
        icon: GraduationCap,
        unlockedAt: '2024-01-12T00:00:00Z',
        rarity: 'rare'
      },
      {
        id: '3',
        title: 'Community Teacher',
        description: 'Helped 100+ students in study sessions',
        icon: Users,
        unlockedAt: '2024-01-14T00:00:00Z',
        rarity: 'epic'
      }
    ];

    setLearningPaths(mockPaths);
    setStudySessions(mockSessions);
    setAchievements(mockAchievements);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const joinSession = (sessionId: string) => {
    toast({
      title: 'Joining Study Session! 📚',
      description: 'You will be redirected to the virtual classroom.',
    });
  };

  const continuePath = (pathId: string) => {
    toast({
      title: 'Continuing Learning Path! 🎯',
      description: 'Your progress has been saved. Keep up the great work!',
    });
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Learning Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{stats.totalStudents.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Students</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Play className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{stats.activeSessions}</div>
            <div className="text-xs text-gray-600">Live Sessions</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{stats.completedCourses}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{stats.studyHours.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Study Hours</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{stats.averageRating}</div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{stats.knowledgePoints}</div>
            <div className="text-xs text-gray-600">Points</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Continue Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningPaths.slice(0, 2).map((path) => (
              <div key={path.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{path.title}</h3>
                  <Badge className={getDifficultyColor(path.difficulty)}>
                    {path.difficulty}
                  </Badge>
                </div>
                <Progress value={(path.completedLessons / path.totalLessons) * 100} className="h-2 mb-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {path.completedLessons}/{path.totalLessons} lessons
                  </span>
                  <Button size="sm" onClick={() => continuePath(path.id)}>
                    Continue
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {studySessions.slice(0, 2).map((session) => (
              <div key={session.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{session.title}</h3>
                  <Badge variant="outline">{session.type}</Badge>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {session.subject} • {session.participants} participants
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(session.startTime).toLocaleTimeString()}
                  </span>
                  <Button size="sm" onClick={() => joinSession(session.id)}>
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPathsTab = () => (
    <div className="space-y-4">
      {learningPaths.map((path) => (
        <Card key={path.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{path.title}</h3>
                  <Badge className={getDifficultyColor(path.difficulty)}>
                    {path.difficulty}
                  </Badge>
                  <Badge variant="outline">{path.category}</Badge>
                </div>
                <p className="text-gray-600 mb-3">{path.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {path.totalLessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {path.estimatedTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {path.enrolledCount} enrolled
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {path.rating}
                  </span>
                </div>
              </div>
              <Button onClick={() => continuePath(path.id)}>
                <ArrowRight className="w-4 h-4 ml-2" />
                Continue
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {path.completedLessons}/{path.totalLessons}</span>
                <span>{Math.round((path.completedLessons / path.totalLessons) * 100)}%</span>
              </div>
              <Progress value={(path.completedLessons / path.totalLessons) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSessionsTab = () => (
    <div className="space-y-4">
      {studySessions.map((session) => (
        <Card key={session.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{session.title}</h3>
                  <Badge variant="outline">{session.type}</Badge>
                  <Badge className="bg-blue-100 text-blue-800">{session.level}</Badge>
                </div>
                <p className="text-gray-600 mb-3">{session.subject}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {session.participants} participants
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.duration} minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {session.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(session.startTime).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Button onClick={() => joinSession(session.id)}>
                Join Session
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAchievementsTab = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <Card key={achievement.id} className={`border-2 ${getRarityColor(achievement.rarity)}`}>
          <CardContent className="p-6 text-center">
            <achievement.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">{achievement.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
            <Badge className={`capitalize ${getRarityColor(achievement.rarity)}`}>
              {achievement.rarity}
            </Badge>
            <div className="text-xs text-gray-500 mt-2">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Community Learning Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your Islamic learning journey and connect with fellow students
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {([
            { id: 'overview', label: 'Overview', icon: Target },
            { id: 'paths', label: 'Learning Paths', icon: BookOpen },
            { id: 'sessions', label: 'Study Sessions', icon: Users },
            { id: 'achievements', label: 'Achievements', icon: Trophy }
          ] as const).map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 rounded-md"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'paths' && renderPathsTab()}
      {activeTab === 'sessions' && renderSessionsTab()}
      {activeTab === 'achievements' && renderAchievementsTab()}
    </div>
  );
};

export default AdvancedCommunityLearningDashboard;
