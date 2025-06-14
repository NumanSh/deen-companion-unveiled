
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Brain, Play, Pause, RotateCcw, Sparkles, Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIPersonalizedDhikr = () => {
  const [currentDhikr, setCurrentDhikr] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const dhikrTypes = [
    { name: 'Morning Energy', icon: Sun, mood: 'energetic' },
    { name: 'Evening Peace', icon: Moon, mood: 'peaceful' },
    { name: 'Stress Relief', icon: Heart, mood: 'anxious' },
    { name: 'Gratitude Focus', icon: Sparkles, mood: 'grateful' }
  ];

  useEffect(() => {
    generatePersonalizedDhikr('peaceful');
  }, []);

  const generatePersonalizedDhikr = async (mood: string) => {
    setIsLoading(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    const dhikrDatabase = {
      peaceful: {
        arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        transliteration: "Subhan Allah wa bihamdihi",
        translation: "Glory is to Allah and praise is to Him",
        benefit: "Brings inner peace and tranquility to the heart",
        target: 100,
        aiReason: "Based on your prayer times and current mood, this dhikr will help calm your mind and connect with Allah's peace.",
        timeRecommendation: "Best recited after Maghrib prayer or before sleep"
      },
      energetic: {
        arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration: "La ilaha illa Allah wahdahu la sharika lah",
        translation: "There is no god but Allah alone, with no partner",
        benefit: "Strengthens faith and provides spiritual energy",
        target: 50,
        aiReason: "Perfect for morning motivation and spiritual empowerment based on your activity patterns.",
        timeRecommendation: "Ideal after Fajr prayer to start your day with strength"
      },
      anxious: {
        arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
        transliteration: "Hasbuna Allah wa ni'mal wakeel",
        translation: "Allah is sufficient for us and He is the best guardian",
        benefit: "Removes anxiety and increases trust in Allah",
        target: 70,
        aiReason: "This dhikr will help reduce stress and anxiety, providing comfort in difficult times.",
        timeRecommendation: "Recite when feeling overwhelmed or before important decisions"
      },
      grateful: {
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Alhamdulillahi rabbil alameen",
        translation: "All praise is due to Allah, Lord of all the worlds",
        benefit: "Increases gratitude and appreciation for Allah's blessings",
        target: 80,
        aiReason: "Based on your recent achievements, this dhikr will enhance your gratitude and spiritual satisfaction.",
        timeRecommendation: "Perfect after meals or when reflecting on daily blessings"
      }
    };

    setCurrentDhikr(dhikrDatabase[mood as keyof typeof dhikrDatabase]);
    setCount(0);
    setProgress(0);
    setIsLoading(false);

    toast({
      title: "Personalized Dhikr Ready",
      description: "AI has selected the perfect dhikr for your current state.",
    });
  };

  const incrementCount = () => {
    if (currentDhikr) {
      const newCount = count + 1;
      setCount(newCount);
      setProgress((newCount / currentDhikr.target) * 100);
      
      if (newCount === currentDhikr.target) {
        toast({
          title: "Dhikr Complete! 🎉",
          description: "May Allah accept your dhikr and grant you peace.",
        });
        setIsPlaying(false);
      }
    }
  };

  const resetCounter = () => {
    setCount(0);
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
            <Brain className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            AI Personalized Dhikr
          </span>
        </CardTitle>
        <p className="text-sm text-green-700 dark:text-green-300">
          Intelligent dhikr recommendations based on your mood and spiritual needs
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Selection */}
        <div className="grid grid-cols-2 gap-3">
          {dhikrTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => generatePersonalizedDhikr(type.mood)}
                disabled={isLoading}
                className="h-auto p-3 border-green-200"
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon className="w-5 h-5 text-green-600" />
                  <span className="text-xs">{type.name}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {currentDhikr && (
          <div className="space-y-4">
            {/* AI Insight */}
            <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-700 dark:text-green-300">AI Recommendation</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 mb-2">{currentDhikr.aiReason}</p>
              <p className="text-xs text-green-500 dark:text-green-500">{currentDhikr.timeRecommendation}</p>
            </div>

            {/* Dhikr Display */}
            <div className="text-center bg-white/70 dark:bg-gray-800/70 p-6 rounded-lg border border-green-200 dark:border-green-700">
              <div className="text-3xl mb-4 font-arabic text-green-800 dark:text-green-200" style={{ fontFamily: 'serif' }}>
                {currentDhikr.arabic}
              </div>
              <div className="text-lg font-medium text-green-700 dark:text-green-300 mb-2">
                {currentDhikr.transliteration}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mb-4">
                {currentDhikr.translation}
              </div>
              <Badge className="bg-green-100 text-green-800">
                {currentDhikr.benefit}
              </Badge>
            </div>

            {/* Counter and Progress */}
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {count}/{currentDhikr.target}
                </div>
                <Progress value={progress} className="h-3 mt-2" />
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Start'}
                </Button>
                <Button
                  onClick={incrementCount}
                  disabled={count >= currentDhikr.target}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Count (+1)
                </Button>
                <Button
                  onClick={resetCounter}
                  variant="outline"
                  className="border-green-200"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Completion Message */}
            {progress === 100 && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌟</div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                  Dhikr Complete!
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  May Allah accept your remembrance and grant you spiritual peace.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIPersonalizedDhikr;
