
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search, ChevronDown, ChevronUp, Star, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchHadithCollections } from "@/services/hadithApi";
import { useToast } from "@/hooks/use-toast";

type Hadith = {
  id: string;
  collection: string;
  book: string;
  hadithNumber: string;
  arabic: string;
  english: string;
  narrator: string;
  reference: string;
  category: string;
};

const HadithSection: React.FC = () => {
  const { toast } = useToast();
  const [expandedHadith, setExpandedHadith] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [hadithCollections, setHadithCollections] = useState<Hadith[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const collections = ['All', 'Sahih Bukhari', 'Sahih Muslim', 'Sunan Abu Dawud', 'Jami\' At-Tirmidhi', 'Sunan Ibn Majah', 'At-Tabarani'];

  // Load hadiths from API
  useEffect(() => {
    const loadHadiths = async () => {
      setIsLoading(true);
      try {
        console.log('Loading hadith collections from API...');
        const collections = await fetchHadithCollections();
        setHadithCollections(collections);
        console.log('Loaded hadith collections:', collections.length);
        
        if (collections.length > 0) {
          toast({
            title: '📖 تم تحميل الأحاديث',
            description: `تم تحميل ${collections.length} حديث من المصادر الموثوقة`,
          });
        }
      } catch (error) {
        console.error('Failed to load hadith collections:', error);
        toast({
          title: 'خطأ في التحميل',
          description: 'فشل في تحميل الأحاديث من الخادم',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadHadiths();
  }, [toast]);

  const refreshHadiths = async () => {
    setIsLoading(true);
    try {
      const freshCollections = await fetchHadithCollections();
      setHadithCollections(freshCollections);
      setSearchTerm('');
      setSelectedCollection('All');
      
      toast({
        title: 'تم التحديث',
        description: 'تم تحميل أحاديث جديدة من الخادم',
      });
    } catch (error) {
      console.error('Refresh failed:', error);
      toast({
        title: 'خطأ في التحديث',
        description: 'فشل في تحديث الأحاديث',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (hadithId: string) => {
    setFavorites(prev => 
      prev.includes(hadithId) 
        ? prev.filter(id => id !== hadithId)
        : [...prev, hadithId]
    );
  };

  const toggleExpanded = (hadithId: string) => {
    setExpandedHadith(expandedHadith === hadithId ? null : hadithId);
  };

  const filteredHadith = hadithCollections.filter(hadith => {
    const matchesSearch = hadith.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hadith.arabic.includes(searchTerm) ||
                         hadith.narrator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hadith.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollection = selectedCollection === 'All' || hadith.collection === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  return (
    <div className="relative">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
        </svg>
      </div>

      <Card className="relative backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-emerald-200 dark:border-emerald-800 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border-b border-emerald-100 dark:border-emerald-800">
          <CardTitle className="flex items-center justify-between text-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <BookOpen className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
              </div>
              <span className="bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
                Hadith Collections
              </span>
            </div>
            <Button
              onClick={refreshHadiths}
              size="sm"
              variant="outline"
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
          </CardTitle>
          <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-2 font-medium">
            Authentic sayings and teachings of Prophet Muhammad ﷺ - Powered by Hadith API
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {/* Enhanced Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hadith by content, narrator, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-emerald-400 dark:placeholder-emerald-500 transition-all duration-200"
              />
            </div>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="px-4 py-3 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[200px] transition-all duration-200"
            >
              {collections.map(collection => (
                <option key={collection} value={collection}>{collection}</option>
              ))}
            </select>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-emerald-600 dark:text-emerald-400">جاري تحميل الأحاديث من الخادم...</p>
            </div>
          )}

          {/* Enhanced Hadith List */}
          {!isLoading && (
            <div className="space-y-6">
              {filteredHadith.map((hadith) => (
                <div
                  key={hadith.id}
                  className={cn(
                    "group relative border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer",
                    "bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-850",
                    "border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600",
                    expandedHadith === hadith.id && "ring-2 ring-emerald-200 dark:ring-emerald-700 border-emerald-300 dark:border-emerald-600"
                  )}
                  onClick={() => toggleExpanded(hadith.id)}
                >
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 opacity-20">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-emerald-600">
                      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          {hadith.collection}
                        </span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          {hadith.reference}
                        </span>
                      </div>
                      <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        <span className="font-semibold">Category:</span>
                        <span className="ml-1">{hadith.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(hadith.id);
                        }}
                        className={cn(
                          "p-2 rounded-full transition-all duration-200 hover:scale-110",
                          favorites.includes(hadith.id) 
                            ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20" 
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        )}
                      >
                        <Heart className={cn(
                          "w-5 h-5 transition-transform duration-200",
                          favorites.includes(hadith.id) && "fill-current scale-110"
                        )} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(hadith.id);
                        }}
                        className="p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
                      >
                        {expandedHadith === hadith.id ? (
                          <ChevronUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 rotate-180" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
                      "{hadith.english}"
                    </div>
                    
                    {expandedHadith === hadith.id && (
                      <div className="space-y-4 pt-4 border-t-2 border-emerald-100 dark:border-emerald-800 animate-accordion-down">
                        {/* Arabic Text with Enhanced Styling */}
                        <div className="relative bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/50 dark:to-blue-950/50 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
                          <div className="absolute top-2 right-2 text-emerald-300 dark:text-emerald-600 opacity-50">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2L13.09 5.26L16 6L13.09 6.74L12 10L10.91 6.74L8 6L10.91 5.26L12 2Z"/>
                            </svg>
                          </div>
                          <div className="text-right text-xl leading-loose font-arabic text-emerald-800 dark:text-emerald-200" style={{ fontFamily: 'Arial, sans-serif' }}>
                            {hadith.arabic}
                          </div>
                        </div>
                        
                        {/* Narrator Information */}
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span className="text-sm font-bold text-amber-800 dark:text-amber-200">Narrator:</span>
                          </div>
                          <p className="text-amber-700 dark:text-amber-300 font-medium">{hadith.narrator}</p>
                        </div>
                        
                        {/* Source Information */}
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="text-sm font-bold text-purple-800 dark:text-purple-200">Source:</span>
                          </div>
                          <p className="text-purple-700 dark:text-purple-300 font-medium">
                            {hadith.book} - {hadith.reference}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredHadith.length === 0 && !isLoading && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="relative mb-6">
                <BookOpen className="w-16 h-16 mx-auto opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search className="w-6 h-6 opacity-50" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">No hadith found</h3>
              <p className="text-sm">Try adjusting your search terms or filters</p>
            </div>
          )}

          {/* API Status */}
          {!isLoading && (
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Data Source</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">🌐</span>
                <span className="text-gray-600 dark:text-gray-400">Hadith API</span>
                <span className="text-emerald-600 dark:text-emerald-400">• {hadithCollections.length} hadiths loaded</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HadithSection;
