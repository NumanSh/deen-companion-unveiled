
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Star, 
  MessageCircle, 
  Calendar,
  BookOpen,
  Trophy,
  Heart,
  CheckCircle,
  Clock,
  UserPlus,
  Search,
  Filter,
  Video,
  Send,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  totalMentees: number;
  activeMentees: number;
  yearsExperience: number;
  specialization: string;
  availability: 'available' | 'limited' | 'full';
  bio: string;
  languages: string[];
}

interface MentorshipRequest {
  id: string;
  menteeId: string;
  menteeName: string;
  subject: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  timestamp: string;
  status: 'pending' | 'matched' | 'completed';
}

interface MentorshipSession {
  id: string;
  mentorName: string;
  topic: string;
  scheduledTime: string;
  duration: number;
  type: 'video' | 'text' | 'voice';
  status: 'scheduled' | 'ongoing' | 'completed';
}

const CommunityMentorshipSystem: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'find-mentor' | 'my-mentorship' | 'be-mentor'>('find-mentor');
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<MentorshipSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load mock mentors data
    const mockMentors: Mentor[] = [
      {
        id: '1',
        name: 'Dr. Aisha Rahman',
        expertise: ['Quran', 'Tafsir', 'Arabic Language'],
        rating: 4.9,
        totalMentees: 47,
        activeMentees: 12,
        yearsExperience: 15,
        specialization: 'Quranic Studies',
        availability: 'available',
        bio: 'PhD in Islamic Studies with specialization in Quranic exegesis. Passionate about helping students connect with the Quran.',
        languages: ['English', 'Arabic', 'Urdu']
      },
      {
        id: '2',
        name: 'Sheikh Omar Hassan',
        expertise: ['Hadith', 'Fiqh', 'Islamic History'],
        rating: 4.8,
        totalMentees: 63,
        activeMentees: 8,
        yearsExperience: 22,
        specialization: 'Islamic Jurisprudence',
        availability: 'limited',
        bio: 'Traditional Islamic scholar with extensive knowledge in hadith sciences and Islamic law.',
        languages: ['English', 'Arabic']
      },
      {
        id: '3',
        name: 'Sister Fatima Al-Zahra',
        expertise: ['Spiritual Development', 'Islamic Psychology', 'Women\'s Issues'],
        rating: 4.9,
        totalMentees: 35,
        activeMentees: 15,
        yearsExperience: 10,
        specialization: 'Spiritual Counseling',
        availability: 'available',
        bio: 'Licensed counselor specializing in Islamic approaches to mental health and spiritual growth.',
        languages: ['English', 'French', 'Arabic']
      }
    ];

    const mockRequests: MentorshipRequest[] = [
      {
        id: '1',
        menteeId: 'user1',
        menteeName: 'Ahmad',
        subject: 'Quran Memorization Techniques',
        description: 'I need guidance on effective memorization methods for the Quran.',
        urgency: 'medium',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'pending'
      },
      {
        id: '2',
        menteeId: 'user2',
        menteeName: 'Khadijah',
        subject: 'Understanding Islamic Finance',
        description: 'Looking for help understanding halal investment options.',
        urgency: 'low',
        timestamp: '2024-01-14T15:45:00Z',
        status: 'matched'
      }
    ];

    const mockSessions: MentorshipSession[] = [
      {
        id: '1',
        mentorName: 'Dr. Aisha Rahman',
        topic: 'Tafsir of Surah Al-Baqarah',
        scheduledTime: '2024-01-16T19:00:00Z',
        duration: 60,
        type: 'video',
        status: 'scheduled'
      },
      {
        id: '2',
        mentorName: 'Sister Fatima Al-Zahra',
        topic: 'Building Spiritual Habits',
        scheduledTime: '2024-01-17T20:30:00Z',
        duration: 45,
        type: 'text',
        status: 'scheduled'
      }
    ];

    setMentors(mockMentors);
    setMentorshipRequests(mockRequests);
    setUpcomingSessions(mockSessions);
  }, []);

  const requestMentorship = (mentor: Mentor) => {
    toast({
      title: 'Mentorship Request Sent! 🤝',
      description: `Your request has been sent to ${mentor.name}. They will respond within 24 hours.`,
    });
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'limited': return 'bg-yellow-100 text-yellow-800';
      case 'full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderFindMentorTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors by expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.specialization}</p>
                  </div>
                </div>
                <Badge className={getAvailabilityColor(mentor.availability)}>
                  {mentor.availability}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{mentor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>{mentor.totalMentees} mentees</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-orange-500" />
                  <span>{mentor.yearsExperience}y exp</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3">{mentor.bio}</p>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{mentor.expertise.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {mentor.languages.map((lang, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => requestMentorship(mentor)}
                  disabled={mentor.availability === 'full'}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Request Mentorship
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMyMentorshipTab = () => (
    <div className="space-y-6">
      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {session.type === 'video' && <Video className="w-6 h-6 text-blue-600" />}
                    {session.type === 'text' && <MessageCircle className="w-6 h-6 text-blue-600" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{session.topic}</h3>
                    <p className="text-sm text-gray-600">with {session.mentorName}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>{new Date(session.scheduledTime).toLocaleDateString()}</span>
                      <span>{new Date(session.scheduledTime).toLocaleTimeString()}</span>
                      <span>{session.duration} minutes</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button size="sm">
                    Join Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Mentorship Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mentorshipRequests.map((request) => (
              <div key={request.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{request.subject}</h3>
                    <p className="text-sm text-gray-600">{request.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {request.urgency}
                    </Badge>
                    <Badge variant={request.status === 'matched' ? 'default' : 'secondary'}>
                      {request.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Submitted {new Date(request.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBeMentorTab = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600" />
            Become a Community Mentor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Share your Islamic knowledge and help fellow Muslims grow in their faith journey. 
            As a mentor, you'll guide others in their studies and spiritual development.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Share Knowledge</h3>
              <p className="text-sm text-gray-600">Help others learn Quran, Hadith, and Islamic principles</p>
            </div>
            
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Build Community</h3>
              <p className="text-sm text-gray-600">Connect with Muslims worldwide and strengthen bonds</p>
            </div>
            
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Earn Rewards</h3>
              <p className="text-sm text-gray-600">Gain spiritual rewards for helping others learn</p>
            </div>
          </div>

          <Button className="w-full md:w-auto">
            Apply to Become a Mentor
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mentor Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Strong foundation in Islamic knowledge</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Commitment to help others learn and grow</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Good communication skills</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Patience and understanding</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Available for regular mentoring sessions</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Community Mentorship System</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with experienced mentors or share your knowledge as a mentor
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <Button
            variant={activeTab === 'find-mentor' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('find-mentor')}
            className="rounded-md"
          >
            Find Mentor
          </Button>
          <Button
            variant={activeTab === 'my-mentorship' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('my-mentorship')}
            className="rounded-md"
          >
            My Mentorship
          </Button>
          <Button
            variant={activeTab === 'be-mentor' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('be-mentor')}
            className="rounded-md"
          >
            Be a Mentor
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'find-mentor' && renderFindMentorTab()}
      {activeTab === 'my-mentorship' && renderMyMentorshipTab()}
      {activeTab === 'be-mentor' && renderBeMentorTab()}
    </div>
  );
};

export default CommunityMentorshipSystem;
