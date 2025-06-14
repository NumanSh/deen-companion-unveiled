
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Settings, Vibrate } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TasbihCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [currentDhikr, setCurrentDhikr] = useState('سُبْحَانَ اللَّهِ');
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const { toast } = useToast();

  const dhikrOptions = [
    { arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'SubhanAllah', meaning: 'Glory be to Allah' },
    { arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', meaning: 'Praise be to Allah' },
    { arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is Greatest' },
    { arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', transliteration: 'La ilaha illa Allah', meaning: 'There is no god but Allah' },
    { arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah' }
  ];

  const vibrate = useCallback(() => {
    if (vibrationEnabled && 'navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, [vibrationEnabled]);

  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    vibrate();

    if (newCount === target) {
      toast({
        title: "🎉 Target Reached!",
        description: `Completed ${target} dhikr. May Allah accept your remembrance.`,
      });
      // Longer vibration for completion
      if (vibrationEnabled && 'navigator' in window && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  };

  const resetCount = () => {
    setCount(0);
    toast({
      title: "Counter Reset",
      description: "Starting fresh with your dhikr counting.",
    });
  };

  const currentDhikrData = dhikrOptions.find(d => d.arabic === currentDhikr) || dhikrOptions[0];
  const progress = (count / target) * 100;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-green-600" />
            Digital Tasbih
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVibrationEnabled(!vibrationEnabled)}
            className={vibrationEnabled ? 'text-green-600' : 'text-gray-400'}
          >
            <Vibrate className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Dhikr Display */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-arabic text-green-800 dark:text-green-200" dir="rtl">
            {currentDhikrData.arabic}
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            {currentDhikrData.transliteration}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {currentDhikrData.meaning}
          </div>
        </div>

        {/* Counter Display */}
        <div className="text-center">
          <div className="text-6xl font-bold text-green-700 dark:text-green-300 mb-2">
            {count}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            of {target}
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Main Counter Button */}
        <div className="flex justify-center">
          <Button
            onClick={incrementCount}
            className="w-32 h-32 rounded-full text-lg font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg"
          >
            Count
          </Button>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={resetCount}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Target:</span>
            <select 
              value={target} 
              onChange={(e) => setTarget(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={33}>33</option>
              <option value={99}>99</option>
              <option value={100}>100</option>
              <option value={1000}>1000</option>
            </select>
          </div>
        </div>

        {/* Dhikr Selection */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Select Dhikr:</div>
          <div className="grid grid-cols-1 gap-1">
            {dhikrOptions.map((dhikr) => (
              <button
                key={dhikr.arabic}
                onClick={() => setCurrentDhikr(dhikr.arabic)}
                className={`p-2 rounded text-sm transition-colors ${
                  currentDhikr === dhikr.arabic
                    ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-arabic text-right" dir="rtl">{dhikr.arabic}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {dhikr.transliteration}
                </div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasbihCounter;
