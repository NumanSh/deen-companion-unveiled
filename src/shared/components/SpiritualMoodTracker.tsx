
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, TrendingUp, Calendar, Smile } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MoodEntry {
  date: string;
  mood: number;
  spiritualActivities: string[];
  reflection: string;
  gratitude: string[];
}

const SpiritualMoodTracker: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<number>(5);
  const [activities, setActivities] = useState<string[]>([]);
  const [reflection, setReflection] = useState('');
  const [gratitude, setGratitude] = useState<string[]>(['', '', '']);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const { toast } = useToast();

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊', '😇', '🤲', '✨', '🌟', '🕊️'];
  const moodLabels = [
    'Very Low', 'Low', 'Below Average', 'Neutral', 'Good', 
    'Very Good', 'Blessed', 'Peaceful', 'Joyful', 'Transcendent'
  ];

  const spiritualActivities = [
    'Prayer (Salah)', 'Quran Reading', 'Dhikr/Remembrance', 'Dua (Supplication)',
    'Islamic Study', 'Charity (Sadaqah)', 'Fasting', 'Community Service',
    'Reflection/Contemplation', 'Seeking Forgiveness', 'Gratitude Practice'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('spiritual-mood-history');
    if (saved) {
      setMoodHistory(JSON.parse(saved));
    }

    // Check if already logged today
    const today = new Date().toDateString();
    const todayEntry = saved ? JSON.parse(saved).find((entry: MoodEntry) => entry.date === today) : null;
    
    if (todayEntry) {
      setCurrentMood(todayEntry.mood);
      setActivities(todayEntry.spiritualActivities);
      setReflection(todayEntry.reflection);
      setGratitude(todayEntry.gratitude);
    }
  }, []);

  const toggleActivity = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const updateGratitude = (index: number, value: string) => {
    const updated = [...gratitude];
    updated[index] = value;
    setGratitude(updated);
  };

  const saveMoodEntry = () => {
    const today = new Date().toDateString();
    const entry: MoodEntry = {
      date: today,
      mood: currentMood,
      spiritualActivities: activities,
      reflection,
      gratitude: gratitude.filter(g => g.trim() !== '')
    };

    const updated = moodHistory.filter(h => h.date !== today);
    updated.unshift(entry);
    
    setMoodHistory(updated);
    localStorage.setItem('spiritual-mood-history', JSON.stringify(updated));

    toast({
      title: "Mood Entry Saved",
      description: "Your spiritual wellness has been recorded for today.",
    });
  };

  const getAverageWeeklyMood = () => {
    const lastWeek = moodHistory.slice(0, 7);
    if (lastWeek.length === 0) return 0;
    return lastWeek.reduce((sum, entry) => sum + entry.mood, 0) / lastWeek.length;
  };

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-600" />
          Spiritual Wellness Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Mood Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">How is your spiritual state today?</label>
          <div className="grid grid-cols-5 gap-2">
            {moodEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setCurrentMood(index + 1)}
                className={`p-3 rounded-lg text-2xl transition-all ${
                  currentMood === index + 1
                    ? 'bg-pink-100 dark:bg-pink-800 scale-110 border-2 border-pink-300'
                    : 'bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-pink-900/30'
                }`}
                title={moodLabels[index]}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="text-center text-sm text-pink-600 dark:text-pink-400">
            {moodLabels[currentMood - 1]}
          </div>
        </div>

        {/* Spiritual Activities */}
        <div className="space-y-3">
          <label className="text-sm font-medium">What spiritual activities did you do today?</label>
          <div className="grid grid-cols-2 gap-2">
            {spiritualActivities.map((activity) => (
              <button
                key={activity}
                onClick={() => toggleActivity(activity)}
                className={`p-2 rounded-lg text-sm transition-colors text-left ${
                  activities.includes(activity)
                    ? 'bg-pink-100 dark:bg-pink-800 text-pink-800 dark:text-pink-200'
                    : 'bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-pink-900/30'
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        {/* Gratitude Practice */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Three things you're grateful for today:</label>
          {gratitude.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => updateGratitude(index, e.target.value)}
              placeholder={`Gratitude ${index + 1}...`}
              className="w-full p-2 border rounded-lg text-sm"
            />
          ))}
        </div>

        {/* Reflection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Spiritual Reflection</label>
          <Textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="How did you feel spiritually today? Any insights or challenges?"
            className="min-h-[80px] resize-none"
          />
        </div>

        {/* Save Button */}
        <Button
          onClick={saveMoodEntry}
          className="w-full bg-pink-600 hover:bg-pink-700"
        >
          Save Today's Entry
        </Button>

        {/* Weekly Overview */}
        {moodHistory.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-pink-600" />
              <span className="font-medium">Weekly Overview</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-lg font-bold text-pink-600">
                  {getAverageWeeklyMood().toFixed(1)}/10
                </div>
                <div className="text-gray-600">Average Mood</div>
              </div>
              <div>
                <div className="text-lg font-bold text-pink-600">
                  {moodHistory.slice(0, 7).length}
                </div>
                <div className="text-gray-600">Days Tracked</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpiritualMoodTracker;
