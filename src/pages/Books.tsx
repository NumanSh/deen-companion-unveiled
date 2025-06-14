
import React, { useState } from 'react';
import BottomTabBar from '@/components/BottomTabBar';
import TabNavigation from '@/components/TabNavigation';
import TabContent from '@/components/TabContent';
import { Card } from '@/components/ui/card';
import { BookOpen, Heart, Search, Star } from 'lucide-react';

const Books = () => {
  const [activeTab, setActiveTab] = useState('quran');
  const [readingSurahs, setReadingSurahs] = useState<number[]>([]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddToBookmarks = (surahNumber: number) => {
    // Add bookmark functionality
    console.log('Adding to bookmarks:', surahNumber);
  };

  const handleSurahRead = (surahNumber: number) => {
    setReadingSurahs(prev => 
      prev.includes(surahNumber) 
        ? prev.filter(id => id !== surahNumber)
        : [...prev, surahNumber]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20 relative overflow-hidden">
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

      <div className="flex-1 px-4 py-6 relative">
        <div className="max-w-4xl mx-auto space-y-6">
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
              Explore the Quran, Hadith, Duas, and Islamic knowledge
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>Holy Quran</span>
              </div>
              <div className="flex items-center gap-1">
                <Search className="w-4 h-4" />
                <span>Advanced Search</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>Duas & Dhikr</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </Card>

          {/* Tab Content */}
          <TabContent 
            activeTab={activeTab} 
            onAddToBookmarks={handleAddToBookmarks}
            onSurahRead={handleSurahRead}
            readingSurahs={readingSurahs}
            isLoading={false}
          />
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Books;
