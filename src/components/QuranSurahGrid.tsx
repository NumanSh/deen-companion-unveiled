
import React from 'react';
import { Button } from '@/components/ui/button';
import { Book, Heart, Play } from 'lucide-react';
import { QuranSurah } from '@/services/quranService';

interface QuranSurahGridProps {
  surahs: QuranSurah[];
  readingSurahs: Set<number>;
  onSurahClick: (surah: QuranSurah) => void;
  onAddToBookmarks: (surah: QuranSurah) => void;
  searchTerm: string;
  onClearSearch: () => void;
}

const QuranSurahGrid: React.FC<QuranSurahGridProps> = ({
  surahs,
  readingSurahs,
  onSurahClick,
  onAddToBookmarks,
  searchTerm,
  onClearSearch
}) => {
  // No results state
  if (surahs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Book className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No surahs found matching your search</p>
        <Button
          variant="outline"
          onClick={onClearSearch}
          className="mt-2"
        >
          Clear Search
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map((surah) => (
        <div
          key={surah.number}
          className="p-4 rounded-lg border transition-all cursor-pointer hover:shadow-lg border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 group"
          onClick={() => onSurahClick(surah)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm font-bold">
                  {surah.number}
                </div>
                {readingSurahs.has(surah.number) && (
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" title="Recently read" />
                )}
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                  {surah.revelationType}
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
                {surah.englishName}
              </h3>
              <p className="text-sm text-emerald-600 mb-1">{surah.englishNameTranslation}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400" dir="rtl">{surah.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{surah.numberOfAyahs} ayahs</p>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToBookmarks(surah);
                }}
                className="h-8 w-8"
              >
                <Heart className="w-4 h-4" />
              </Button>
              <div className="text-xs text-gray-400 text-center">
                <Play className="w-3 h-3 mx-auto mb-1" />
                Audio
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuranSurahGrid;
