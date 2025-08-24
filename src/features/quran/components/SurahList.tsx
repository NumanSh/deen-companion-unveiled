
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Heart, Loader2 } from 'lucide-react';

interface Surah {
  number: number;
  name: string;
  meaning: string;
  totalVerses?: number;
}

interface SurahListProps {
  surahs: Surah[];
  readingSurahs: Set<number>;
  loadingApiData: boolean;
  onSurahClick: (surah: Surah) => void;
  onAddToBookmarks: (surah: Surah, type: 'surah') => void;
}

const SurahList: React.FC<SurahListProps> = ({
  surahs,
  readingSurahs,
  loadingApiData,
  onSurahClick,
  onAddToBookmarks
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5 text-emerald-600" />
          القرآن الكريم - List of Surahs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Loading state for API data */}
        {loadingApiData && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <span className="ml-2 text-emerald-600">Loading surah from API...</span>
          </div>
        )}

        {/* Search and Filter Options */}
        <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <h3 className="font-semibold text-emerald-800 mb-2">Complete Quran Surahs (114 Surahs)</h3>
          <p className="text-sm text-emerald-600">Click on any surah to read its verses • Full Arabic text with English translations</p>
        </div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {surahs.map((surah) => (
            <div
              key={surah.number}
              className="p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10"
              onClick={() => onSurahClick(surah)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm font-bold">
                      {surah.number}
                    </div>
                    {readingSurahs.has(surah.number) && (
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" title="Recently read" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
                    {surah.name}
                  </h3>
                  <p className="text-sm text-emerald-600 mb-1">{surah.meaning}</p>
                  <p className="text-xs text-gray-500" dir="rtl">سُورَةُ {surah.name}</p>
                  {surah.totalVerses && (
                    <p className="text-xs text-gray-400 mt-1">{surah.totalVerses} verses</p>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToBookmarks(surah, 'surah');
                    }}
                    className="h-8 w-8"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <div className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {surah.number <= 1 ? 'DEMO' : 'API'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SurahList;
