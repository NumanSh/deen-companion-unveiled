
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Settings,
  Mic
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceReadingModeProps {
  surahNumber: number;
  surahName: string;
  totalVerses: number;
  onVerseChange: (verse: number) => void;
}

const VoiceReadingMode: React.FC<VoiceReadingModeProps> = ({
  surahNumber,
  surahName,
  totalVerses,
  onVerseChange
}) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [volume, setVolume] = useState([75]);
  const [speed, setSpeed] = useState([1]);
  const [reciter, setReciter] = useState('abdul-basit');
  const [autoScroll, setAutoScroll] = useState(true);

  const reciters = [
    { id: 'abdul-basit', name: 'عبد الباسط عبد الصمد', style: 'مجود' },
    { id: 'mishary', name: 'مشاري راشد العفاسي', style: 'مرتل' },
    { id: 'saad-al-ghamidi', name: 'سعد الغامدي', style: 'مرتل' },
    { id: 'maher-al-muaiqly', name: 'ماهر المعيقلي', style: 'مجود' },
  ];

  useEffect(() => {
    onVerseChange(currentVerse);
  }, [currentVerse, onVerseChange]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? 'تم إيقاف التشغيل' : 'جاري التشغيل',
      description: `سورة ${surahName} - الآية ${currentVerse}`,
    });
  };

  const handleNextVerse = () => {
    if (currentVerse < totalVerses) {
      setCurrentVerse(prev => prev + 1);
    }
  };

  const handlePrevVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(prev => prev - 1);
    }
  };

  const handleVerseJump = (verse: number) => {
    setCurrentVerse(verse);
    toast({
      title: 'انتقال إلى الآية',
      description: `الآية ${verse} من سورة ${surahName}`,
    });
  };

  return (
    <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">تلاوة صوتية</h3>
            <p className="text-emerald-100">سورة {surahName}</p>
          </div>
          <Badge className="bg-white/20 text-white">
            <Mic className="w-3 h-3 mr-1" />
            {reciters.find(r => r.id === reciter)?.name}
          </Badge>
        </div>

        {/* Progress */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span>الآية {currentVerse}</span>
            <span>{totalVerses} / {currentVerse}</span>
          </div>
          <div className="bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(currentVerse / totalVerses) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevVerse}
            disabled={currentVerse === 1}
            className="text-white hover:bg-white/20"
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={handlePlayPause}
            size="lg"
            className="bg-white text-emerald-600 hover:bg-white/90 rounded-full w-14 h-14"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextVerse}
            disabled={currentVerse === totalVerses}
            className="text-white hover:bg-white/20"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume & Speed Controls */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm">الصوت</span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="text-sm">السرعة</span>
            </div>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              min={0.5}
              max={2}
              step={0.25}
              className="w-full"
            />
          </div>
        </div>

        {/* Quick Verse Navigation */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: Math.min(10, totalVerses) }, (_, i) => i + 1).map(verse => (
            <Button
              key={verse}
              variant={verse === currentVerse ? "secondary" : "ghost"}
              size="sm"
              onClick={() => handleVerseJump(verse)}
              className={`text-xs ${verse === currentVerse ? 'bg-white text-emerald-600' : 'text-white hover:bg-white/20'}`}
            >
              {verse}
            </Button>
          ))}
          {totalVerses > 10 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 text-xs"
            >
              ...
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceReadingMode;
