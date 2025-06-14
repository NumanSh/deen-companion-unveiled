
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Heart, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface Surah {
  number: number;
  name: string;
  meaning: string;
  verses?: string[];
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
  const [viewMode, setViewMode] = useState<'list' | 'reading'>('list');

  const popularSurahs: Surah[] = [
    { 
      number: 1, 
      name: "Al-Fatihah", 
      meaning: "The Opening",
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "الرَّحْمَٰنِ الرَّحِيمِ",
        "مَالِكِ يَوْمِ الدِّينِ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
      ]
    },
    { 
      number: 112, 
      name: "Al-Ikhlas", 
      meaning: "The Sincerity",
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "اللَّهُ الصَّمَدُ",
        "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"
      ]
    },
    { 
      number: 113, 
      name: "Al-Falaq", 
      meaning: "The Daybreak",
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        "مِن شَرِّ مَا خَلَقَ",
        "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"
      ]
    },
    { 
      number: 114, 
      name: "An-Nas", 
      meaning: "Mankind",
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        "مَلِكِ النَّاسِ",
        "إِلَٰهِ النَّاسِ",
        "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        "مِنَ الْجِنَّةِ وَالنَّاسِ"
      ]
    },
    { number: 2, name: "Al-Baqarah", meaning: "The Cow" },
    { number: 18, name: "Al-Kahf", meaning: "The Cave" },
    { number: 36, name: "Ya-Sin", meaning: "Ya-Sin" },
    { number: 55, name: "Ar-Rahman", meaning: "The Beneficent" },
    { number: 67, name: "Al-Mulk", meaning: "The Sovereignty" },
  ];

  const handleSurahClick = (surah: Surah) => {
    if (surah.verses) {
      setSelectedSurah(surah.number);
      setViewMode('reading');
    } else {
      onSurahRead(surah);
    }
  };

  if (viewMode === 'reading' && selectedSurah) {
    const surah = popularSurahs.find(s => s.number === selectedSurah);
    if (surah?.verses) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-amber-200 p-4 flex items-center justify-between shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Surahs
            </Button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold text-amber-800">سُورَةُ {surah.name}</h1>
              <p className="text-sm text-amber-600">{surah.meaning}</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onAddToBookmarks(surah, 'surah')}
              className="text-amber-700 hover:text-amber-900"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          {/* Decorative Border */}
          <div className="h-4 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 border-y border-amber-400 shadow-inner"></div>

          {/* Quran Content */}
          <div className="max-w-2xl mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-lg border border-amber-200 p-8">
              {/* Surah Header */}
              <div className="text-center mb-8 pb-6 border-b border-amber-200">
                <div className="inline-block bg-amber-100 px-6 py-3 rounded-full border border-amber-300 shadow-sm">
                  <span className="text-amber-800 font-semibold text-lg">سُورَةُ {surah.name}</span>
                </div>
                <p className="text-amber-600 mt-2 text-sm">({surah.meaning})</p>
              </div>

              {/* Verses */}
              <div className="space-y-6" dir="rtl">
                {surah.verses.map((verse, index) => (
                  <div key={index} className="relative">
                    <p className="text-right leading-loose text-2xl font-arabic text-gray-800 mb-3" 
                       style={{ 
                         fontFamily: 'Amiri, Scheherazade, Arabic Typesetting, serif',
                         lineHeight: '2.2'
                       }}>
                      {verse}
                      {index > 0 && (
                        <span className="inline-block mx-2 bg-amber-200 text-amber-800 text-sm px-2 py-1 rounded-full border border-amber-300 shadow-sm">
                          {index}
                        </span>
                      )}
                    </p>
                    {index < surah.verses.length - 1 && (
                      <div className="flex justify-center my-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Surah Number */}
              <div className="text-center mt-8 pt-6 border-t border-amber-200">
                <div className="inline-block bg-amber-100 px-4 py-2 rounded-full border border-amber-300 shadow-sm">
                  <span className="text-amber-800 font-semibold">Surah {surah.number}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Border */}
          <div className="h-4 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 border-y border-amber-400 shadow-inner"></div>
        </div>
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5 text-green-600" />
          القرآن الكريم - Popular Surahs
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
              onClick={() => handleSurahClick(surah)}
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
                  <p className="text-xs text-green-600 mt-1">سُورَةُ {surah.name}</p>
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SurahGrid;
