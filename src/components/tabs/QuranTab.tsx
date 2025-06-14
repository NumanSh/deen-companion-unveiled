
import React from 'react';
import SurahGrid from '@/components/SurahGrid';

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
      <SurahGrid
        onAddToBookmarks={onAddToBookmarks}
        onSurahRead={onSurahRead}
        readingSurahs={readingSurahs}
        isLoading={isLoading}
      />
    </div>
  );
};

export default QuranTab;
