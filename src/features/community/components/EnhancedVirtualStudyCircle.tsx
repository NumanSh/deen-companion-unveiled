import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  BookOpen, 
  MessageCircle, 
  Share2, 
  Calendar,
  Clock,
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Hand,
  Settings,
  Star,
  Bookmark,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudySession {
  id: string;
  title: string;
  topic: string;
  facilitator: string;
  participants: number;
  maxParticipants: number;
  startTime: string;
  duration: number;
  isLive: boolean;
  category: 'quran' | 'hadith' | 'fiqh' | 'seerah' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  isQuestion: boolean;
}

const EnhancedVirtualStudyCircle: React.FC = () => {
  const { toast } = useToast();
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  useEffect(() => {
    // Load mock study sessions
    const mockSessions: StudySession[] = [
      {
        id: '1',
        title: 'Tafsir of Surah Al-Baqarah',
        topic: 'Verses 1-20: The Opening and the Believers',
        facilitator: 'Sheikh Abdullah',
        participants: 24,
        maxParticipants: 30,
        startTime: '2024-01-15T19:00:00Z',
        duration: 90,
        isLive: true,
        category: 'quran',
        level: 'intermediate'
      },
      {
        id: '2',
        title: 'Hadith Study: 40 Nawawi',
        topic: 'Hadith 1-5: Foundations of Faith',
        facilitator: 'Dr. Aisha Hassan',
        participants: 18,
        maxParticipants: 25,
        startTime: '2024-01-15T20:30:00Z',
        duration: 60,
        isLive: false,
        category: 'hadith',
        level: 'beginner'
      },
      {
        id: '3',
        title: 'Seerah Study Circle',
        topic: 'The Migration to Madinah',
        facilitator: 'Ustadh Omar',
        participants: 31,
        maxParticipants: 35,
        startTime: '2024-01-16T18:00:00Z',
        duration: 75,
        isLive: false,
        category: 'seerah',
        level: 'intermediate'
      }
    ];

    setStudySessions(mockSessions);

    // Load mock chat messages for active session
    const mockChat: ChatMessage[] = [
      {
        id: '1',
        user: 'Ahmad',
        message: 'Assalamu alaikum everyone, excited for today\'s lesson!',
        timestamp: '19:02',
        isQuestion: false
      },
      {
        id: '2',
        user: 'Fatima',
        message: 'Can you explain the concept of "Ghaib" in more detail?',
        timestamp: '19:15',
        isQuestion: true
      },
      {
        id: '3',
        user: 'Sheikh Abdullah',
        message: 'Great question Fatima! "Ghaib" refers to the unseen realm...',
        timestamp: '19:16',
        isQuestion: false
      }
    ];

    setChatMessages(mockChat);
  }, []);

  const joinSession = (session: StudySession) => {
    if (session.participants >= session.maxParticipants) {
      toast({
        title: "Session Full",
        description: "This study circle has reached maximum capacity.",
        variant: "destructive"
      });
      return;
    }

    setActiveSession(session);
    toast({
      title: "Joined Study Circle! 🎓",
      description: `Welcome to ${session.title}`,
    });
  };

  const leaveSession = () => {
    setActiveSession(null);
    setIsAudioOn(false);
    setIsVideoOn(false);
    setHandRaised(false);
    toast({
      title: "Left Study Circle",
      description: "You have left the study session.",
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isQuestion: newMessage.includes('?')
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast({
      title: isAudioOn ? "Microphone Off" : "Microphone On",
      description: isAudioOn ? "You are now muted" : "You can now speak",
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Camera Off" : "Camera On",
      description: isVideoOn ? "Your video is now off" : "Your video is now on",
    });
  };

  const raiseHand = () => {
    setHandRaised(!handRaised);
    toast({
      title: handRaised ? "Hand Lowered" : "Hand Raised",
      description: handRaised ? "You lowered your hand" : "The facilitator will see your raised hand",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'quran': return 'bg-green-100 text-green-800';
      case 'hadith': return 'bg-blue-100 text-blue-800';
      case 'fiqh': return 'bg-purple-100 text-purple-800';
      case 'seerah': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (activeSession) {
    return (
      <Card className="h-[calc(100vh-200px)] flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{activeSession.title}</CardTitle>
              <p className="text-sm text-gray-600">{activeSession.topic}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getCategoryColor(activeSession.category)}>
                  {activeSession.category}
                </Badge>
                <Badge className={getLevelColor(activeSession.level)}>
                  {activeSession.level}
                </Badge>
                {activeSession.isLive && (
                  <Badge className="bg-red-100 text-red-800 animate-pulse">
                    🔴 LIVE
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="outline" onClick={leaveSession}>
              Leave Session
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex gap-4">
          {/* Main Content Area */}
          <div className="flex-1 space-y-4">
            {/* Video Area */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🎥</div>
              <p className="text-gray-600 dark:text-gray-400">
                Video session with {activeSession.facilitator}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="w-4 h-4" />
                <span className="text-sm">{activeSession.participants} participants</span>
              </div>
            </div>

            {/* Session Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isAudioOn ? "default" : "outline"}
                size="sm"
                onClick={toggleAudio}
              >
                {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </Button>
              
              <Button
                variant={isVideoOn ? "default" : "outline"}
                size="sm"
                onClick={toggleVideo}
              >
                {isVideoOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </Button>
              
              <Button
                variant={handRaised ? "default" : "outline"}
                size="sm"
                onClick={raiseHand}
                className={handRaised ? "bg-yellow-500 hover:bg-yellow-600" : ""}
              >
                <Hand className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 border-l pl-4 flex flex-col">
            <div className="font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Discussion
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`p-2 rounded-lg ${msg.isQuestion ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                  {msg.isQuestion && (
                    <Badge className="mt-1 text-xs">Question</Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message or question..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="resize-none"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button size="sm" onClick={sendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Virtual Study Circles</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Join live Islamic learning sessions with scholars and fellow students
        </p>
      </div>

      {/* Featured Live Session */}
      {studySessions.find(s => s.isLive) && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-red-100 text-red-800 animate-pulse">
                🔴 LIVE NOW
              </Badge>
              <Badge className={getCategoryColor(studySessions.find(s => s.isLive)!.category)}>
                {studySessions.find(s => s.isLive)!.category}
              </Badge>
            </div>
            <CardTitle className="text-lg">
              {studySessions.find(s => s.isLive)!.title}
            </CardTitle>
            <p className="text-gray-600">
              {studySessions.find(s => s.isLive)!.topic}
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {studySessions.find(s => s.isLive)!.participants}/{studySessions.find(s => s.isLive)!.maxParticipants}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {studySessions.find(s => s.isLive)!.duration} min
                </div>
                <span>with {studySessions.find(s => s.isLive)!.facilitator}</span>
              </div>
              <Button 
                onClick={() => joinSession(studySessions.find(s => s.isLive)!)}
                className="bg-red-600 hover:bg-red-700"
              >
                <Video className="w-4 h-4 mr-2" />
                Join Live
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Sessions */}
      <div className="grid md:grid-cols-2 gap-4">
        {studySessions.filter(s => !s.isLive).map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(session.category)}>
                    {session.category}
                  </Badge>
                  <Badge className={getLevelColor(session.level)}>
                    {session.level}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-lg">{session.title}</CardTitle>
              <p className="text-sm text-gray-600">{session.topic}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(session.startTime).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.participants}/{session.maxParticipants}
                    </div>
                    <span>with {session.facilitator}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={() => joinSession(session)}>
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedVirtualStudyCircle;
