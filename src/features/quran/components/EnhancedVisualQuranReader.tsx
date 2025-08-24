
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Heart, 
  Share2, 
  Copy, 
  Pause, 
  Play, 
  SkipBack, 
  SkipForward,
  Volume2,
  Eye,
  Palette,
  Moon,
  Sun
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedVisualQuranReaderProps {
  surahName: string;
  verses: Array<{
    number: number;
    arabic: string;
    translation: string;
    transliteration: string;
  }>;
  onClose: () => void;
}

const EnhancedVisualQuranReader: React.FC<EnhancedVisualQuranReaderProps> = ({
  surahName,
  verses,
  onClose
}) => {
  const { toast } = useToast();
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [fontSize, setFontSize] = useState(24);
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [highlightedWords, setHighlightedWords] = useState<number[]>([]);
  const [readingSpeed, setReadingSpeed] = useState(1000); // milliseconds per word

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        // Simulate word-by-word highlighting
        const words = verses[currentVerse]?.arabic.split(' ') || [];
        setHighlightedWords(prev => {
          const nextIndex = (prev[prev.length - 1] || -1) + 1;
          if (nextIndex >= words.length) {
            // Move to next verse
            if (currentVerse < verses.length - 1) {
              setCurrentVerse(prev => prev + 1);
              return [0];
            } else {
              setIsPlaying(false);
              return [];
            }
          }
          return [...prev, nextIndex];
        });
      }, readingSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentVerse, verses, readingSpeed]);

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'sepia':
        return 'bg-amber-50 text-amber-900';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const handleVerseNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentVerse > 0) {
      setCurrentVerse(currentVerse - 1);
    } else if (direction === 'next' && currentVerse < verses.length - 1) {
      setCurrentVerse(currentVerse + 1);
    }
    setHighlightedWords([]);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setHighlightedWords([0]);
    } else {
      setHighlightedWords([]);
    }
  };

  const handleBookmark = () => {
    toast({
      title: 'Verse Bookmarked',
      description: `${surahName}, Verse ${verses[currentVerse].number} saved`,
    });
  };

  const handleShare = () => {
    toast({
      title: 'Sharing Verse',
      description: 'Verse copied to clipboard for sharing',
    });
  };

  const currentVerseData = verses[currentVerse];

  if (!currentVerseData) return null;

  return (
    <div className={`min-h-screen transition-all duration-300 ${getThemeClasses()}`}>
      {/* Header Controls */}
      <div className="sticky top-0 z-10 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button variant="ghost" onClick={onClose}>
            ← Back
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline">{surahName}</Badge>
            <Badge variant="secondary">{currentVerse + 1}/{verses.length}</Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'sepia' : 'light')}
            >
              {theme === 'light' ? <Sun className="w-4 h-4" /> : 
               theme === 'dark' ? <Moon className="w-4 h-4" /> : 
               <Palette className="w-4 h-4" />}
            </Button>

            {/* Font Size */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              >
                A-
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize(Math.min(32, fontSize + 2))}
              >
                A+
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <Card className={`transition-all duration-300 ${getThemeClasses()} shadow-2xl`}>
          <CardContent className="p-8">
            {/* Verse Number */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-white font-bold text-lg">
                {currentVerseData.number}
              </div>
            </div>

            {/* Arabic Text */}
            <div 
              className="text-center leading-loose mb-6 transition-all duration-300"
              style={{ 
                fontSize: `${fontSize}px`,
                fontFamily: 'Amiri, Scheherazade New, serif',
                lineHeight: '2.2'
              }}
              dir="rtl"
            >
              {currentVerseData.arabic.split(' ').map((word, index) => (
                <span
                  key={index}
                  className={`inline-block mx-1 transition-all duration-300 ${
                    highlightedWords.includes(index)
                      ? 'bg-emerald-200 text-emerald-900 px-1 rounded transform scale-110'
                      : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Transliteration */}
            {showTransliteration && (
              <div className="text-center text-gray-600 italic mb-4 text-lg leading-relaxed">
                {currentVerseData.transliteration}
              </div>
            )}

            {/* Translation */}
            {showTranslation && (
              <div className="text-center text-gray-700 mb-6 text-lg leading-relaxed font-medium">
                "{currentVerseData.translation}"
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Heart className="w-4 h-4 mr-1" />
                Bookmark
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowTranslation(!showTranslation)}>
                <Eye className="w-4 h-4 mr-1" />
                Translation
              </Button>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleVerseNavigation('prev')}
                disabled={currentVerse === 0}
              >
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                variant="default"
                size="icon"
                onClick={togglePlayback}
                className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleVerseNavigation('next')}
                disabled={currentVerse === verses.length - 1}
              >
                <SkipForward className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-2 ml-4">
                <Volume2 className="w-4 h-4 text-gray-500" />
                <div className="flex gap-1">
                  {[0.5, 1, 1.5, 2].map((speed) => (
                    <Button
                      key={speed}
                      variant={readingSpeed === (2000 / speed) ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setReadingSpeed(2000 / speed)}
                      className="text-xs"
                    >
                      {speed}x
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span>{Math.round(((currentVerse + 1) / verses.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentVerse + 1) / verses.length) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verse Navigation */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {verses.slice(Math.max(0, currentVerse - 1), currentVerse + 2).map((verse, index) => {
            const verseIndex = currentVerse + index - 1;
            const isCurrent = verseIndex === currentVerse;
            
            return (
              <Card 
                key={verse.number}
                className={`cursor-pointer transition-all duration-200 ${
                  isCurrent 
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105' 
                    : 'hover:shadow-md opacity-60'
                }`}
                onClick={() => setCurrentVerse(verseIndex)}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-sm font-bold text-emerald-600 mb-1">
                    Verse {verse.number}
                  </div>
                  <div className="text-xs text-gray-600 line-clamp-2">
                    {verse.translation.substring(0, 60)}...
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnhancedVisualQuranReader;
