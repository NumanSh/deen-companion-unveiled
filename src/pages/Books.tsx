import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, RotateCcw, Plus, Minus, ScrollText, Heart } from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";
import DuasSection from "@/components/DuasSection";
import HadithSection from "@/components/HadithSection";
import MorningEveningAdhkar from "@/components/MorningEveningAdhkar";
import BookmarkManager from "@/components/BookmarkManager";
import DhikrCounter from "@/components/DhikrCounter";
import { useToast } from "@/hooks/use-toast";

const Books = () => {
  const [dhikrCount, setDhikrCount] = useState(0);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'quran' | 'hadith' | 'duas' | 'adhkar' | 'dhikr' | 'bookmarks'>('quran');
  const [isLoading, setIsLoading] = useState(false);
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
    { key: 'quran', label: 'Quran', icon: Book },
    { key: 'hadith', label: 'Hadith', icon: ScrollText },
    { key: 'duas', label: 'Duas', icon: Book },
    { key: 'adhkar', label: 'Adhkar', icon: Book },
    { key: 'dhikr', label: 'Dhikr', icon: RotateCcw },
    { key: 'bookmarks', label: 'Saved', icon: Heart },
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
    try {
      // Simulate loading/opening surah
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Opening Surah ${surah.name}`);
      toast({
        title: "Opening Surah",
        description: `Loading Surah ${surah.name}...`,
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

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Islamic Books</h1>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
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
                          <h3 className="font-semibold text-lg">{surah.name}</h3>
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
                            {isLoading ? "Loading..." : "Read Surah"}
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
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Books;
