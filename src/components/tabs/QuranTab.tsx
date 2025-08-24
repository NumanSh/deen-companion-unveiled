
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ArrowLeft, TrendingUp, Download, WifiOff } from 'lucide-react';
import { QuranSurah } from '@/features/quran';
import { EnhancedQuranReader, ReadingProgressTracker, QuranSearchControls, QuranSurahGrid, QuranStats, QuranLoadingStates, ReadingSessionTimer, EnhancedQuranSearch, VerseShareCard, QuranWordSearch } from '@/features/quran';
import { useQuranData, useSurahContent, useOfflineQuran } from '@/features/quran';
import { useToast } from '@/shared';
import { ErrorBoundary, LazyWrapper, AccessibilityEnhancements, OfflineIndicator, FloatingQuickActions } from '@/shared';
import { LazyAdvancedQuranSearch } from '@/features/quran';
import { validateSearchQuery } from '@/shared';
import { QuranApiErrorHandler } from '@/shared';
import { useOptimizedSearch, usePerformanceMonitoring, useOfflineStatus } from '@/shared';

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
  const { markStart, markEnd } = usePerformanceMonitoring();
  const { isOffline } = useOfflineStatus();
  
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

  const {
    isSurahAvailableOffline,
    downloadSurah,
    isDownloading
  } = useOfflineQuran();

  const handleSurahClick = (surah: QuranSurah) => {
    markStart('surah-load');
    loadSurahContent(surah);
    markEnd('surah-load');
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
    const validation = validateSearchQuery(term, 'mixed');
    if (!validation.isValid) {
      toast({
        title: 'Invalid Search',
        description: validation.error,
        variant: 'destructive'
      });
      return;
    }
    
    setSearchTerm(validation.sanitized!);
    setShowEnhancedSearch(false);
  };

  const handleDownloadForOffline = async (surah: QuranSurah) => {
    if (isOffline) {
      toast({
        title: 'Offline Mode',
        description: 'Cannot download content while offline',
        variant: 'destructive'
      });
      return;
    }
    await downloadSurah(surah);
  };

  // Show word search modal
  if (showWordSearch) {
    return (
      <ErrorBoundary section="Word Search">
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
      </ErrorBoundary>
    );
  }

  // Show advanced search modal
  if (showAdvancedSearch) {
    return (
      <ErrorBoundary section="Advanced Quran Search">
        <LazyWrapper fallback={<QuranLoadingStates type="content" />}>
          <LazyAdvancedQuranSearch
            surahs={surahs}
            onSurahSelect={(surah) => {
              setShowAdvancedSearch(false);
              handleSurahClick(surah);
            }}
            onClose={() => setShowAdvancedSearch(false)}
          />
        </LazyWrapper>
      </ErrorBoundary>
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
        <ErrorBoundary section="Quran Reader">
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
        </ErrorBoundary>
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
          <ErrorBoundary section="Enhanced Search">
            <EnhancedQuranSearch
              onSearch={handleEnhancedSearch}
              onClose={() => setShowEnhancedSearch(false)}
            />
          </ErrorBoundary>
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
      <AccessibilityEnhancements
        onQuickSearch={() => setShowEnhancedSearch(true)}
        onGoToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNextSection={() => {
          const nextSurah = filteredSurahs.find(s => s.number > (selectedSurah?.number || 0));
          if (nextSurah) handleSurahClick(nextSurah);
        }}
        onPrevSection={() => {
          const prevSurahs = filteredSurahs.filter(s => s.number < (selectedSurah?.number || Infinity));
          const prevSurah = prevSurahs[prevSurahs.length - 1];
          if (prevSurah) handleSurahClick(prevSurah);
        }}
      />
      
      {isOffline && (
        <OfflineIndicator 
          className="mb-4" 
          showDetails 
          onDownloadOfflineContent={() => toast({
            title: 'Offline Content',
            description: 'Use the download button on individual surahs to save for offline reading.'
          })}
        />
      )}
      
      <ErrorBoundary section="Quran Tab">
        <Card id="main-content">
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
              onSearchChange={(value) => {
                const validation = validateSearchQuery(value, 'mixed');
                if (validation.isValid) {
                  setSearchTerm(validation.sanitized!);
                }
              }}
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

          {/* Enhanced Surahs Grid with Offline Support */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurahs.map((surah) => {
              const isOfflineAvailable = isSurahAvailableOffline(surah.number);
              const downloading = isDownloading(surah.number);
              
              return (
                <div
                  key={surah.number}
                  className="p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 relative focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2"
                  onClick={() => handleSurahClick(surah)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSurahClick(surah);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Read Surah ${surah.englishName} - ${surah.englishNameTranslation}, ${surah.numberOfAyahs} verses`}
                >
                  {/* Offline Indicator */}
                  {isOfflineAvailable && (
                    <div className="absolute top-2 right-2" title="Available offline">
                      <WifiOff className="w-4 h-4 text-green-600" aria-label="Available offline" />
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm font-bold">
                          {surah.number}
                        </div>
                        {readingSurahs.has(surah.number) && (
                          <span 
                            className="w-2 h-2 bg-emerald-500 rounded-full" 
                            aria-label="Currently reading"
                            title="Currently reading"
                          />
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
                        {surah.englishName}
                      </h3>
                      <p className="text-sm text-emerald-600 mb-1">{surah.englishNameTranslation}</p>
                      <p className="text-xs text-gray-500" dir="rtl" lang="ar">سُورَةُ {surah.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{surah.numberOfAyahs} verses</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                      {!isOfflineAvailable && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadForOffline(surah);
                          }}
                          disabled={downloading || isOffline}
                          className="h-8 w-8"
                          aria-label={`Download ${surah.englishName} for offline reading`}
                          title={isOffline ? 'Cannot download while offline' : 'Download for offline reading'}
                        >
                          {downloading ? (
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {searchTerm && filteredSurahs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No surahs found matching "{searchTerm}"</p>
              <Button variant="outline" onClick={clearSearch}>
                Clear Search
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      </ErrorBoundary>

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
        <ErrorBoundary section="Enhanced Search">
          <EnhancedQuranSearch
            onSearch={handleEnhancedSearch}
            onClose={() => setShowEnhancedSearch(false)}
          />
        </ErrorBoundary>
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
