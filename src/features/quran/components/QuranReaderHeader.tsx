
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Languages, Heart } from 'lucide-react';

interface QuranReaderHeaderProps {
  arabicSurah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
  };
  readingProgress: number;
  showTranslation: boolean;
  onBack: () => void;
  onToggleTranslation: () => void;
  onAddToBookmarks: () => void;
  onAdjustFontSize: (change: number) => void;
}

const QuranReaderHeader: React.FC<QuranReaderHeaderProps> = ({
  arabicSurah,
  readingProgress,
  showTranslation,
  onBack,
  onToggleTranslation,
  onAddToBookmarks,
  onAdjustFontSize
}) => {
  return (
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
            onClick={() => onAdjustFontSize(-2)}
            title="Decrease font size"
          >
            <span className="text-lg">A-</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAdjustFontSize(2)}
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
  );
};

export default QuranReaderHeader;
