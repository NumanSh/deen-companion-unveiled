
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, TrendingUp, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerCompletion {
  date: string;
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
}

interface PrayerStats {
  totalPrayers: number;
  completedPrayers: number;
  streak: number;
  weeklyAverage: number;
}

const PrayerTimeTracker: React.FC = () => {
  const [todaysPrayers, setTodaysPrayers] = useState({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false
  });
  const [prayerHistory, setPrayerHistory] = useState<PrayerCompletion[]>([]);
  const [stats, setStats] = useState<PrayerStats>({
    totalPrayers: 0,
    completedPrayers: 0,
    streak: 0,
    weeklyAverage: 0
  });
  const { toast } = useToast();

  const prayers = [
    { key: 'fajr', name: 'Fajr', time: '05:30', icon: '🌅' },
    { key: 'dhuhr', name: 'Dhuhr', time: '12:45', icon: '☀️' },
    { key: 'asr', name: 'Asr', time: '16:20', icon: '🌤️' },
    { key: 'maghrib', name: 'Maghrib', time: '18:45', icon: '🌅' },
    { key: 'isha', name: 'Isha', time: '20:15', icon: '🌙' }
  ];

  useEffect(() => {
    // Load data from localStorage
    const savedHistory = localStorage.getItem('prayer-history');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setPrayerHistory(history);
      
      // Check if today's prayers are already recorded
      const today = new Date().toDateString();
      const todayRecord = history.find((record: PrayerCompletion) => record.date === today);
      if (todayRecord) {
        setTodaysPrayers(todayRecord.prayers);
      }
    }

    calculateStats();
  }, [prayerHistory]);

  const calculateStats = () => {
    const last7Days = prayerHistory.slice(-7);
    let totalPossible = last7Days.length * 5;
    let totalCompleted = 0;
    let currentStreak = 0;

    last7Days.forEach(day => {
      const dayCompleted = Object.values(day.prayers).filter(Boolean).length;
      totalCompleted += dayCompleted;
      
      if (dayCompleted === 5) {
        currentStreak++;
      }
    });

    setStats({
      totalPrayers: totalPossible,
      completedPrayers: totalCompleted,
      streak: currentStreak,
      weeklyAverage: totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0
    });
  };

  const togglePrayer = (prayerKey: string) => {
    const newPrayerState = {
      ...todaysPrayers,
      [prayerKey]: !todaysPrayers[prayerKey as keyof typeof todaysPrayers]
    };
    
    setTodaysPrayers(newPrayerState);
    
    // Update history
    const today = new Date().toDateString();
    const updatedHistory = prayerHistory.filter(record => record.date !== today);
    updatedHistory.push({
      date: today,
      prayers: newPrayerState
    });
    
    setPrayerHistory(updatedHistory);
    localStorage.setItem('prayer-history', JSON.stringify(updatedHistory));

    const prayerName = prayers.find(p => p.key === prayerKey)?.name;
    toast({
      title: newPrayerState[prayerKey as keyof typeof newPrayerState] ? "Prayer Completed" : "Prayer Unmarked",
      description: `${prayerName} prayer ${newPrayerState[prayerKey as keyof typeof newPrayerState] ? 'completed' : 'unmarked'}`,
    });
  };

  const completedToday = Object.values(todaysPrayers).filter(Boolean).length;
  const todayProgress = (completedToday / 5) * 100;

  const getStreakBadge = () => {
    if (stats.streak >= 30) return { text: 'Master', color: 'bg-purple-100 text-purple-800', icon: '👑' };
    if (stats.streak >= 14) return { text: 'Committed', color: 'bg-gold-100 text-gold-800', icon: '🏆' };
    if (stats.streak >= 7) return { text: 'Consistent', color: 'bg-green-100 text-green-800', icon: '⭐' };
    if (stats.streak >= 3) return { text: 'Building', color: 'bg-blue-100 text-blue-800', icon: '🌱' };
    return { text: 'Starting', color: 'bg-gray-100 text-gray-800', icon: '🚀' };
  };

  const streakBadge = getStreakBadge();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Prayer Time Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Progress */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">Today's Prayers</h3>
            <div className="text-2xl font-bold text-blue-600">
              {completedToday}/5
            </div>
          </div>
          <Progress value={todayProgress} className="h-3 mb-3" />
          <div className="text-center text-sm text-blue-600 dark:text-blue-400">
            {completedToday === 5 ? "All prayers completed! Alhamdulillah 🤲" : `${5 - completedToday} prayers remaining`}
          </div>
        </div>

        {/* Prayer List */}
        <div className="space-y-3">
          {prayers.map(prayer => (
            <div
              key={prayer.key}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                todaysPrayers[prayer.key as keyof typeof todaysPrayers]
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{prayer.icon}</span>
                <div>
                  <h4 className="font-medium">{prayer.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{prayer.time}</p>
                </div>
              </div>
              
              <Button
                variant={todaysPrayers[prayer.key as keyof typeof todaysPrayers] ? "default" : "outline"}
                size="sm"
                onClick={() => togglePrayer(prayer.key)}
                className={todaysPrayers[prayer.key as keyof typeof todaysPrayers] ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {todaysPrayers[prayer.key as keyof typeof todaysPrayers] ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </>
                ) : (
                  'Mark Complete'
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-700 dark:text-green-300">
              {stats.weeklyAverage.toFixed(0)}%
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">Weekly Average</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <Award className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
              {stats.streak}
            </div>
            <div className="text-sm text-orange-600 dark:text-orange-400">Day Streak</div>
          </div>
        </div>

        {/* Streak Badge */}
        <div className="text-center">
          <Badge className={`${streakBadge.color} px-4 py-2`}>
            {streakBadge.icon} {streakBadge.text} Level
          </Badge>
        </div>

        {/* Encouragement */}
        <div className="text-center text-sm text-muted-foreground">
          {completedToday === 5 ? (
            "May Allah accept your prayers and grant you steadfastness! 🤲"
          ) : completedToday >= 3 ? (
            "Great progress! Keep up the consistency! 💪"
          ) : (
            "Remember: Prayer is the pillar of religion 🕌"
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTimeTracker;
