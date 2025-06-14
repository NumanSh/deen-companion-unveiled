
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchSurahWithTranslation } from '@/services/quranApi';
import SurahList from '@/components/SurahList';
import QuranReader from '@/components/QuranReader';

interface Surah {
  number: number;
  name: string;
  meaning: string;
  verses?: string[];
  translations?: string[];
  totalVerses?: number;
}

interface ApiSurahData {
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
  const [showTranslation, setShowTranslation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [apiSurahData, setApiSurahData] = useState<{ arabic: ApiSurahData; translation: ApiSurahData } | null>(null);
  const [loadingApiData, setLoadingApiData] = useState(false);
  const { toast } = useToast();

  // Complete list of all 114 Quran surahs
  const allSurahs: Surah[] = [
    { number: 1, name: "Al-Fatihah", meaning: "The Opening", totalVerses: 7 },
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
    { number: 112, name: "Al-Ikhlas", meaning: "The Sincerity", totalVerses: 4 },
    { number: 113, name: "Al-Falaq", meaning: "The Daybreak", totalVerses: 5 },
    { number: 114, name: "An-Nas", meaning: "Mankind", totalVerses: 6 }
  ];

  const handleSurahClick = async (surah: Surah) => {
    console.log(`Clicked on surah ${surah.number}: ${surah.name}`);
    setLoadingApiData(true);
    
    try {
      const data = await fetchSurahWithTranslation(surah.number);
      console.log('Successfully loaded surah data:', data);
      setApiSurahData(data);
      setSelectedSurah(surah.number);
      setViewMode('reading');
      toast({
        title: 'Surah Loaded',
        description: `${data.arabic.englishName} loaded from Quran API`,
      });
    } catch (error) {
      console.error('Failed to load surah:', error);
      toast({
        title: 'Connection Error',
        description: `Failed to load ${surah.name}. Please check your internet connection and try again.`,
        variant: 'destructive',
      });
    } finally {
      setLoadingApiData(false);
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setApiSurahData(null);
    setSelectedSurah(null);
  };

  const handleAddToBookmarks = () => {
    if (apiSurahData) {
      onAddToBookmarks(apiSurahData.arabic, 'surah');
    }
  };

  // Render Quran Reader if in reading mode
  if (viewMode === 'reading' && selectedSurah && apiSurahData) {
    return (
      <QuranReader
        arabicSurah={apiSurahData.arabic}
        translationSurah={apiSurahData.translation}
        showTranslation={showTranslation}
        onToggleTranslation={() => setShowTranslation(!showTranslation)}
        onBack={handleBackToList}
        onAddToBookmarks={handleAddToBookmarks}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      />
    );
  }

  // Render Surah List
  return (
    <SurahList
      surahs={allSurahs}
      readingSurahs={readingSurahs}
      loadingApiData={loadingApiData}
      onSurahClick={handleSurahClick}
      onAddToBookmarks={onAddToBookmarks}
    />
  );
};

export default SurahGrid;
