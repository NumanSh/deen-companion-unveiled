
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ArrowLeft, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchAllSurahs, fetchSurahArabic, fetchSurahTranslation, searchSurahs, QuranSurah } from '@/services/quranService';
import EnhancedQuranReader from '@/components/EnhancedQuranReader';
import AdvancedQuranSearch from '@/components/AdvancedQuranSearch';
import ReadingProgressTracker from '@/components/ReadingProgressTracker';
import QuranSearchControls from '@/components/QuranSearchControls';
import QuranSurahGrid from '@/components/QuranSurahGrid';
import QuranStats from '@/components/QuranStats';
import QuranLoadingStates from '@/components/QuranLoadingStates';

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
  isLoading: parentLoading
}) => {
  const { toast } = useToast();
  const [surahs, setSurahs] = useState<QuranSurah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<QuranSurah[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingSurahs, setIsLoadingSurahs] = useState(true);
  const [selectedSurah, setSelectedSurah] = useState<QuranSurah | null>(null);
  const [arabicSurah, setArabicSurah] = useState<QuranSurah | null>(null);
  const [translationSurah, setTranslationSurah] = useState<QuranSurah | null>(null);
  const [isLoadingSurahContent, setIsLoadingSurahContent] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  // Load all surahs on component mount
  useEffect(() => {
    const loadSurahs = async () => {
      try {
        setIsLoadingSurahs(true);
        const surahsData = await fetchAllSurahs();
        setSurahs(surahsData);
        setFilteredSurahs(surahsData);
        console.log('Loaded surahs:', surahsData.length);
      } catch (error) {
        console.error('Failed to load surahs:', error);
        toast({
          title: 'Error Loading Surahs',
          description: 'Failed to load Quran data. Using offline content.',
          variant: 'destructive'
        });
      } finally {
        setIsLoadingSurahs(false);
      }
    };

    loadSurahs();
  }, [toast]);

  // Filter surahs based on search term
  useEffect(() => {
    setFilteredSurahs(searchSurahs(surahs, searchTerm));
  }, [searchTerm, surahs]);

  const handleSurahClick = async (surah: QuranSurah) => {
    try {
      setIsLoadingSurahContent(true);
      setSelectedSurah(surah);
      
      console.log(`Loading surah ${surah.number}: ${surah.englishName}`);
      
      // Record reading session start
      const sessionStart = Date.now();
      
      // Fetch both Arabic and translation concurrently
      const [arabicData, translationData] = await Promise.all([
        fetchSurahArabic(surah.number),
        fetchSurahTranslation(surah.number, 'en.asad')
      ]);
      
      setArabicSurah(arabicData);
      setTranslationSurah(translationData);
      onSurahRead(surah);
      
      // Record reading session
      const session = {
        surahNumber: surah.number,
        surahName: surah.englishName,
        versesRead: 0,
        totalVerses: surah.numberOfAyahs,
        date: new Date().toISOString().split('T')[0],
        duration: Math.round((Date.now() - sessionStart) / 1000 / 60),
        completed: false
      };
      
      const savedSessions = localStorage.getItem('quran-reading-sessions');
      const sessions = savedSessions ? JSON.parse(savedSessions) : [];
      sessions.push(session);
      localStorage.setItem('quran-reading-sessions', JSON.stringify(sessions));
      
      toast({
        title: 'Surah Loaded',
        description: `${surah.englishName} is ready to read`,
      });
    } catch (error) {
      console.error('Error loading surah:', error);
      toast({
        title: 'Error Loading Surah',
        description: 'Failed to load surah content. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingSurahContent(false);
    }
  };

  const handleAddToBookmarks = (surah: QuranSurah) => {
    onAddToBookmarks({
      id: surah.number,
      title: surah.englishName,
      subtitle: surah.englishNameTranslation,
      data: surah
    }, 'surah');
  };

  const handleBackToList = () => {
    setSelectedSurah(null);
    setArabicSurah(null);
    setTranslationSurah(null);
    setIsPlaying(false);
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? 'Audio Paused' : 'Audio Playing',
      description: `${selectedSurah?.englishName} recitation`,
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Show advanced search modal
  if (showAdvancedSearch) {
    return (
      <AdvancedQuranSearch
        surahs={surahs}
        onSurahSelect={(surah) => {
          setShowAdvancedSearch(false);
          handleSurahClick(surah);
        }}
        onClose={() => setShowAdvancedSearch(false)}
      />
    );
  }

  // Show progress tracker
  if (showProgress) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Reading Progress
            </CardTitle>
            <Button variant="ghost" onClick={() => setShowProgress(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Surahs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ReadingProgressTracker
            surahs={surahs}
            onSurahSelect={(surah) => {
              setShowProgress(false);
              handleSurahClick(surah);
            }}
          />
        </CardContent>
      </Card>
    );
  }

  // Show enhanced surah reader if a surah is selected and both surahs have ayahs
  if (selectedSurah && arabicSurah && translationSurah && arabicSurah.ayahs && translationSurah.ayahs) {
    // Type assertion to satisfy QuranReader's requirements
    const arabicSurahWithAyahs = arabicSurah as QuranSurah & { 
      ayahs: Array<{ number: number; text: string; numberInSurah: number; }> 
    };
    const translationSurahWithAyahs = translationSurah as QuranSurah & { 
      ayahs: Array<{ number: number; text: string; numberInSurah: number; }> 
    };

    return (
      <EnhancedQuranReader
        arabicSurah={arabicSurahWithAyahs}
        translationSurah={translationSurahWithAyahs}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
        onBack={handleBackToList}
        onAddToBookmarks={() => handleAddToBookmarks(selectedSurah)}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      />
    );
  }

  // Show loading state for surah content
  if (isLoadingSurahContent) {
    return (
      <QuranLoadingStates 
        type="content" 
        selectedSurahName={selectedSurah?.englishName} 
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5 text-emerald-600" />
          القرآن الكريم - Holy Quran
        </CardTitle>
        <p className="text-sm text-gray-600">Read and explore the complete Quran with translations and audio</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Controls */}
        <QuranSearchControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAdvancedSearchClick={() => setShowAdvancedSearch(true)}
          onProgressClick={() => setShowProgress(true)}
        />

        {/* Loading state */}
        {isLoadingSurahs && <QuranLoadingStates type="surahs" />}

        {/* Stats */}
        <QuranStats 
          totalSurahs={surahs.length}
          filteredSurahs={filteredSurahs.length}
        />

        {/* Surahs Grid */}
        <QuranSurahGrid
          surahs={filteredSurahs}
          readingSurahs={readingSurahs}
          onSurahClick={handleSurahClick}
          onAddToBookmarks={handleAddToBookmarks}
          searchTerm={searchTerm}
          onClearSearch={clearSearch}
        />
      </CardContent>
    </Card>
  );
};

export default QuranTab;
