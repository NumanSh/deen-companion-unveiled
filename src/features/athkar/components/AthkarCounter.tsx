
import React, { useState, useEffect } from 'react';

interface AthkarCategory {
  id: string;
  name: string;
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
}

interface AthkarSession {
  category: string;
  count: number;
  startTime: Date;
  endTime?: Date;
}import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sunrise, Sunset, Moon, Heart, RotateCcw, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AthkarItem, fetchAthkarByCategory } from '../services/athkarService';

const AthkarCounter = () => {
  const [currentAthkar, setCurrentAthkar] = useState<AthkarItem | null>(null);
  const [athkarList, setAthkarList] = useState<AthkarItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'morning' | 'evening' | 'after_prayer' | 'sleeping'>('morning');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: 'morning', name: 'Morning', icon: Sunrise, color: 'bg-orange-500' },
    { id: 'evening', name: 'Evening', icon: Sunset, color: 'bg-indigo-500' },
    { id: 'after_prayer', name: 'After Prayer', icon: Heart, color: 'bg-green-500' },
    { id: 'sleeping', name: 'Before Sleep', icon: Moon, color: 'bg-purple-500' }
  ];

  useEffect(() => {
    loadAthkarCategory(selectedCategory);
  }, [selectedCategory]);

  const loadAthkarCategory = async (category: typeof selectedCategory) => {
    setIsLoading(true);
    try {
      const athkar = await fetchAthkarByCategory(category);
      setAthkarList(athkar);
      if (athkar.length > 0) {
        setCurrentAthkar(athkar[0]);
        setCurrentIndex(0);
        setCount(0);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load Athkar. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const playClickSound = () => {
    if (soundEnabled) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const incrementCount = () => {
    if (!currentAthkar) return;
    
    const newCount = count + 1;
    setCount(newCount);
    playClickSound();

    if (newCount >= (currentAthkar.repetitions || 1)) {
      toast({
        title: "Athkar Complete! 🎉",
        description: `You've completed "${currentAthkar.transliteration || 'this athkar'}"`,
      });
      
      // Move to next athkar if available
      if (currentIndex < athkarList.length - 1) {
        setTimeout(() => {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          setCurrentAthkar(athkarList[nextIndex]);
          setCount(0);
        }, 2000);
      } else {
        toast({
          title: "All Athkar Complete! 🌟",
          description: "May Allah accept your remembrance.",
        });
        setIsPlaying(false);
      }
    }
  };

  const resetCurrent = () => {
    setCount(0);
    toast({
      title: "Counter Reset",
      description: "Athkar counter has been reset.",
    });
  };

  const resetAll = () => {
    setCount(0);
    setCurrentIndex(0);
    if (athkarList.length > 0) {
      setCurrentAthkar(athkarList[0]);
    }
    setIsPlaying(false);
  };

  const progress = currentAthkar ? (count / (currentAthkar.repetitions || 1)) * 100 : 0;
  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="space-y-4">
      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Select Athkar Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id as any)}
                  disabled={isLoading}
                  className={`h-16 ${selectedCategory === category.id ? category.color : ''}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{category.name}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Athkar Display */}
      {currentAthkar && (
        <Card className={`${currentCategory?.color || 'bg-blue-500'}/10 border-2`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {currentCategory && <currentCategory.icon className="w-5 h-5" />}
                Athkar {currentIndex + 1} of {athkarList.length}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                {currentAthkar.repetitions && (
                  <Badge variant="secondary">
                    Repeat {currentAthkar.repetitions}x
                  </Badge>
                )}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Arabic Text */}
            <div className="text-center bg-white/70 dark:bg-gray-800/70 p-6 rounded-lg">
              <div className="text-2xl md:text-3xl mb-4 font-arabic leading-loose" dir="rtl">
                {currentAthkar.arabic}
              </div>
              {currentAthkar.transliteration && (
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-2 italic">
                  {currentAthkar.transliteration}
                </div>
              )}
              {currentAthkar.translation && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currentAthkar.translation}
                </div>
              )}
            </div>

            {/* Counter */}
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-primary">
                {count}/{currentAthkar.repetitions || 1}
              </div>
              
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant="outline"
                  size="sm"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Start'}
                </Button>
                
                <Button
                  onClick={incrementCount}
                  disabled={count >= (currentAthkar.repetitions || 1)}
                  size="lg"
                  className={`${currentCategory?.color || 'bg-blue-500'} text-white`}
                >
                  Count (+1)
                </Button>
                
                <Button
                  onClick={resetCurrent}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Athkar Info */}
            {(currentAthkar.reference || currentAthkar.benefit) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {currentAthkar.reference && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
                    <span className="font-medium">Reference: </span>
                    <span className="text-blue-600 dark:text-blue-400">{currentAthkar.reference}</span>
                  </div>
                )}
                {currentAthkar.benefit && (
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded">
                    <span className="font-medium">Benefit: </span>
                    <span className="text-green-600 dark:text-green-400">{currentAthkar.benefit}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center gap-3">
            <Button
              onClick={resetAll}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All
            </Button>
            
            <Button
              onClick={() => loadAthkarCategory(selectedCategory)}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              Reload Category
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AthkarCounter;
