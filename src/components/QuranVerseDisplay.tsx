
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Heart, Loader2, Share2 } from 'lucide-react';
import { useTafsir } from '@/hooks/useTafsir';

interface QuranVerseDisplayProps {
  ayah: {
    number: number;
    text: string;
    numberInSurah: number;
  };
  translationAyah?: {
    number: number;
    text: string;
    numberInSurah: number;
  };
  showTranslation: boolean;
  fontSize: number;
  isCurrent: boolean;
  isBookmarked: boolean;
  onVerseClick: () => void;
  onCopyVerse: () => void;
  onToggleBookmark: () => void;
  onShareVerse?: (verse: any) => void;
  surahNumber: number;
  surahName?: string;
}

const QuranVerseDisplay: React.FC<QuranVerseDisplayProps> = ({
  ayah,
  translationAyah,
  showTranslation,
  fontSize,
  isCurrent,
  isBookmarked,
  onVerseClick,
  onCopyVerse,
  onToggleBookmark,
  onShareVerse,
  surahNumber,
  surahName = 'Unknown'
}) => {
  // Fetch tafsir from API
  const { tafsir, isLoading: tafsirLoading, error: tafsirError } = useTafsir(
    surahNumber, 
    ayah.numberInSurah, 
    showTranslation
  );

  const handleShare = () => {
    if (onShareVerse) {
      onShareVerse({
        text: ayah.text,
        number: ayah.numberInSurah,
        surahName,
        surahNumber,
        translation: translationAyah?.text
      });
    }
  };

  return (
    <div
      className={`relative p-4 rounded-lg transition-all ${
        isCurrent 
          ? 'bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-300 dark:border-teal-600' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
      }`}
      onClick={onVerseClick}
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
              onToggleBookmark();
            }}
            className={isBookmarked ? 'text-red-500' : 'text-gray-400'}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="text-gray-500 hover:text-blue-600"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onCopyVerse();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
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

      {/* Arabic Tafsir from API */}
      {showTranslation && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-r-4 border-emerald-400">
          <h4 className="text-emerald-700 dark:text-emerald-300 font-semibold mb-2 text-right" dir="rtl">
            تفسير الآية
          </h4>
          <div
            className="text-right text-emerald-800 dark:text-emerald-200 leading-relaxed"
            style={{ fontSize: `${fontSize - 2}px` }}
            dir="rtl"
          >
            {tafsirLoading ? (
              <div className="flex items-center justify-center gap-2 py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">جارٍ تحميل التفسير...</span>
              </div>
            ) : tafsirError ? (
              <div className="text-red-600 dark:text-red-400 text-sm">
                عذراً، لم نتمكن من تحميل التفسير
              </div>
            ) : (
              tafsir
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranVerseDisplay;
