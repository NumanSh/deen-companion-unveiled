
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  Share2, 
  ThumbsUp,
  BookOpen,
  Star,
  TrendingUp,
  Award,
  Clock,
  Calendar,
  Target,
  Lightbulb,
  Zap,
  Heart,
  Eye,
  PlusCircle,
  Filter,
  Search,
  Bell,
  Gift
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  topic: string;
  meetingTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  isJoined: boolean;
  nextSession: string;
  instructor: string;
  rating: number;
}

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    level: string;
    verified: boolean;
  };
  content: string;
  type: 'question' | 'insight' | 'achievement' | 'resource';
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
  attachments?: {
    type: 'image' | 'document' | 'link';
    title: string;
    url: string;
  }[];
}

interface LearningChallenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  difficulty: string;
  participants: number;
  reward: string;
  progress: number;
  timeRemaining: string;
  isParticipating: boolean;
}

interface KnowledgeLeaderboard {
  id: string;
  user: {
    name: string;
    avatar?: string;
    country: string;
  };
  rank: number;
  points: number;
  streak: number;
  specialization: string;
}

const EnhancedCommunityLearningFeatures: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'groups' | 'feed' | 'challenges' | 'leaderboard'>('groups');
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [learningChallenges, setLearningChallenges] = useState<LearningChallenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<KnowledgeLeaderboard[]>([]);

  useEffect(() => {
    loadStudyGroups();
    loadCommunityPosts();
    loadLearningChallenges();
    loadLeaderboard();
  }, []);

  const loadStudyGroups = () => {
    const mockGroups: StudyGroup[] = [
      {
        id: '1',
        name: 'Tafsir Study Circle',
        description: 'Weekly deep dive into Quranic interpretation and commentary',
        members: 24,
        maxMembers: 30,
        topic: 'Quran & Tafsir',
        meetingTime: 'Fridays 7:00 PM UTC',
        difficulty: 'intermediate',
        language: 'English',
        isJoined: true,
        nextSession: '2024-01-19T19:00:00Z',
        instructor: 'Dr. Aisha Rahman',
        rating: 4.8
      },
      {
        id: '2',
        name: 'Arabic for Beginners',
        description: 'Learn Quranic Arabic from scratch with interactive sessions',
        members: 45,
        maxMembers: 50,
        topic: 'Arabic Language',
        meetingTime: 'Tuesdays & Thursdays 6:00 PM UTC',
        difficulty: 'beginner',
        language: 'English',
        isJoined: false,
        nextSession: '2024-01-16T18:00:00Z',
        instructor: 'Sheikh Omar Hassan',
        rating: 4.9
      },
      {
        id: '3',
        name: 'Hadith Sciences Workshop',
        description: 'Advanced study of hadith methodology and authentication',
        members: 18,
        maxMembers: 25,
        topic: 'Hadith Sciences',
        meetingTime: 'Sundays 8:00 PM UTC',
        difficulty: 'advanced',
        language: 'Arabic',
        isJoined: false,
        nextSession: '2024-01-21T20:00:00Z',
        instructor: 'Dr. Mohamed Al-Azhari',
        rating: 4.7
      }
    ];
    setStudyGroups(mockGroups);
  };

  const loadCommunityPosts = () => {
    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        author: {
          name: 'Sarah Ahmed',
          level: 'Scholar',
          verified: true
        },
        content: 'Just completed the 30-day Quran recitation challenge! The journey has been transformative. Here are 5 key insights I gained...',
        type: 'achievement',
        timestamp: '2024-01-15T14:30:00Z',
        likes: 127,
        comments: 23,
        isLiked: false,
        tags: ['quran', 'challenge', 'reflection'],
        attachments: [
          {
            type: 'image',
            title: 'Completion Certificate',
            url: '/certificates/quran-30day.jpg'
          }
        ]
      },
      {
        id: '2',
        author: {
          name: 'Ahmad Hassan',
          level: 'Student',
          verified: false
        },
        content: 'Can someone explain the difference between Makki and Madani surahs? I\'m studying the historical context and would love some clarity.',
        type: 'question',
        timestamp: '2024-01-15T12:15:00Z',
        likes: 34,
        comments: 18,
        isLiked: true,
        tags: ['quran', 'history', 'question']
      },
      {
        id: '3',
        author: {
          name: 'Dr. Fatima Al-Zahra',
          level: 'Expert',
          verified: true
        },
        content: 'Beautiful reminder: The Prophet (PBUH) said "The best of people are those who benefit others." Let\'s apply this in our learning journey.',
        type: 'insight',
        timestamp: '2024-01-15T10:45:00Z',
        likes: 89,
        comments: 12,
        isLiked: true,
        tags: ['hadith', 'reminder', 'community']
      }
    ];
    setCommunityPosts(mockPosts);
  };

  const loadLearningChallenges = () => {
    const mockChallenges: LearningChallenge[] = [
      {
        id: '1',
        title: 'Read 5 Surahs Daily',
        description: 'Complete 5 different surahs each day for a week',
        type: 'weekly',
        difficulty: 'Intermediate',
        participants: 2847,
        reward: 'Golden Badge + 500 Points',
        progress: 65,
        timeRemaining: '3 days',
        isParticipating: true
      },
      {
        id: '2',
        title: 'Learn 99 Names of Allah',
        description: 'Memorize and understand the meanings of Asma ul Husna',
        type: 'monthly',
        difficulty: 'Beginner',
        participants: 1456,
        reward: 'Scholar Certificate + 1000 Points',
        progress: 23,
        timeRemaining: '18 days',
        isParticipating: false
      },
      {
        id: '3',
        title: 'Daily Hadith Reflection',
        description: 'Read and reflect on one hadith every day',
        type: 'daily',
        difficulty: 'Easy',
        participants: 5692,
        reward: 'Wisdom Badge + 100 Points',
        progress: 100,
        timeRemaining: 'Completed',
        isParticipating: true
      }
    ];
    setLearningChallenges(mockChallenges);
  };

  const loadLeaderboard = () => {
    const mockLeaderboard: KnowledgeLeaderboard[] = [
      {
        id: '1',
        user: {
          name: 'Amir Khan',
          country: 'Pakistan'
        },
        rank: 1,
        points: 15420,
        streak: 87,
        specialization: 'Quran Studies'
      },
      {
        id: '2',
        user: {
          name: 'Khadijah Smith',
          country: 'USA'
        },
        rank: 2,
        points: 14890,
        streak: 72,
        specialization: 'Hadith Sciences'
      },
      {
        id: '3',
        user: {
          name: 'Omar Al-Rashid',
          country: 'UAE'
        },
        rank: 3,
        points: 13654,
        streak: 65,
        specialization: 'Islamic History'
      },
      {
        id: '4',
        user: {
          name: 'Fatima Zahra',
          country: 'Morocco'
        },
        rank: 4,
        points: 12987,
        streak: 58,
        specialization: 'Fiqh Studies'
      },
      {
        id: '5',
        user: {
          name: 'Abdullah Rahman',
          country: 'Indonesia'
        },
        rank: 5,
        points: 11543,
        streak: 45,
        specialization: 'Arabic Language'
      }
    ];
    setLeaderboard(mockLeaderboard);
  };

  const joinStudyGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: true, members: group.members + 1 }
        : group
    ));
    
    const group = studyGroups.find(g => g.id === groupId);
    toast({
      title: 'Joined Study Group! 📚',
      description: `Welcome to ${group?.name}`,
    });
  };

  const joinChallenge = (challengeId: string) => {
    setLearningChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isParticipating: true, participants: challenge.participants + 1 }
        : challenge
    ));
    
    const challenge = learningChallenges.find(c => c.id === challengeId);
    toast({
      title: 'Challenge Accepted! 🎯',
      description: `You've joined "${challenge?.title}"`,
    });
  };

  const likePost = (postId: string) => {
    setCommunityPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': case 'easy': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return MessageCircle;
      case 'insight': return Lightbulb;
      case 'achievement': return Award;
      case 'resource': return BookOpen;
      default: return MessageCircle;
    }
  };

  const renderGroupsTab = () => (
    <div className="space-y-4">
      {studyGroups.map((group) => (
        <Card key={group.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{group.name}</h3>
                  <Badge className={getDifficultyColor(group.difficulty)}>
                    {group.difficulty}
                  </Badge>
                  <Badge variant="outline">{group.language}</Badge>
                </div>
                <p className="text-gray-600 mb-3">{group.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {group.members}/{group.maxMembers} members
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {group.meetingTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {group.rating}
                  </span>
                </div>
              </div>
              {group.isJoined ? (
                <Badge className="bg-green-100 text-green-800">Joined</Badge>
              ) : (
                <Button onClick={() => joinStudyGroup(group.id)}>
                  Join Group
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>Next session: {new Date(group.nextSession).toLocaleDateString()}</span>
              <span>Instructor: {group.instructor}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFeedTab = () => (
    <div className="space-y-4">
      {communityPosts.map((post) => {
        const PostIcon = getPostTypeIcon(post.type);
        return (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Avatar>
                  <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{post.author.name}</h4>
                    {post.author.verified && (
                      <Star className="w-4 h-4 text-blue-500 fill-current" />
                    )}
                    <Badge variant="outline" className="text-xs">{post.author.level}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <PostIcon className="w-3 h-3" />
                    <span className="capitalize">{post.type}</span>
                    <span>•</span>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => likePost(post.id)}
                    className={`flex items-center gap-1 ${post.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderChallengesTab = () => (
    <div className="space-y-4">
      {learningChallenges.map((challenge) => (
        <Card key={challenge.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{challenge.title}</h3>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="outline" className="capitalize">{challenge.type}</Badge>
                </div>
                <p className="text-gray-600 mb-3">{challenge.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {challenge.participants.toLocaleString()} participants
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {challenge.timeRemaining}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    {challenge.reward}
                  </span>
                </div>
              </div>
              {challenge.isParticipating ? (
                <Badge className="bg-blue-100 text-blue-800">Participating</Badge>
              ) : challenge.timeRemaining === 'Completed' ? (
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              ) : (
                <Button onClick={() => joinChallenge(challenge.id)}>
                  Join Challenge
                </Button>
              )}
            </div>
            
            {challenge.isParticipating && challenge.timeRemaining !== 'Completed' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderLeaderboardTab = () => (
    <div className="space-y-4">
      {leaderboard.map((entry) => (
        <Card key={entry.id} className={entry.rank <= 3 ? 'border-yellow-200 bg-yellow-50/50' : ''}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  entry.rank === 1 ? 'bg-yellow-500 text-white' :
                  entry.rank === 2 ? 'bg-gray-400 text-white' :
                  entry.rank === 3 ? 'bg-orange-500 text-white' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {entry.rank}
                </div>
                <Avatar>
                  <AvatarFallback>{entry.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{entry.user.name}</div>
                  <div className="text-sm text-gray-600">{entry.user.country} • {entry.specialization}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{entry.points.toLocaleString()}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {entry.streak} day streak
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Community Learning Hub</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect, learn, and grow together with fellow Muslims worldwide
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {([
            { id: 'groups', label: 'Study Groups', icon: Users },
            { id: 'feed', label: 'Community Feed', icon: MessageCircle },
            { id: 'challenges', label: 'Challenges', icon: Target },
            { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp }
          ] as const).map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'groups' && renderGroupsTab()}
      {activeTab === 'feed' && renderFeedTab()}
      {activeTab === 'challenges' && renderChallengesTab()}
      {activeTab === 'leaderboard' && renderLeaderboardTab()}
    </div>
  );
};

export default EnhancedCommunityLearningFeatures;
