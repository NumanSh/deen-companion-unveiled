
import React from 'react';
import QuranicVerseOfDay from '@/components/QuranicVerseOfDay';
import DigitalMushafReader from '@/components/DigitalMushafReader';
import QuranTranslationComparison from '@/components/QuranTranslationComparison';
import DigitalTafsirReader from '@/components/DigitalTafsirReader';
import TafsirComparisonTool from '@/components/TafsirComparisonTool';
import QuranVerseContextExplorer from '@/components/QuranVerseContextExplorer';
import SurahGrid from '@/components/SurahGrid';
import QuranMemorizationTracker from '@/components/QuranMemorizationTracker';
import QuranicWordLearning from '@/components/QuranicWordLearning';
import DailyVerseReflection from '@/components/DailyVerseReflection';
import AsmaUlHusna from '@/components/AsmaUlHusna';

interface QuranTabProps {
  onAddToBookmarks: (item: any, type: 'surah' | 'dua' | 'hadith') => void;
  onSurahRead: (surah: any) => void;
  readingSurahs: Set<number>;
  isLoading: boolean;
}

const QuranTab: React.FC<QuranTabProps> = ({
  onAddToBookmarks,
  onSurahRead,
  readingSurahs,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <QuranicVerseOfDay />
      <DigitalMushafReader />
      <QuranTranslationComparison />
      <DigitalTafsirReader />
      <TafsirComparisonTool />
      <QuranVerseContextExplorer />
      <SurahGrid
        onAddToBookmarks={onAddToBookmarks}
        onSurahRead={onSurahRead}
        readingSurahs={readingSurahs}
        isLoading={isLoading}
      />
      <QuranMemorizationTracker />
      <QuranicWordLearning />
      <DailyVerseReflection />
      <AsmaUlHusna />
    </div>
  );
};

export default QuranTab;
