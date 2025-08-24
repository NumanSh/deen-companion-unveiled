import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  reward: string;
  type: 'prayer' | 'quran' | 'dhikr';
}

const CommunityChallenge: React.FC = () => {
  const { toast } = useToast();
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Daily Quran Reading',
      description: 'Read at least 5 verses daily for 30 days',
      participants: 245,
      duration: '30 days',
      reward: 'Golden Badge',
      type: 'quran'
    },
    {
      id: '2',
      title: 'Morning Dhikr Circle',
      description: 'Recite morning adhkar daily',
      participants: 189,
      duration: '7 days',
      reward: 'Silver Badge',
      type: 'dhikr'
    }
  ]);

  const joinChallenge = (challenge: Challenge) => {
    toast({
      title: 'Challenge Joined!',
      description: `You've joined ${challenge.title}`,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-600" />
        Community Challenges
      </h3>
      
      {challenges.map((challenge) => (
        <Card key={challenge.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{challenge.title}</span>
              <Badge variant="outline">{challenge.type}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {challenge.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {challenge.participants} participants
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {challenge.duration}
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                {challenge.reward}
              </div>
            </div>
            
            <Button 
              onClick={() => joinChallenge(challenge)}
              className="w-full"
            >
              <Target className="w-4 h-4 mr-2" />
              Join Challenge
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunityChallenge;