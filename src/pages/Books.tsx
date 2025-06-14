
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, RotateCcw, Plus, Minus, ScrollText, Heart, Search, BarChart3, Bell, Home, Target, Compass } from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";
import DuasSection from "@/components/DuasSection";
import HadithSection from "@/components/HadithSection";
import MorningEveningAdhkar from "@/components/MorningEveningAdhkar";
import BookmarkManager from "@/components/BookmarkManager";
import DhikrCounter from "@/components/DhikrCounter";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import DailyProgress from "@/components/DailyProgress";
import ReadingMode from "@/components/ReadingMode";
import QuickAccessWidget from "@/components/QuickAccessWidget";
import UniversalSearch from "@/components/UniversalSearch";
import ProgressAnalytics from "@/components/ProgressAnalytics";
import DailyReminders from "@/components/DailyReminders";
import PersonalDashboard from "@/components/PersonalDashboard";
import HabitTracker from "@/components/HabitTracker";
import ContentDiscovery from "@/components/ContentDiscovery";

const Books = () => {
  const [dhikrCount, setDhikrCount] = useState(0);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quran' | 'hadith' | 'duas' | 'adhkar' | 'dhikr' | 'bookmarks' | 'analytics' | 'reminders' | 'habits' | 'discover'>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [readingSurahs, setReadingSurahs] = useState<Set<number>>(new Set());
  const [readingModeContent, setReadingModeContent] = useState<any>(null);
  const [showUniversalSearch, setShowUniversalSearch] = useState(false);
  const { toast } = useToast();

  // Popular Surahs for quick access
  const popularSurahs = [
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

  const resetDhikr = () => setDhikrCount(0);
  const incrementDhikr = () => setDhikrCount(prev => prev + 1);
  const decrementDhikr = () => setDhikrCount(prev => Math.max(0, prev - 1));

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'quran', label: 'Quran', icon: Book },
    { key: 'hadith', label: 'Hadith', icon: ScrollText },
    { key: 'duas', label: 'Duas', icon: Book },
    { key: 'adhkar', label: 'Adhkar', icon: Book },
    { key: 'dhikr', label: 'Dhikr', icon: RotateCcw },
    { key: 'habits', label: 'Habits', icon: Target },
    { key: 'discover', label: 'Discover', icon: Compass },
    { key: 'bookmarks', label: 'Saved', icon: Heart },
    { key: 'analytics', label: 'Progress', icon: BarChart3 },
    { key: 'reminders', label: 'Reminders', icon: Bell },
  ];

  const addToBookmarks = (item: any, type: 'surah' | 'dua' | 'hadith') => {
    const bookmark = {
      id: `${type}-${item.number || item.id || Date.now()}`,
      type,
      title: item.name || item.title,
      subtitle: item.meaning || item.transliteration,
      data: item,
      timestamp: Date.now()
    };

    const saved = localStorage.getItem('islamic-app-bookmarks');
    const bookmarks = saved ? JSON.parse(saved) : [];
    
    if (!bookmarks.find((b: any) => b.id === bookmark.id)) {
      bookmarks.push(bookmark);
      localStorage.setItem('islamic-app-bookmarks', JSON.stringify(bookmarks));
      toast({
        title: "Added to bookmarks",
        description: `${bookmark.title} has been saved to your bookmarks.`,
      });
    } else {
      toast({
        title: "Already bookmarked",
        description: "This item is already in your bookmarks.",
      });
    }
  };

  const handleSurahRead = async (surah: any) => {
    setIsLoading(true);
    setReadingSurahs(prev => new Set([...prev, surah.number]));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setReadingModeContent({
        title: `Surah ${surah.name}`,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillahir-Rahmanir-Raheem",
        translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
        audioUrl: undefined
      });
      
      toast({
        title: "Surah Loaded",
        description: `Surah ${surah.name} is ready for reading.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load the Surah. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAccess = (section: string) => {
    setActiveTab(section as any);
  };

  const handleSearchResult = (result: any) => {
    setShowUniversalSearch(false);
    
    switch (result.type) {
      case 'surah':
        setActiveTab('quran');
        break;
      case 'dua':
        setActiveTab('duas');
        break;
      case 'hadith':
        setActiveTab('hadith');
        break;
      case 'dhikr':
        setActiveTab('dhikr');
        break;
    }
    
    toast({
      title: "Found Result",
      description: `Navigated to ${result.title}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header with Search */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Deen Companion</h1>
            <Button
              variant="outline"
              onClick={() => setShowUniversalSearch(true)}
              className="flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search All
            </Button>
          </div>
          
          {/* Daily Progress - Show at top for Dashboard */}
          {activeTab === 'dashboard' && <DailyProgress />}
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'dashboard' && <PersonalDashboard />}

          {activeTab === 'habits' && <HabitTracker />}

          {activeTab === 'discover' && <ContentDiscovery />}

          {activeTab === 'quran' && (
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
                              addToBookmarks(surah, 'surah');
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
                              handleSurahRead(surah);
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
          )}

          {activeTab === 'hadith' && <HadithSection />}

          {activeTab === 'duas' && <DuasSection />}

          {activeTab === 'adhkar' && <MorningEveningAdhkar />}

          {activeTab === 'dhikr' && <DhikrCounter />}

          {activeTab === 'bookmarks' && <BookmarkManager />}

          {activeTab === 'analytics' && <ProgressAnalytics />}

          {activeTab === 'reminders' && <DailyReminders />}
        </div>
      </div>
      
      {/* Reading Mode Modal */}
      {readingModeContent && (
        <ReadingMode
          content={readingModeContent}
          onClose={() => setReadingModeContent(null)}
        />
      )}
      
      {/* Universal Search Modal */}
      <UniversalSearch
        isOpen={showUniversalSearch}
        onClose={() => setShowUniversalSearch(false)}
        onResult={handleSearchResult}
      />
      
      {/* Quick Access Widget */}
      <QuickAccessWidget
        onDhikr={() => handleQuickAccess('dhikr')}
        onBookmarks={() => handleQuickAccess('bookmarks')}
        onQuran={() => handleQuickAccess('quran')}
        onDuas={() => handleQuickAccess('duas')}
      />
      
      <BottomTabBar />
    </div>
  );
};

export default Books;
