
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Languages, Play, Pause, Copy, Heart } from 'lucide-react';

interface QuranReaderTraditionalHeaderProps {
  arabicSurah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
  };
  onBack: () => void;
  onToggleTranslation: () => void;
  onTogglePlay: () => void;
  onCopyFullSurah: () => void;
  onAddToBookmarks: () => void;
  isPlaying: boolean;
}

const QuranReaderTraditionalHeader: React.FC<QuranReaderTraditionalHeaderProps> = ({
  arabicSurah,
  onBack,
  onToggleTranslation,
  onTogglePlay,
  onCopyFullSurah,
  onAddToBookmarks,
  isPlaying
}) => {
  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-teal-200 p-4 flex items-center justify-between shadow-sm">
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
        <h1 className="text-lg font-bold text-teal-800">سُورَةُ {arabicSurah.name}</h1>
        <p className="text-sm text-teal-600">{arabicSurah.englishNameTranslation}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTranslation}
          className="text-teal-700 hover:text-teal-900"
          title="Toggle translation"
        >
          <Languages className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onTogglePlay}
          className="text-teal-700 hover:text-teal-900"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCopyFullSurah}
          className="text-teal-700 hover:text-teal-900"
        >
          <Copy className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddToBookmarks}
          className="text-teal-700 hover:text-teal-900"
        >
          <Heart className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default QuranReaderTraditionalHeader;
