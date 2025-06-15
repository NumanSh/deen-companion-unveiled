
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, Search, Heart, Play, Pause, Languages, ArrowLeft, Loader2, TrendingUp, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchAllSurahs, fetchSurahArabic, fetchSurahTranslation, searchSurahs, QuranSurah } from '@/services/quranService';
import EnhancedQuranReader from '@/components/EnhancedQuranReader';
import AdvancedQuranSearch from '@/components/AdvancedQuranSearch';
import ReadingProgressTracker from '@/components/ReadingProgressTracker';

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
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-emerald-600" />
            <div>
              <h3 className="text-lg font-semibold">Loading Surah...</h3>
              <p className="text-gray-600">Please wait while we fetch the content</p>
            </div>
          </div>
        </CardContent>
      </Card>
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
        {/* Enhanced Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search surahs by name, meaning, or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAdvancedSearch(true)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Advanced Search
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowProgress(true)}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Progress
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {isLoadingSurahs && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <span className="ml-2 text-emerald-600">Loading Quran surahs...</span>
          </div>
        )}

        {/* Enhanced Stats */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">Complete Quran</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                {surahs.length} Surahs • Arabic with English Translation • Audio Recitation
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">{filteredSurahs.length}</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400">Available</div>
            </div>
          </div>
        </div>

        {/* Enhanced Surahs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <div
              key={surah.number}
              className="p-4 rounded-lg border transition-all cursor-pointer hover:shadow-lg border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 group"
              onClick={() => handleSurahClick(surah)}
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
                      handleAddToBookmarks(surah);
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

        {/* No results */}
        {filteredSurahs.length === 0 && !isLoadingSurahs && (
          <div className="text-center py-8 text-gray-500">
            <Book className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No surahs found matching your search</p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              className="mt-2"
            >
              Clear Search
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuranTab;
