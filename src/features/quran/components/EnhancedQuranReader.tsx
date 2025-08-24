
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCopyToClipboard, useToast } from '@/shared';
import { AudioPlayer, QuranReaderHeader, QuranVerseDisplay, QuranReaderFooter } from '@/features/quran';
import { LayoutGrid, Rows } from 'lucide-react';

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
  const [layoutMode, setLayoutMode] = useState<'continuous' | 'separate'>('continuous');

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
    
    if (arabicVerse) {
      const text = `${arabicVerse.text}\n\n- سورة ${arabicSurah.name}، الآية ${verseNumber}`;
      
      copyToClipboard(text, `تم نسخ الآية ${verseNumber}`);
    }
  };

  const toggleVerseBookmark = (verseNumber: number) => {
    const newBookmarks = bookmarkedVerses.includes(verseNumber)
      ? bookmarkedVerses.filter(v => v !== verseNumber)
      : [...bookmarkedVerses, verseNumber];
    
    setBookmarkedVerses(newBookmarks);
    localStorage.setItem(`bookmarked-verses-${arabicSurah.number}`, JSON.stringify(newBookmarks));
    
    toast({
      title: bookmarkedVerses.includes(verseNumber) ? 'تمت إزالة المرجعية' : 'تمت إضافة المرجعية',
      description: `الآية ${verseNumber} ${bookmarkedVerses.includes(verseNumber) ? 'تم حذفها من' : 'تمت إضافتها إلى'} المرجعيات`,
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
          title={`سورة ${arabicSurah.name}`}
          onPlay={onTogglePlay}
          onPause={onTogglePlay}
        />
      </div>

      {/* Layout Toggle */}
      <div className="max-w-4xl mx-auto px-6 pb-4">
        <div className="flex justify-center gap-2">
          <Button
            variant={layoutMode === 'continuous' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLayoutMode('continuous')}
            className="flex items-center gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            Traditional Flow
          </Button>
          <Button
            variant={layoutMode === 'separate' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLayoutMode('separate')}
            className="flex items-center gap-2"
          >
            <Rows className="w-4 h-4" />
            Separate Verses
          </Button>
        </div>
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
            {layoutMode === 'continuous' ? (
              /* Continuous Flow Layout */
              <div dir="rtl">
                <div className="leading-loose text-justify mb-6" 
                     style={{ 
                       fontFamily: 'Amiri, Scheherazade New, Arabic Typesetting, serif',
                       fontSize: `${fontSize + 2}px`,
                       lineHeight: '2.5',
                       textAlign: 'justify'
                     }}>
                  
                  {/* Continuous Arabic text with verse markers */}
                  <p className="text-gray-800 dark:text-gray-200">
                    {arabicSurah.ayahs.map((ayah, index) => (
                      <span key={ayah.numberInSurah} className="inline">
                        {ayah.text}
                        {/* Verse number in decorative circle */}
                        <span 
                          className={`inline-flex items-center justify-center w-7 h-7 mx-2 text-xs font-bold text-white rounded-full border-2 border-teal-600 cursor-pointer transition-all hover:scale-110 ${
                            currentVerse === ayah.numberInSurah ? 'bg-red-500 border-red-600' : ''
                          } ${
                            bookmarkedVerses.includes(ayah.numberInSurah) ? 'ring-2 ring-yellow-400' : ''
                          }`}
                          style={{ 
                            background: currentVerse === ayah.numberInSurah 
                              ? 'radial-gradient(circle, #ef4444 0%, #dc2626 100%)'
                              : 'radial-gradient(circle, #14b8a6 0%, #0d9488 100%)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            fontSize: '11px',
                            verticalAlign: 'middle'
                          }}
                          onClick={() => setCurrentVerse(ayah.numberInSurah)}
                        >
                          {ayah.numberInSurah}
                          <span className="absolute inset-0 rounded-full border border-white opacity-50"></span>
                        </span>
                        {index < arabicSurah.ayahs.length - 1 && ' '}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Translation in continuous mode */}
                {showTranslation && (
                  <div className="mt-8 pt-6 border-t-2 border-teal-200">
                    <h3 className="text-lg font-semibold text-teal-800 mb-4 text-center" dir="ltr">
                      English Translation
                    </h3>
                    <div className="space-y-3" dir="ltr">
                      {translationSurah.ayahs.map((ayah) => (
                        <p key={ayah.numberInSurah} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-xs font-bold text-white bg-teal-500 rounded-full">
                            {ayah.numberInSurah}
                          </span>
                          {ayah.text}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Separate Verses Layout */
              <div className="space-y-8">
                {arabicSurah.ayahs.map((ayah) => (
                  <QuranVerseDisplay
                    key={ayah.numberInSurah}
                    ayah={ayah}
                    translationAyah={undefined}
                    showTranslation={showTranslation}
                    fontSize={fontSize}
                    isCurrent={currentVerse === ayah.numberInSurah}
                    isBookmarked={bookmarkedVerses.includes(ayah.numberInSurah)}
                    onVerseClick={() => setCurrentVerse(ayah.numberInSurah)}
                    onCopyVerse={() => handleCopyVerse(ayah.numberInSurah)}
                    onToggleBookmark={() => toggleVerseBookmark(ayah.numberInSurah)}
                    surahNumber={arabicSurah.number}
                  />
                ))}
              </div>
            )}
          </CardContent>

          {/* Decorative Footer */}
          <QuranReaderFooter arabicSurah={arabicSurah} />
        </Card>
      </div>
    </div>
  );
};

export default EnhancedQuranReader;
