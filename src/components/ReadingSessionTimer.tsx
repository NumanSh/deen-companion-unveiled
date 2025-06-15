
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReadingSessionTimerProps {
  onClose: () => void;
}

const ReadingSessionTimer: React.FC<ReadingSessionTimerProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [goal, setGoal] = useState(15); // 15 minutes default
  const [sessions, setSessions] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  useEffect(() => {
    // Load previous sessions
    const saved = localStorage.getItem('reading-sessions');
    if (saved) {
      setSessions(JSON.parse(saved));
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsActive(true);
    toast({
      title: 'Reading Session Started',
      description: `Goal: ${goal} minutes of focused reading`,
    });
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const stopTimer = () => {
    if (time > 0) {
      const minutes = Math.floor(time / 60);
      const newSessions = [...sessions, minutes];
      setSessions(newSessions);
      localStorage.setItem('reading-sessions', JSON.stringify(newSessions));
      
      toast({
        title: 'Session Completed!',
        description: `You read for ${minutes} minutes. Keep up the great work!`,
      });
    }
    
    setIsActive(false);
    setTime(0);
  };

  const progress = Math.min((time / (goal * 60)) * 100, 100);
  const totalMinutes = sessions.reduce((acc, session) => acc + session, 0);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            Reading Timer
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className="text-4xl font-bold text-emerald-700 mb-2">
            {formatTime(time)}
          </div>
          <div className="text-sm text-gray-600">
            Goal: {goal} minutes
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.floor(progress)}% complete
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {!isActive ? (
            <Button onClick={startTimer} className="bg-emerald-600 hover:bg-emerald-700">
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          ) : (
            <Button onClick={pauseTimer} variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          
          <Button onClick={stopTimer} variant="outline">
            <Square className="w-4 h-4 mr-2" />
            Stop
          </Button>
        </div>

        {/* Goal Setting */}
        <div className="flex items-center gap-3">
          <Target className="w-4 h-4 text-gray-600" />
          <label className="text-sm text-gray-600">Daily Goal:</label>
          <select 
            value={goal} 
            onChange={(e) => setGoal(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5 min</option>
            <option value={10}>10 min</option>
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={60}>60 min</option>
          </select>
        </div>

        {/* Statistics */}
        {sessions.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">This Week</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-emerald-600">{sessions.length}</div>
                <div className="text-xs text-gray-500">Sessions</div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-600">{totalMinutes}</div>
                <div className="text-xs text-gray-500">Total Minutes</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReadingSessionTimer;
