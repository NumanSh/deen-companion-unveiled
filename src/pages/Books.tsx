
import React, { useState } from "react";
import BottomTabBar from "@/components/BottomTabBar";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import DailyProgress from "@/components/DailyProgress";
import ReadingMode from "@/components/ReadingMode";
import QuickAccessWidget from "@/components/QuickAccessWidget";
import UniversalSearch from "@/components/UniversalSearch";
import MainHeader from "@/components/MainHeader";
import TabNavigation from "@/components/TabNavigation";
import TabContent from "@/components/TabContent";
import { useLanguage } from "@/contexts/LanguageContext";

const Books = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quran' | 'hadith' | 'duas' | 'adhkar' | 'dhikr' | 'bookmarks' | 'analytics' | 'reminders' | 'habits' | 'discover'>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [readingSurahs, setReadingSurahs] = useState<Set<number>>(new Set());
  const [readingModeContent, setReadingModeContent] = useState<any>(null);
  const [showUniversalSearch, setShowUniversalSearch] = useState(false);
  const { toast } = useToast();

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
        title: t('added-to-bookmarks'),
        description: t('item-saved-bookmarks', { title: bookmark.title }),
      });
    } else {
      toast({
        title: t('already-bookmarked'),
        description: t('item-already-bookmarked'),
      });
    }
  };

  const handleSurahRead = async (surah: any) => {
    setIsLoading(true);
    setReadingSurahs(prev => new Set([...prev, surah.number]));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setReadingModeContent({
        title: `${t('surah')} ${surah.name}`,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillahir-Rahmanir-Raheem",
        translation: t('bismillah-translation'),
        audioUrl: undefined
      });
      
      toast({
        title: t('surah-loaded'),
        description: t('surah-ready-reading', { name: surah.name }),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('failed-load-surah'),
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
      title: t('found-result'),
      description: t('navigated-to', { title: result.title }),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <MainHeader onSearchClick={() => setShowUniversalSearch(true)} />
          
          {activeTab === 'dashboard' && <DailyProgress />}
          
          <TabNavigation 
            activeTab={activeTab} 
            onTabChange={(tab) => setActiveTab(tab as any)} 
          />

          <TabContent
            activeTab={activeTab}
            onAddToBookmarks={addToBookmarks}
            onSurahRead={handleSurahRead}
            readingSurahs={readingSurahs}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {readingModeContent && (
        <ReadingMode
          content={readingModeContent}
          onClose={() => setReadingModeContent(null)}
        />
      )}
      
      <UniversalSearch
        isOpen={showUniversalSearch}
        onClose={() => setShowUniversalSearch(false)}
        onResult={handleSearchResult}
      />
      
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
