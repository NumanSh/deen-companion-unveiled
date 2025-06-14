
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Heart } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface Surah {
  number: number;
  name: string;
  meaning: string;
}

interface SurahGridProps {
  onAddToBookmarks: (item: any, type: 'surah' | 'dua' | 'hadith') => void;
  onSurahRead: (surah: Surah) => void;
  readingSurahs: Set<number>;
  isLoading: boolean;
}

const SurahGrid: React.FC<SurahGridProps> = ({ 
  onAddToBookmarks, 
  onSurahRead, 
  readingSurahs, 
  isLoading 
}) => {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

  const popularSurahs: Surah[] = [
    { number: 1, name: "Al-Fatihah", meaning: "The Opening" },
    { number: 2, name: "Al-Baqarah", meaning: "The Cow" },
    { number: 18, name: "Al-Kahf", meaning: "The Cave" },
    { number: 36, name: "Ya-Sin", meaning: "Ya-Sin" },
    { number: 55, name: "Ar-Rahman", meaning: "The Beneficent" },
    { number: 67, name: "Al-Mulk", meaning: "The Sovereignty" },
    { number: 112, name: "Al-Ikhlas", meaning: "The Sincerity" },
    { number: 113, name: "Al-Falaq", meaning: "The Daybreak" },
    { number: 114, name: "An-Nas", meaning: "Mankind" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5 text-green-600" />
          Quran - Popular Surahs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularSurahs.map((surah) => (
            <div
              key={surah.number}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedSurah === surah.number
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:hover:bg-green-900/10'
              }`}
              onClick={() => setSelectedSurah(selectedSurah === surah.number ? null : surah.number)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {surah.name}
                    {readingSurahs.has(surah.number) && (
                      <span className="w-2 h-2 bg-green-500 rounded-full" title="Recently read" />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{surah.meaning}</p>
                </div>
                <div className="flex items-center gap-2">
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
                  <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
                    {surah.number}
                  </div>
                </div>
              </div>
              
              {selectedSurah === surah.number && (
                <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                    Click below to read Surah {surah.name}
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSurahRead(surah);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Loading...
                      </>
                    ) : (
                      "Read Surah"
                    )}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SurahGrid;
