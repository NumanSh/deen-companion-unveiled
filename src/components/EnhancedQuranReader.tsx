
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useToast } from '@/hooks/use-toast';
import AudioPlayer from '@/components/AudioPlayer';
import QuranReaderHeader from '@/components/QuranReaderHeader';
import QuranVerseDisplay from '@/components/QuranVerseDisplay';
import QuranReaderFooter from '@/components/QuranReaderFooter';

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
      <QuranReaderHeader
        arabicSurah={arabicSurah}
        readingProgress={readingProgress}
        showTranslation={showTranslation}
        onBack={onBack}
        onToggleTranslation={onToggleTranslation}
        onAddToBookmarks={onAddToBookmarks}
        onAdjustFontSize={adjustFontSize}
      />

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
              {arabicSurah.ayahs.map((ayah, index) => (
                <QuranVerseDisplay
                  key={ayah.numberInSurah}
                  ayah={ayah}
                  translationAyah={translationSurah.ayahs[index]}
                  showTranslation={showTranslation}
                  fontSize={fontSize}
                  isCurrent={currentVerse === ayah.numberInSurah}
                  isBookmarked={bookmarkedVerses.includes(ayah.numberInSurah)}
                  onVerseClick={() => setCurrentVerse(ayah.numberInSurah)}
                  onCopyVerse={() => handleCopyVerse(ayah.numberInSurah)}
                  onToggleBookmark={() => toggleVerseBookmark(ayah.numberInSurah)}
                />
              ))}
            </div>
          </CardContent>

          {/* Decorative Footer */}
          <QuranReaderFooter arabicSurah={arabicSurah} />
        </Card>
      </div>
    </div>
  );
};

export default EnhancedQuranReader;
