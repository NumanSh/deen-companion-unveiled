
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Heart, ArrowLeft, Copy, Languages } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useLanguage } from '@/contexts/LanguageContext';

interface Surah {
  number: number;
  name: string;
  meaning: string;
  verses?: string[];
  translations?: string[];
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
  const { t } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'reading'>('list');
  const [showTranslation, setShowTranslation] = useState(true);
  const { copyToClipboard } = useCopyToClipboard();

  const popularSurahs: Surah[] = [
    { 
      number: 1, 
      name: "Al-Fatihah", 
      meaning: t('the-opening'),
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "الرَّحْمَٰنِ الرَّحِيمِ",
        "مَالِكِ يَوْمِ الدِّينِ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
      ],
      translations: [
        t('bismillah-translation'),
        t('alhamdulillah-translation'),
        t('rahman-rahim-translation'),
        t('malik-yawm-translation'),
        t('iyyaka-nabudu-translation'),
        t('ihdina-sirat-translation'),
        t('sirat-alladhina-translation')
      ]
    },
    { 
      number: 112, 
      name: "Al-Ikhlas", 
      meaning: t('the-sincerity'),
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "اللَّهُ الصَّمَدُ",
        "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"
      ],
      translations: [
        t('bismillah-translation'),
        t('qul-huwa-allah-translation'),
        t('allah-samad-translation'),
        t('lam-yalid-translation'),
        t('walam-yakun-translation')
      ]
    },
    { 
      number: 113, 
      name: "Al-Falaq", 
      meaning: t('the-daybreak'),
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        "مِن شَرِّ مَا خَلَقَ",
        "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"
      ],
      translations: [
        t('bismillah-translation'),
        t('qul-auzu-birabb-falaq'),
        t('min-sharri-ma-khalaq'),
        t('min-sharri-ghasiq'),
        t('min-sharri-naffathat'),
        t('min-sharri-hasid')
      ]
    },
    { 
      number: 114, 
      name: "An-Nas", 
      meaning: t('mankind'),
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        "مَلِكِ النَّاسِ",
        "إِلَٰهِ النَّاسِ",
        "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        "مِنَ الْجِنَّةِ وَالنَّاسِ"
      ],
      translations: [
        t('bismillah-translation'),
        t('qul-auzu-birabb-nas'),
        t('maliki-nas'),
        t('ilahi-nas'),
        t('min-sharri-waswas'),
        t('alladhi-yuwaswis'),
        t('min-jinnati-wanas')
      ]
    },
    { number: 2, name: "Al-Baqarah", meaning: t('the-cow') },
    { number: 18, name: "Al-Kahf", meaning: t('the-cave') },
    { number: 36, name: "Ya-Sin", meaning: "Ya-Sin" },
    { number: 55, name: "Ar-Rahman", meaning: t('the-beneficent') },
    { number: 67, name: "Al-Mulk", meaning: t('the-sovereignty') },
  ];

  const handleSurahClick = (surah: Surah) => {
    if (surah.verses) {
      setSelectedSurah(surah.number);
      setViewMode('reading');
    } else {
      onSurahRead(surah);
    }
  };

  const handleCopyVerse = (arabic: string, translation?: string) => {
    const textToCopy = translation 
      ? `${arabic}\n\n${translation}`
      : arabic;
    copyToClipboard(textToCopy, t('verse-copied-clipboard'));
  };

  const handleCopyFullSurah = (surah: Surah) => {
    if (surah.verses) {
      const fullText = surah.verses.map((verse, index) => {
        const translation = surah.translations?.[index];
        return translation ? `${verse}\n${translation}` : verse;
      }).join('\n\n');
      
      copyToClipboard(
        `${t('surah')} ${surah.name} (${surah.meaning})\n\n${fullText}`,
        t('full-surah-copied-clipboard')
      );
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
              {t('back-to-surahs')}
            </Button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold text-amber-800">سُورَةُ {surah.name}</h1>
              <p className="text-sm text-amber-600">{surah.meaning}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTranslation(!showTranslation)}
                className="text-amber-700 hover:text-amber-900"
                title={t('toggle-translation')}
              >
                <Languages className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopyFullSurah(surah)}
                className="text-amber-700 hover:text-amber-900"
              >
                <Copy className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddToBookmarks(surah, 'surah')}
                className="text-amber-700 hover:text-amber-900"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
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
              <div className="space-y-6">
                {surah.verses.map((verse, index) => (
                  <div key={index} className="relative group">
                    {/* Arabic Text */}
                    <div className="flex items-start justify-between mb-3" dir="rtl">
                      <p className="text-right leading-loose text-2xl font-arabic text-gray-800 flex-1" 
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyVerse(verse, surah.translations?.[index])}
                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 h-8 w-8"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* English Translation */}
                    {showTranslation && surah.translations?.[index] && (
                      <p className="text-gray-600 text-base leading-relaxed mb-4 italic">
                        {surah.translations[index]}
                      </p>
                    )}

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
                  <span className="text-amber-800 font-semibold">{t('surah')} {surah.number}</span>
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
          {t('quran-karim')} - {t('popular-surahs')}
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
                      <span className="w-2 h-2 bg-green-500 rounded-full" title={t('recently-read')} />
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
