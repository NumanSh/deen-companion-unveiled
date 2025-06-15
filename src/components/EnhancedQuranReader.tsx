
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Copy, Languages, Play, Pause, Heart, Settings, BookOpen, Volume2 } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useToast } from '@/hooks/use-toast';
import AudioPlayer from '@/components/AudioPlayer';

interface EnhancedQuranReaderProps {
  arabicSurah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    ayahs: Array<{
      number: number;
      text: string;
      numberInSurah: number;
    }>;
  };
  translationSurah: {
    ayahs: Array<{
      number: number;
      text: string;
      numberInSurah: number;
    }>;
  };
  showTranslation: boolean;
  onToggleTranslation: () => void;
  onBack: () => void;
  onAddToBookmarks: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const EnhancedQuranReader: React.FC<EnhancedQuranReaderProps> = ({
  arabicSurah,
  translationSurah,
  showTranslation,
  onToggleTranslation,
  onBack,
  onAddToBookmarks,
  isPlaying,
  onTogglePlay
}) => {
  const { copyToClipboard } = useCopyToClipboard();
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState(20);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [readingProgress, setReadingProgress] = useState(0);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([]);

  // Load bookmarked verses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`bookmarked-verses-${arabicSurah.number}`);
    if (saved) {
      setBookmarkedVerses(JSON.parse(saved));
    }
  }, [arabicSurah.number]);

  // Save reading progress
  useEffect(() => {
    const progress = (currentVerse / arabicSurah.numberOfAyahs) * 100;
    setReadingProgress(progress);
    
    // Save progress to localStorage
    localStorage.setItem(`reading-progress-${arabicSurah.number}`, JSON.stringify({
      currentVerse,
      progress,
      timestamp: Date.now()
    }));
  }, [currentVerse, arabicSurah.number, arabicSurah.numberOfAyahs]);

  const handleCopyVerse = (verseNumber: number) => {
    const arabicVerse = arabicSurah.ayahs.find(ayah => ayah.numberInSurah === verseNumber);
    const translationVerse = translationSurah.ayahs.find(ayah => ayah.numberInSurah === verseNumber);
    
    if (arabicVerse) {
      const text = translationVerse 
        ? `${arabicVerse.text}\n\n${translationVerse.text}\n\n- Surah ${arabicSurah.englishName}, Verse ${verseNumber}`
        : `${arabicVerse.text}\n\n- Surah ${arabicSurah.englishName}, Verse ${verseNumber}`;
      
      copyToClipboard(text, `Verse ${verseNumber} copied to clipboard`);
    }
  };

  const toggleVerseBookmark = (verseNumber: number) => {
    const newBookmarks = bookmarkedVerses.includes(verseNumber)
      ? bookmarkedVerses.filter(v => v !== verseNumber)
      : [...bookmarkedVerses, verseNumber];
    
    setBookmarkedVerses(newBookmarks);
    localStorage.setItem(`bookmarked-verses-${arabicSurah.number}`, JSON.stringify(newBookmarks));
    
    toast({
      title: bookmarkedVerses.includes(verseNumber) ? 'Bookmark Removed' : 'Verse Bookmarked',
      description: `Verse ${verseNumber} ${bookmarkedVerses.includes(verseNumber) ? 'removed from' : 'added to'} bookmarks`,
    });
  };

  const adjustFontSize = (change: number) => {
    const newSize = Math.max(14, Math.min(32, fontSize + change));
    setFontSize(newSize);
    localStorage.setItem('quran-font-size', newSize.toString());
  };

  // Get audio URL for current surah (placeholder for now)
  const getAudioUrl = () => {
    // This would typically come from an audio API like Quranicaudio.com
    return `https://server8.mp3quran.net/afs/${arabicSurah.number.toString().padStart(3, '0')}.mp3`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced Header */}
      <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-teal-200 dark:border-gray-600 p-4 shadow-lg z-10">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Surahs
          </Button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-teal-800 dark:text-teal-200" dir="rtl">
              سُورَةُ {arabicSurah.name}
            </h1>
            <p className="text-sm text-teal-600 dark:text-teal-400">{arabicSurah.englishNameTranslation}</p>
            <div className="text-xs text-gray-500 mt-1">
              {arabicSurah.numberOfAyahs} verses • {Math.round(readingProgress)}% complete
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => adjustFontSize(-2)}
              title="Decrease font size"
            >
              <span className="text-lg">A-</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => adjustFontSize(2)}
              title="Increase font size"
            >
              <span className="text-lg">A+</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTranslation}
              className={showTranslation ? "bg-teal-100 dark:bg-teal-800" : ""}
              title="Toggle translation"
            >
              <Languages className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onAddToBookmarks}
              className="text-teal-700 hover:text-teal-900 dark:text-teal-300"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-teal-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-teal-600 dark:bg-teal-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Audio Player */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <AudioPlayer
          audioUrl={getAudioUrl()}
          title={`Surah ${arabicSurah.englishName}`}
          onPlay={onTogglePlay}
          onPause={onTogglePlay}
        />
      </div>

      {/* Enhanced Quran Content */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-teal-300 dark:border-teal-700 shadow-2xl">
          
          {/* Decorative Header */}
          <div className="text-center py-6 border-b-4 border-teal-400 dark:border-teal-600 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-lg">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-1" dir="rtl">سُورَةُ {arabicSurah.name}</h2>
              <p className="text-teal-100 text-sm">{arabicSurah.englishNameTranslation}</p>
              <p className="text-teal-200 text-xs mt-1">{arabicSurah.numberOfAyahs} آیات</p>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Verses */}
            <div className="space-y-8">
              {arabicSurah.ayahs.map((ayah, index) => {
                const isBookmarked = bookmarkedVerses.includes(ayah.numberInSurah);
                const isCurrent = currentVerse === ayah.numberInSurah;
                
                return (
                  <div
                    key={ayah.numberInSurah}
                    className={`relative p-4 rounded-lg transition-all ${
                      isCurrent 
                        ? 'bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-300 dark:border-teal-600' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    onClick={() => setCurrentVerse(ayah.numberInSurah)}
                  >
                    {/* Verse Controls */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                          {ayah.numberInSurah}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVerseBookmark(ayah.numberInSurah);
                          }}
                          className={isBookmarked ? 'text-red-500' : 'text-gray-400'}
                        >
                          <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyVerse(ayah.numberInSurah);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Arabic Text */}
                    <div
                      className="text-right leading-loose mb-4 text-gray-800 dark:text-gray-200"
                      style={{ 
                        fontSize: `${fontSize}px`,
                        fontFamily: 'Amiri, Scheherazade New, Arabic Typesetting, serif',
                        lineHeight: '2.2'
                      }}
                      dir="rtl"
                    >
                      {ayah.text}
                    </div>

                    {/* Translation */}
                    {showTranslation && translationSurah.ayahs[index] && (
                      <div
                        className="text-left text-gray-600 dark:text-gray-300 italic leading-relaxed"
                        style={{ fontSize: `${fontSize - 4}px` }}
                      >
                        {translationSurah.ayahs[index].text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>

          {/* Decorative Footer */}
          <div className="text-center py-4 border-t-4 border-teal-400 dark:border-teal-600 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-b-lg">
            <p className="text-white text-sm">
              صدق الله العظيم • {arabicSurah.englishName} • Page {arabicSurah.number}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedQuranReader;
