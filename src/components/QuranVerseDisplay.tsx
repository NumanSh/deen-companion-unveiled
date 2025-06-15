
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Heart } from 'lucide-react';

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
  onToggleBookmark
}) => {
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
      {showTranslation && translationAyah && (
        <div
          className="text-left text-gray-600 dark:text-gray-300 italic leading-relaxed"
          style={{ fontSize: `${fontSize - 4}px` }}
        >
          {translationAyah.text}
        </div>
      )}
    </div>
  );
};

export default QuranVerseDisplay;
