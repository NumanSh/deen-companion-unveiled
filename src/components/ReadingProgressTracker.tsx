
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Target, Trophy, TrendingUp, CheckCircle } from 'lucide-react';
import { QuranSurah } from '@/services/quranService';

interface ReadingSession {
  surahNumber: number;
  surahName: string;
  versesRead: number;
  totalVerses: number;
  date: string;
  duration: number; // in minutes
  completed: boolean;
}

interface ReadingGoal {
  type: 'daily' | 'weekly' | 'monthly';
  target: number; // number of surahs or verses
  unit: 'surahs' | 'verses';
  current: number;
  startDate: string;
}

interface ReadingProgressTrackerProps {
  surahs: QuranSurah[];
  onSurahSelect?: (surah: QuranSurah) => void;
}

const ReadingProgressTracker: React.FC<ReadingProgressTrackerProps> = ({
  surahs,
  onSurahSelect
}) => {
  const [sessions, setSessions] = useState<ReadingSession[]>([]);
  const [goals, setGoals] = useState<ReadingGoal[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);

  // Load data from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('quran-reading-sessions');
    const savedGoals = localStorage.getItem('quran-reading-goals');
    
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      // Set default goals
      const defaultGoals: ReadingGoal[] = [
        {
          type: 'daily',
          target: 1,
          unit: 'surahs',
          current: 0,
          startDate: new Date().toISOString().split('T')[0]
        },
        {
          type: 'weekly',
          target: 5,
          unit: 'surahs',
          current: 0,
          startDate: new Date().toISOString().split('T')[0]
        }
      ];
      setGoals(defaultGoals);
      localStorage.setItem('quran-reading-goals', JSON.stringify(defaultGoals));
    }
  }, []);

  // Calculate streak and total progress
  useEffect(() => {
    if (sessions.length === 0) return;

    // Calculate reading streak
    const today = new Date();
    let currentStreak = 0;
    const sortedSessions = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (let i = 0; i < sortedSessions.length; i++) {
      const sessionDate = new Date(sortedSessions[i].date);
      const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    setStreak(currentStreak);

    // Calculate total progress (completed surahs)
    const completedSurahs = new Set(sessions.filter(s => s.completed).map(s => s.surahNumber));
    setTotalProgress((completedSurahs.size / 114) * 100);

    // Update goals progress
    const today_str = today.toISOString().split('T')[0];
    const thisWeekStart = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];

    const updatedGoals = goals.map(goal => {
      let relevantSessions: ReadingSession[] = [];
      
      switch (goal.type) {
        case 'daily':
          relevantSessions = sessions.filter(s => s.date === today_str && s.completed);
          break;
        case 'weekly':
          relevantSessions = sessions.filter(s => s.date >= thisWeekStart && s.completed);
          break;
        case 'monthly':
          relevantSessions = sessions.filter(s => s.date >= thisMonthStart && s.completed);
          break;
      }
      
      const current = goal.unit === 'surahs' 
        ? new Set(relevantSessions.map(s => s.surahNumber)).size
        : relevantSessions.reduce((sum, s) => sum + s.versesRead, 0);
      
      return { ...goal, current };
    });

    setGoals(updatedGoals);
  }, [sessions, goals]);

  const getRecentActivity = () => {
    return sessions
      .slice(-7)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getCompletedSurahs = () => {
    const completed = new Set(sessions.filter(s => s.completed).map(s => s.surahNumber));
    return Array.from(completed).sort((a, b) => a - b);
  };

  const getContinuingSurahs = () => {
    const continuing = sessions
      .filter(s => !s.completed)
      .reduce((acc, session) => {
        const existing = acc.find(s => s.surahNumber === session.surahNumber);
        if (existing) {
          existing.versesRead = Math.max(existing.versesRead, session.versesRead);
        } else {
          acc.push(session);
        }
        return acc;
      }, [] as ReadingSession[]);
    
    return continuing.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-600">{streak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{getCompletedSurahs().length}</div>
            <div className="text-sm text-gray-600">Surahs Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{getContinuingSurahs().length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-600">{Math.round(totalProgress)}%</div>
            <div className="text-sm text-gray-600">Quran Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Reading Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            Reading Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium capitalize">
                  {goal.type} Goal: {goal.target} {goal.unit}
                </span>
                <Badge variant={goal.current >= goal.target ? 'default' : 'secondary'}>
                  {goal.current}/{goal.target}
                </Badge>
              </div>
              <Progress 
                value={(goal.current / goal.target) * 100} 
                className="w-full"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {getRecentActivity().length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No reading sessions yet. Start reading to track your progress!
            </p>
          ) : (
            <div className="space-y-3">
              {getRecentActivity().map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      session.completed ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <div className="font-medium">{session.surahName}</div>
                      <div className="text-sm text-gray-600">
                        {session.versesRead}/{session.totalVerses} verses
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatDate(session.date)}</div>
                    <div className="text-xs text-gray-500">{session.duration}m</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Continue Reading */}
      {getContinuingSurahs().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Continue Reading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getContinuingSurahs().slice(0, 4).map((session) => {
                const surah = surahs.find(s => s.number === session.surahNumber);
                if (!surah) return null;
                
                const progress = (session.versesRead / session.totalVerses) * 100;
                
                return (
                  <div
                    key={session.surahNumber}
                    onClick={() => onSurahSelect?.(surah)}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{session.surahName}</h4>
                      <Badge variant="outline">{Math.round(progress)}%</Badge>
                    </div>
                    <Progress value={progress} className="mb-2" />
                    <div className="text-sm text-gray-600">
                      {session.versesRead}/{session.totalVerses} verses
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReadingProgressTracker;
