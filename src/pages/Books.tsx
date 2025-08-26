
import React, { useState, useEffect } from 'react';
import { BottomTabBar } from '@/layout';
import { TabNavigation, TabContent } from '@/layout';
import { EnhancedOnboarding, FloatingHelpSystem, EnhancedSearchExperience } from '@/shared';
import { SmartNotificationSystem } from '@/features/learning';
import { IslamicHabitBuilder, IslamicHabitVisualization, IslamicBookLibrary } from '@/features/tracking';
import { Card } from '@/components/ui/card';
import { BookOpen, Heart, Search, Star, Target, BarChart3, Library } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedFloatingActionsSystem, InteractiveIslamicAchievements } from '@/shared';
// import { AdvancedReadingAnalyticsDashboard } from '@/features/learning';

const Books = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('quran');
  const [readingSurahs, setReadingSurahs] = useState<Set<number>>(new Set());

  // Initialize activeTab from localStorage or URL params
  useEffect(() => {
    const storedTab = localStorage.getItem('selected-tab');
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get('tab');
    
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    } else if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Update URL without triggering navigation
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.replaceState({}, '', url);
  };

  const handleAddToBookmarks = (item: any, type: 'surah' | 'dua' | 'hadith') => {
    try {
      const bookmark = {
        id: `${type}-${item.id || item.number || Date.now()}`,
        type,
        title: item.title || item.englishName || item.name,
        subtitle: item.subtitle || item.englishNameTranslation || item.transliteration,
        data: item,
        timestamp: Date.now()
      };

      const saved = localStorage.getItem('islamic-app-bookmarks');
      const bookmarks = saved ? JSON.parse(saved) : [];
      
      const existingIndex = bookmarks.findIndex((b: any) => b.id === bookmark.id);
      
      if (existingIndex === -1) {
        bookmarks.push(bookmark);
        toast({
          title: 'Added to Bookmarks',
          description: `${bookmark.title} saved to your bookmarks`,
        });
      } else {
        bookmarks.splice(existingIndex, 1);
        toast({
          title: 'Removed from Bookmarks',
          description: `${bookmark.title} removed from bookmarks`,
        });
      }
      
      localStorage.setItem('islamic-app-bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error managing bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to update bookmarks',
        variant: 'destructive'
      });
    }
  };

  const handleSurahRead = (surah: any) => {
    setReadingSurahs(prev => {
      const newSet = new Set(prev);
      newSet.add(surah.number || surah.id);
      
      // Store in localStorage for persistence
      try {
        const readingData = Array.from(newSet);
        localStorage.setItem('reading-surahs', JSON.stringify(readingData));
      } catch (error) {
        console.error('Error saving reading progress:', error);
      }
      
      return newSet;
    });
  };

  // Load reading progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('reading-surahs');
      if (saved) {
        const readingData = JSON.parse(saved);
        setReadingSurahs(new Set(readingData));
      }
    } catch (error) {
      console.error('Error loading reading progress:', error);
    }
  }, []);

  const renderHabitsContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-600" />
            بناء العادات الإسلامية
          </h2>
          <IslamicHabitBuilder />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            تصور التقدم
          </h2>
          <IslamicHabitVisualization />
        </div>
      </div>
    </div>
  );

  const renderAchievementsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-600" />
        نظام الإنجازات التفاعلي
      </h2>
      <InteractiveIslamicAchievements />
    </div>
  );

  const renderAnalyticsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        تحليلات القراءة المتقدمة
      </h2>
      <div>Analytics dashboard coming soon</div>
    </div>
  );

  const renderIslamicLibraryContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Library className="w-6 h-6 text-emerald-600" />
        المكتبة الإسلامية الرقمية
      </h2>
      <IslamicBookLibrary />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20 relative overflow-hidden">
      {/* Enhanced Onboarding */}
      <EnhancedOnboarding />

      {/* Smart Notification System */}
      <SmartNotificationSystem />

      {/* Enhanced Search Experience */}
      <EnhancedSearchExperience />

      {/* Floating Help System */}
      <FloatingHelpSystem />

      {/* Enhanced Floating Actions System */}
      <EnhancedFloatingActionsSystem />

      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern id="islamic-pattern-books" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
              <path d="M20,12 L28,20 L20,28 L12,20 Z" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-books)"/>
        </svg>
      </div>

      <div className="flex-1 px-4 md:px-6 lg:px-8 py-6 relative">
        <div className="w-full max-w-[1400px] mx-auto space-y-6">
          {/* Enhanced Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="relative inline-flex items-center gap-3">
              <div className="relative">
                <BookOpen className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                <Star className="w-4 h-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 via-blue-700 to-purple-700 dark:from-emerald-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Islamic Library
              </h1>
              <div className="relative">
                <Heart className="w-10 h-10 text-rose-500 dark:text-rose-400" />
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </div>
            <p className="text-xl text-emerald-700 dark:text-emerald-300 font-medium">
              Explore the Quran, Hadith, Duas, Islamic knowledge with live API integration & habit tracking
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live API</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>114 Surahs</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>Habit Tracking</span>
              </div>
              <div className="flex items-center gap-1">
                <Search className="w-4 h-4" />
                <span>Advanced Search</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{readingSurahs.size} Reading</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </Card>

          {/* Tab Content */}
          {activeTab === 'habits' ? (
            renderHabitsContent()
          ) : activeTab === 'achievements' ? (
            renderAchievementsContent()
          ) : activeTab === 'analytics' ? (
            renderAnalyticsContent()
          ) : activeTab === 'islamic-library' ? (
            renderIslamicLibraryContent()
          ) : (
            <TabContent 
              activeTab={activeTab} 
              onAddToBookmarks={handleAddToBookmarks}
              onSurahRead={handleSurahRead}
              readingSurahs={readingSurahs}
              isLoading={false}
            />
          )}
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Books;
