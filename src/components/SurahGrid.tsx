import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Heart, ArrowLeft, Copy, Languages, Play, Pause } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useLanguage } from '@/contexts/LanguageContext';

interface Surah {
  number: number;
  name: string;
  meaning: string;
  verses?: string[];
  translations?: string[];
  totalVerses?: number;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const { copyToClipboard } = useCopyToClipboard();

  // Complete list of all 114 Quran surahs
  const allSurahs: Surah[] = [
    { 
      number: 1, 
      name: "Al-Fatihah", 
      meaning: "The Opening",
      totalVerses: 7,
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
        "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        "All praise is due to Allah, Lord of the worlds.",
        "The Entirely Merciful, the Especially Merciful,",
        "Sovereign of the Day of Recompense.",
        "It is You we worship and You we ask for help.",
        "Guide us to the straight path",
        "The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray."
      ]
    },
    { number: 2, name: "Al-Baqarah", meaning: "The Cow", totalVerses: 286 },
    { number: 3, name: "Ali 'Imran", meaning: "Family of Imran", totalVerses: 200 },
    { number: 4, name: "An-Nisa", meaning: "The Women", totalVerses: 176 },
    { number: 5, name: "Al-Ma'idah", meaning: "The Table Spread", totalVerses: 120 },
    { number: 6, name: "Al-An'am", meaning: "The Cattle", totalVerses: 165 },
    { number: 7, name: "Al-A'raf", meaning: "The Heights", totalVerses: 206 },
    { number: 8, name: "Al-Anfal", meaning: "The Spoils of War", totalVerses: 75 },
    { number: 9, name: "At-Tawbah", meaning: "The Repentance", totalVerses: 129 },
    { number: 10, name: "Yunus", meaning: "Jonah", totalVerses: 109 },
    { number: 11, name: "Hud", meaning: "Hud", totalVerses: 123 },
    { number: 12, name: "Yusuf", meaning: "Joseph", totalVerses: 111 },
    { number: 13, name: "Ar-Ra'd", meaning: "The Thunder", totalVerses: 43 },
    { number: 14, name: "Ibrahim", meaning: "Abraham", totalVerses: 52 },
    { number: 15, name: "Al-Hijr", meaning: "The Rocky Tract", totalVerses: 99 },
    { number: 16, name: "An-Nahl", meaning: "The Bee", totalVerses: 128 },
    { number: 17, name: "Al-Isra", meaning: "The Night Journey", totalVerses: 111 },
    { number: 18, name: "Al-Kahf", meaning: "The Cave", totalVerses: 110 },
    { number: 19, name: "Maryam", meaning: "Mary", totalVerses: 98 },
    { number: 20, name: "Taha", meaning: "Ta-Ha", totalVerses: 135 },
    { number: 21, name: "Al-Anbiya", meaning: "The Prophets", totalVerses: 112 },
    { number: 22, name: "Al-Hajj", meaning: "The Pilgrimage", totalVerses: 78 },
    { number: 23, name: "Al-Mu'minun", meaning: "The Believers", totalVerses: 118 },
    { number: 24, name: "An-Nur", meaning: "The Light", totalVerses: 64 },
    { number: 25, name: "Al-Furqan", meaning: "The Criterion", totalVerses: 77 },
    { number: 26, name: "Ash-Shu'ara", meaning: "The Poets", totalVerses: 227 },
    { number: 27, name: "An-Naml", meaning: "The Ant", totalVerses: 93 },
    { number: 28, name: "Al-Qasas", meaning: "The Stories", totalVerses: 88 },
    { number: 29, name: "Al-'Ankabut", meaning: "The Spider", totalVerses: 69 },
    { number: 30, name: "Ar-Rum", meaning: "The Byzantines", totalVerses: 60 },
    { number: 31, name: "Luqman", meaning: "Luqman", totalVerses: 34 },
    { number: 32, name: "As-Sajdah", meaning: "The Prostration", totalVerses: 30 },
    { number: 33, name: "Al-Ahzab", meaning: "The Clans", totalVerses: 73 },
    { number: 34, name: "Saba", meaning: "Sheba", totalVerses: 54 },
    { number: 35, name: "Fatir", meaning: "The Originator", totalVerses: 45 },
    { number: 36, name: "Ya-Sin", meaning: "Ya-Sin", totalVerses: 83 },
    { number: 37, name: "As-Saffat", meaning: "Those Who Set The Ranks", totalVerses: 182 },
    { number: 38, name: "Sad", meaning: "Sad", totalVerses: 88 },
    { number: 39, name: "Az-Zumar", meaning: "The Troops", totalVerses: 75 },
    { number: 40, name: "Ghafir", meaning: "The Forgiver", totalVerses: 85 },
    { number: 41, name: "Fussilat", meaning: "Explained In Detail", totalVerses: 54 },
    { number: 42, name: "Ash-Shuraa", meaning: "The Consultation", totalVerses: 53 },
    { number: 43, name: "Az-Zukhruf", meaning: "The Ornaments Of Gold", totalVerses: 89 },
    { number: 44, name: "Ad-Dukhan", meaning: "The Smoke", totalVerses: 59 },
    { number: 45, name: "Al-Jathiyah", meaning: "The Crouching", totalVerses: 37 },
    { number: 46, name: "Al-Ahqaf", meaning: "The Wind-Curved Sandhills", totalVerses: 35 },
    { number: 47, name: "Muhammad", meaning: "Muhammad", totalVerses: 38 },
    { number: 48, name: "Al-Fath", meaning: "The Victory", totalVerses: 29 },
    { number: 49, name: "Al-Hujurat", meaning: "The Rooms", totalVerses: 18 },
    { number: 50, name: "Qaf", meaning: "Qaf", totalVerses: 45 },
    { number: 51, name: "Adh-Dhariyat", meaning: "The Winnowing Winds", totalVerses: 60 },
    { number: 52, name: "At-Tur", meaning: "The Mount", totalVerses: 49 },
    { number: 53, name: "An-Najm", meaning: "The Star", totalVerses: 62 },
    { number: 54, name: "Al-Qamar", meaning: "The Moon", totalVerses: 55 },
    { number: 55, name: "Ar-Rahman", meaning: "The Beneficent", totalVerses: 78 },
    { number: 56, name: "Al-Waqi'ah", meaning: "The Inevitable", totalVerses: 96 },
    { number: 57, name: "Al-Hadid", meaning: "The Iron", totalVerses: 29 },
    { number: 58, name: "Al-Mujadila", meaning: "The Pleading Woman", totalVerses: 22 },
    { number: 59, name: "Al-Hashr", meaning: "The Exile", totalVerses: 24 },
    { number: 60, name: "Al-Mumtahanah", meaning: "She That Is To Be Examined", totalVerses: 13 },
    { number: 61, name: "As-Saff", meaning: "The Ranks", totalVerses: 14 },
    { number: 62, name: "Al-Jumu'ah", meaning: "The Congregation", totalVerses: 11 },
    { number: 63, name: "Al-Munafiqun", meaning: "The Hypocrites", totalVerses: 11 },
    { number: 64, name: "At-Taghabun", meaning: "The Mutual Disillusion", totalVerses: 18 },
    { number: 65, name: "At-Talaq", meaning: "The Divorce", totalVerses: 12 },
    { number: 66, name: "At-Tahrim", meaning: "The Prohibition", totalVerses: 12 },
    { number: 67, name: "Al-Mulk", meaning: "The Sovereignty", totalVerses: 30 },
    { number: 68, name: "Al-Qalam", meaning: "The Pen", totalVerses: 52 },
    { number: 69, name: "Al-Haqqah", meaning: "The Inevitable", totalVerses: 52 },
    { number: 70, name: "Al-Ma'arij", meaning: "The Ascending Stairways", totalVerses: 44 },
    { number: 71, name: "Nuh", meaning: "Noah", totalVerses: 28 },
    { number: 72, name: "Al-Jinn", meaning: "The Jinn", totalVerses: 28 },
    { number: 73, name: "Al-Muzzammil", meaning: "The Enshrouded One", totalVerses: 20 },
    { number: 74, name: "Al-Muddaththir", meaning: "The Cloaked One", totalVerses: 56 },
    { number: 75, name: "Al-Qiyamah", meaning: "The Resurrection", totalVerses: 40 },
    { number: 76, name: "Al-Insan", meaning: "The Man", totalVerses: 31 },
    { number: 77, name: "Al-Mursalat", meaning: "The Emissaries", totalVerses: 50 },
    { number: 78, name: "An-Naba", meaning: "The Tidings", totalVerses: 40 },
    { number: 79, name: "An-Nazi'at", meaning: "Those Who Drag Forth", totalVerses: 46 },
    { number: 80, name: "Abasa", meaning: "He Frowned", totalVerses: 42 },
    { number: 81, name: "At-Takwir", meaning: "The Overthrowing", totalVerses: 29 },
    { number: 82, name: "Al-Infitar", meaning: "The Cleaving", totalVerses: 19 },
    { number: 83, name: "Al-Mutaffifin", meaning: "The Defrauding", totalVerses: 36 },
    { number: 84, name: "Al-Inshiqaq", meaning: "The Splitting Open", totalVerses: 25 },
    { number: 85, name: "Al-Buruj", meaning: "The Mansions Of The Stars", totalVerses: 22 },
    { number: 86, name: "At-Tariq", meaning: "The Morning Star", totalVerses: 17 },
    { number: 87, name: "Al-A'la", meaning: "The Most High", totalVerses: 19 },
    { number: 88, name: "Al-Ghashiyah", meaning: "The Overwhelming", totalVerses: 26 },
    { number: 89, name: "Al-Fajr", meaning: "The Dawn", totalVerses: 30 },
    { number: 90, name: "Al-Balad", meaning: "The City", totalVerses: 20 },
    { number: 91, name: "Ash-Shams", meaning: "The Sun", totalVerses: 15 },
    { number: 92, name: "Al-Layl", meaning: "The Night", totalVerses: 21 },
    { number: 93, name: "Ad-Duhaa", meaning: "The Morning Hours", totalVerses: 11 },
    { number: 94, name: "Ash-Sharh", meaning: "The Relief", totalVerses: 8 },
    { number: 95, name: "At-Tin", meaning: "The Fig", totalVerses: 8 },
    { number: 96, name: "Al-Alaq", meaning: "The Clot", totalVerses: 19 },
    { number: 97, name: "Al-Qadr", meaning: "The Power", totalVerses: 5 },
    { number: 98, name: "Al-Bayyinah", meaning: "The Clear Proof", totalVerses: 8 },
    { number: 99, name: "Az-Zalzalah", meaning: "The Earthquake", totalVerses: 8 },
    { number: 100, name: "Al-Adiyat", meaning: "The Courser", totalVerses: 11 },
    { number: 101, name: "Al-Qari'ah", meaning: "The Calamity", totalVerses: 11 },
    { number: 102, name: "At-Takathur", meaning: "The Rivalry In World Increase", totalVerses: 8 },
    { number: 103, name: "Al-Asr", meaning: "The Declining Day", totalVerses: 3 },
    { number: 104, name: "Al-Humazah", meaning: "The Traducer", totalVerses: 9 },
    { number: 105, name: "Al-Fil", meaning: "The Elephant", totalVerses: 5 },
    { number: 106, name: "Quraysh", meaning: "Quraysh", totalVerses: 4 },
    { number: 107, name: "Al-Ma'un", meaning: "The Small Kindnesses", totalVerses: 7 },
    { number: 108, name: "Al-Kawthar", meaning: "The Abundance", totalVerses: 3 },
    { number: 109, name: "Al-Kafirun", meaning: "The Disbelievers", totalVerses: 6 },
    { number: 110, name: "An-Nasr", meaning: "The Divine Support", totalVerses: 3 },
    { number: 111, name: "Al-Masad", meaning: "The Palm Fibre", totalVerses: 5 },
    { 
      number: 112, 
      name: "Al-Ikhlas", 
      meaning: "The Sincerity",
      totalVerses: 4,
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "اللَّهُ الصَّمَدُ",
        "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"
      ],
      translations: [
        "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        "Say, He is Allah, the One!",
        "Allah, the Eternal, Absolute;",
        "He begets not, nor is He begotten;",
        "And there is none like unto Him."
      ]
    },
    { 
      number: 113, 
      name: "Al-Falaq", 
      meaning: "The Daybreak",
      totalVerses: 5,
      verses: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        "مِن شَرِّ مَا خَلَقَ",
        "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"
      ],
      translations: [
        "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        "Say: I seek refuge with the Lord of the dawn",
        "From the mischief of created things;",
        "From the mischief of Darkness as it overspreads;",
        "From the mischief of those who practise secret arts;",
        "And from the mischief of the envious one as he practises envy."
      ]
    },
    { 
      number: 114, 
      name: "An-Nas", 
      meaning: "Mankind",
      totalVerses: 6,
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
        "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        "Say: I seek refuge with the Lord and Cherisher of Mankind,",
        "The King (or Ruler) of Mankind,",
        "The God (or judge) of Mankind,-",
        "From the mischief of the Whisperer (of Evil), who withdraws (after his whisper),-",
        "Who whispers into the hearts of Mankind,-",
        "Among Jinns and among men."
      ]
    }
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
    copyToClipboard(textToCopy, 'Verse copied to clipboard');
  };

  const handleCopyFullSurah = (surah: Surah) => {
    if (surah.verses) {
      const fullText = surah.verses.map((verse, index) => {
        const translation = surah.translations?.[index];
        return translation ? `${verse}\n${translation}` : verse;
      }).join('\n\n');
      
      copyToClipboard(
        `Surah ${surah.name} (${surah.meaning})\n\n${fullText}`,
        'Full surah copied to clipboard'
      );
    }
  };

  if (viewMode === 'reading' && selectedSurah) {
    const surah = allSurahs.find(s => s.number === selectedSurah);
    if (surah?.verses) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-emerald-200 p-4 flex items-center justify-between shadow-sm">
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
              <h1 className="text-lg font-bold text-emerald-800">سُورَةُ {surah.name}</h1>
              <p className="text-sm text-emerald-600">{surah.meaning}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTranslation(!showTranslation)}
                className="text-emerald-700 hover:text-emerald-900"
                title="Toggle translation"
              >
                <Languages className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-emerald-700 hover:text-emerald-900"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopyFullSurah(surah)}
                className="text-emerald-700 hover:text-emerald-900"
              >
                <Copy className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddToBookmarks(surah, 'surah')}
                className="text-emerald-700 hover:text-emerald-900"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quran Content - Side by Side Ayat Layout */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-lg border border-emerald-200 p-8">
              {/* Surah Header */}
              <div className="text-center mb-8 pb-6 border-b border-emerald-200">
                <div className="inline-block bg-emerald-100 px-6 py-3 rounded-full border border-emerald-300 shadow-sm">
                  <span className="text-emerald-800 font-semibold text-lg">سُورَةُ {surah.name}</span>
                </div>
                <p className="text-emerald-600 mt-2 text-sm">({surah.meaning})</p>
              </div>

              {/* Verses in Grid Layout - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surah.verses.map((verse, index) => (
                  <div key={index} className="relative group bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-lg p-4 hover:shadow-md transition-all">
                    {/* Verse Number */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {index === 0 ? "۞" : index}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyVerse(verse, surah.translations?.[index])}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Arabic Text */}
                    <div className="mb-4" dir="rtl">
                      <p className="text-right leading-loose text-xl font-arabic text-gray-800" 
                         style={{ 
                           fontFamily: 'Amiri, Scheherazade, Arabic Typesetting, serif',
                           lineHeight: '2'
                         }}>
                        {verse}
                      </p>
                    </div>

                    {/* English Translation */}
                    {showTranslation && surah.translations?.[index] && (
                      <p className="text-gray-600 text-sm leading-relaxed italic border-t border-emerald-100 pt-3">
                        {surah.translations[index]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Surah Info */}
              <div className="text-center mt-8 pt-6 border-t border-emerald-200">
                <div className="inline-block bg-emerald-100 px-4 py-2 rounded-full border border-emerald-300 shadow-sm">
                  <span className="text-emerald-800 font-semibold">Surah {surah.number} • {surah.verses.length} Ayat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5 text-emerald-600" />
          القرآن الكريم - List of Surahs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filter Options */}
        <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <h3 className="font-semibold text-emerald-800 mb-2">Complete Quran Surahs (114 Surahs)</h3>
          <p className="text-sm text-emerald-600">Click on any surah to read its verses • Full Arabic text with English translations</p>
        </div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allSurahs.map((surah) => (
            <div
              key={surah.number}
              className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                selectedSurah === surah.number
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
              }`}
              onClick={() => handleSurahClick(surah)}
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
                  {surah.verses && (
                    <div className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
                      READ
                    </div>
                  )}
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
