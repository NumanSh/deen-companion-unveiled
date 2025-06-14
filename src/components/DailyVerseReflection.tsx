
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Save, RefreshCw, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VerseReflection {
  verse: string;
  translation: string;
  reference: string;
  reflection: string;
  date: string;
  mood: string;
}

const DailyVerseReflection: React.FC = () => {
  const [currentVerse, setCurrentVerse] = useState<any>(null);
  const [reflection, setReflection] = useState('');
  const [mood, setMood] = useState('peaceful');
  const [savedReflections, setSavedReflections] = useState<VerseReflection[]>([]);
  const { toast } = useToast();

  const dailyVerses = [
    {
      arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
      translation: "And whoever fears Allah - He will make for him a way out.",
      reference: "Quran 65:2"
    },
    {
      arabic: "وَبَشِّرِ الصَّابِرِينَ",
      translation: "And give good tidings to the patient.",
      reference: "Quran 2:155"
    },
    {
      arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translation: "For indeed, with hardship [will be] ease.",
      reference: "Quran 94:5"
    },
    {
      arabic: "وَاللَّهُ خَيْرٌ حَافِظًا",
      translation: "But Allah is the best guardian.",
      reference: "Quran 12:64"
    }
  ];

  const moods = [
    { value: 'grateful', emoji: '🙏', label: 'Grateful' },
    { value: 'peaceful', emoji: '😌', label: 'Peaceful' },
    { value: 'hopeful', emoji: '🌟', label: 'Hopeful' },
    { value: 'contemplative', emoji: '🤔', label: 'Contemplative' },
    { value: 'inspired', emoji: '✨', label: 'Inspired' }
  ];

  useEffect(() => {
    // Load saved reflections
    const saved = localStorage.getItem('daily-verse-reflections');
    if (saved) {
      setSavedReflections(JSON.parse(saved));
    }

    // Set daily verse
    const today = new Date().toDateString();
    const dayIndex = new Date().getDate() % dailyVerses.length;
    setCurrentVerse(dailyVerses[dayIndex]);

    // Check if already reflected today
    const todayReflection = saved ? JSON.parse(saved).find((r: VerseReflection) => r.date === today) : null;
    if (todayReflection) {
      setReflection(todayReflection.reflection);
      setMood(todayReflection.mood);
    }
  }, []);

  const saveReflection = () => {
    if (!reflection.trim()) {
      toast({
        title: "Empty Reflection",
        description: "Please write your reflection before saving.",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toDateString();
    const newReflection: VerseReflection = {
      verse: currentVerse.arabic,
      translation: currentVerse.translation,
      reference: currentVerse.reference,
      reflection: reflection.trim(),
      date: today,
      mood
    };

    const updated = savedReflections.filter(r => r.date !== today);
    updated.unshift(newReflection);
    
    setSavedReflections(updated);
    localStorage.setItem('daily-verse-reflections', JSON.stringify(updated));

    toast({
      title: "Reflection Saved",
      description: "Your daily reflection has been saved successfully.",
    });
  };

  const getNewVerse = () => {
    const randomIndex = Math.floor(Math.random() * dailyVerses.length);
    setCurrentVerse(dailyVerses[randomIndex]);
    setReflection('');
  };

  if (!currentVerse) return null;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          Daily Verse Reflection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Verse */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
          <div className="text-right mb-3" dir="rtl">
            <div className="text-xl font-arabic text-gray-800 dark:text-gray-200 leading-relaxed">
              {currentVerse.arabic}
            </div>
          </div>
          <div className="text-gray-700 dark:text-gray-300 italic mb-2">
            "{currentVerse.translation}"
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400">
            {currentVerse.reference}
          </div>
        </div>

        {/* Mood Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">How does this verse make you feel?</label>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors ${
                  mood === m.value
                    ? 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reflection Text Area */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Reflection</label>
          <Textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What insights, lessons, or thoughts does this verse inspire in you today? How can you apply its wisdom to your life?"
            className="min-h-[120px] resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={getNewVerse}>
            <RefreshCw className="w-4 h-4 mr-2" />
            New Verse
          </Button>
          <Button onClick={saveReflection} className="bg-purple-600 hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Save Reflection
          </Button>
        </div>

        {/* Recent Reflections */}
        {savedReflections.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Heart className="w-4 h-4 text-purple-600" />
              Recent Reflections
            </h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {savedReflections.slice(0, 3).map((r, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm">
                  <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                    {r.reference} • {new Date(r.date).toLocaleDateString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {r.reflection}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs text-gray-500">Mood:</span>
                    <span className="text-xs">
                      {moods.find(m => m.value === r.mood)?.emoji} {moods.find(m => m.value === r.mood)?.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyVerseReflection;
