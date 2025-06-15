
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
import FloatingQuickActions from '@/components/FloatingQuickActions';
import ReadingSessionTimer from '@/components/ReadingSessionTimer';
import EnhancedQuranSearch from '@/components/EnhancedQuranSearch';
import VerseShareCard from '@/components/VerseShareCard';
import { useQuranData } from '@/hooks/useQuranData';
import { useSurahContent } from '@/hooks/useSurahContent';
import QuranWordSearch from '@/components/QuranWordSearch';
import { useToast } from '@/hooks/use-toast';

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
  const [showTranslation, setShowTranslation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showWordSearch, setShowWordSearch] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showEnhancedSearch, setShowEnhancedSearch] = useState(false);
  const [shareVerse, setShareVerse] = useState<any>(null);

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

  const handleQuickBookmark = () => {
    if (selectedSurah) {
      handleAddToBookmarks(selectedSurah);
    } else {
      toast({
        title: 'No Surah Selected',
        description: 'Please select a surah first to bookmark it.',
        variant: 'destructive'
      });
    }
  };

  const handleEnhancedSearch = (term: string) => {
    setSearchTerm(term);
    setShowEnhancedSearch(false);
  };

  // Show word search modal
  if (showWordSearch) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Quran Word Search</h2>
          <Button variant="ghost" onClick={() => setShowWordSearch(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Surahs
          </Button>
        </div>
        <QuranWordSearch />
        <FloatingQuickActions
          onQuickSearch={() => setShowEnhancedSearch(true)}
          onWordSearch={() => setShowWordSearch(false)}
          onAddBookmark={handleQuickBookmark}
          onStartTimer={() => setShowTimer(true)}
        />
      </div>
    );
  }

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
      <>
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
        <FloatingQuickActions
          onQuickSearch={() => setShowEnhancedSearch(true)}
          onWordSearch={() => setShowWordSearch(true)}
          onAddBookmark={handleQuickBookmark}
          onStartTimer={() => setShowTimer(true)}
        />
        {showTimer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <ReadingSessionTimer onClose={() => setShowTimer(false)} />
          </div>
        )}
        {showEnhancedSearch && (
          <EnhancedQuranSearch
            onSearch={handleEnhancedSearch}
            onClose={() => setShowEnhancedSearch(false)}
          />
        )}
        {shareVerse && (
          <VerseShareCard
            verse={shareVerse}
            onClose={() => setShareVerse(null)}
          />
        )}
      </>
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
    <>
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
            onWordSearchClick={() => setShowWordSearch(true)}
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

      {/* Floating Quick Actions */}
      <FloatingQuickActions
        onQuickSearch={() => setShowEnhancedSearch(true)}
        onWordSearch={() => setShowWordSearch(true)}
        onAddBookmark={handleQuickBookmark}
        onStartTimer={() => setShowTimer(true)}
      />

      {/* Modals */}
      {showTimer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <ReadingSessionTimer onClose={() => setShowTimer(false)} />
        </div>
      )}
      
      {showEnhancedSearch && (
        <EnhancedQuranSearch
          onSearch={handleEnhancedSearch}
          onClose={() => setShowEnhancedSearch(false)}
        />
      )}
      
      {shareVerse && (
        <VerseShareCard
          verse={shareVerse}
          onClose={() => setShareVerse(null)}
        />
      )}
    </>
  );
};

export default QuranTab;
