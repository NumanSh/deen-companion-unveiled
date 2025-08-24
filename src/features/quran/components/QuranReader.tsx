
import React from 'react';
import { useCopyToClipboard } from '@/shared';
import QuranReaderTraditionalHeader from '@/features/quran/components/QuranReaderTraditionalHeader';
import QuranReaderTraditionalContent from '@/features/quran/components/QuranReaderTraditionalContent';

interface QuranReaderProps {
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

const QuranReader: React.FC<QuranReaderProps> = ({
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

  const handleCopyFullSurah = () => {
    const fullText = arabicSurah.ayahs.map((ayah, index) => {
      const translation = translationSurah.ayahs[index]?.text;
      return translation ? `${ayah.text}\n${translation}` : ayah.text;
    }).join('\n\n');
    
    copyToClipboard(
      `Surah ${arabicSurah.englishName} (${arabicSurah.englishNameTranslation})\n\n${fullText}`,
      'Full surah copied to clipboard'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100">
      {/* Header */}
      <QuranReaderTraditionalHeader
        arabicSurah={arabicSurah}
        onBack={onBack}
        onToggleTranslation={onToggleTranslation}
        onTogglePlay={onTogglePlay}
        onCopyFullSurah={handleCopyFullSurah}
        onAddToBookmarks={onAddToBookmarks}
        isPlaying={isPlaying}
      />

      {/* Traditional Quran Page Layout */}
      <QuranReaderTraditionalContent
        arabicSurah={arabicSurah}
        translationSurah={translationSurah}
        showTranslation={showTranslation}
      />
    </div>
  );
};

export default QuranReader;
