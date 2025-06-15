
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ArrowLeft, TrendingUp } from 'lucide-react';
import { QuranSurah } from '@/services/quranService';
import EnhancedQuranReader from '@/components/EnhancedQuranReader';
import AdvancedQuranSearch from '@/components/AdvancedQuranSearch';
import ReadingProgressTracker from '@/components/ReadingProgressTracker';
import QuranSearchControls from '@/components/QuranSearchControls';
import QuranSurahGrid from '@/components/QuranSurahGrid';
import QuranStats from '@/components/QuranStats';
import QuranLoadingStates from '@/components/QuranLoadingStates';
import { useQuranData } from '@/hooks/useQuranData';
import { useSurahContent } from '@/hooks/useSurahContent';

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
  const [showTranslation, setShowTranslation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  // Custom hooks for data management
  const {
    surahs,
    filteredSurahs,
    searchTerm,
    setSearchTerm,
    isLoading: isLoadingSurahs,
    clearSearch
  } = useQuranData();

  const {
    selectedSurah,
    arabicSurah,
    translationSurah,
    isLoading: isLoadingSurahContent,
    loadSurahContent,
    resetSurahContent
  } = useSurahContent(onSurahRead);

  const handleSurahClick = (surah: QuranSurah) => {
    loadSurahContent(surah);
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
    resetSurahContent();
    setIsPlaying(false);
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
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
