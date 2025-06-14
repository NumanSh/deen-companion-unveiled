
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, RotateCcw, Target, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DhikrCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('dhikr-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setCount(settings.count || 0);
      setTarget(settings.target || 33);
      setSoundEnabled(settings.soundEnabled ?? true);
      setVibrationEnabled(settings.vibrationEnabled ?? true);
    }
  }, []);

  const saveSettings = (newCount: number) => {
    const settings = {
      count: newCount,
      target,
      soundEnabled,
      vibrationEnabled
    };
    localStorage.setItem('dhikr-settings', JSON.stringify(settings));
  };

  const playClickSound = () => {
    if (soundEnabled) {
      // Create a subtle click sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const triggerVibration = () => {
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    saveSettings(newCount);
    playClickSound();
    triggerVibration();

    if (newCount === target) {
      toast({
        title: "Target Reached! 🎉",
        description: `Mashallah! You've completed ${target} dhikr.`,
      });
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100, 50, 100]);
      }
    }
  };

  const decrement = () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    saveSettings(newCount);
    playClickSound();
  };

  const reset = () => {
    setCount(0);
    saveSettings(0);
    toast({
      title: "Counter Reset",
      description: "Dhikr counter has been reset to 0.",
    });
  };

  const progress = Math.min((count / target) * 100, 100);

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-purple-900 dark:text-purple-100">
            Dhikr Counter
          </CardTitle>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-purple-700 dark:text-purple-300">
              <Target className="w-4 h-4" />
              Target: {target}
            </div>
            <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2 mt-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-7xl font-bold text-purple-800 dark:text-purple-200">
            {count}
          </div>
          
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={decrement}
              className="h-14 w-14 rounded-full"
              disabled={count === 0}
            >
              <Minus className="h-6 w-6" />
            </Button>
            
            <Button
              onClick={increment}
              size="lg"
              className="h-20 w-32 text-xl bg-purple-600 hover:bg-purple-700 rounded-full"
            >
              <Plus className="h-8 w-8 mr-2" />
              Count
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={reset}
              className="h-14 w-14 rounded-full"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                const settings = { count, target, soundEnabled: !soundEnabled, vibrationEnabled };
                localStorage.setItem('dhikr-settings', JSON.stringify(settings));
              }}
              className="text-purple-600"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>

          <p className="text-purple-700 dark:text-purple-300 text-sm">
            {count < target 
              ? `${target - count} more to reach your target`
              : "Target achieved! Keep going! 🎉"
            }
          </p>
        </CardContent>
      </Card>

      {/* Target Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[33, 99, 100, 300, 500, 1000].map((targetOption) => (
              <Button
                key={targetOption}
                variant={target === targetOption ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setTarget(targetOption);
                  const settings = { count, target: targetOption, soundEnabled, vibrationEnabled };
                  localStorage.setItem('dhikr-settings', JSON.stringify(settings));
                }}
              >
                {targetOption}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DhikrCounter;
