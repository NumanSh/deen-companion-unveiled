
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Search, BookOpen, Copy, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useLanguage } from "@/contexts/LanguageContext";

type Dua = {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
};

type DuaCategory = {
  id: string;
  name: string;
  duas: Dua[];
};

type Bookmark = {
  id: string;
  type: 'surah' | 'dua' | 'hadith';
  title: string;
  subtitle?: string;
  data: any;
  timestamp: number;
};

const DuasSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("daily");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedDua, setExpandedDua] = useState<string | null>(null);
  const { toast } = useToast();
  const { copyToClipboard, copied } = useCopyToClipboard();

  const duaCategories: DuaCategory[] = [
    {
      id: "daily",
      name: t('daily-duas'),
      duas: [
        {
          id: "morning",
          title: t('morning-dua'),
          arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
          transliteration: "Asbahna wa asbahal-mulku lillahi, walhamdu lillah",
          translation: t('morning-dua-translation'),
          reference: "Muslim"
        },
        {
          id: "evening",
          title: t('evening-dua'),
          arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
          transliteration: "Amsayna wa amsal-mulku lillahi, walhamdu lillah",
          translation: t('evening-dua-translation'),
          reference: "Muslim"
        }
      ]
    },
    {
      id: "eating",
      name: t('food-drink'),
      duas: [
        {
          id: "before-eating",
          title: t('before-eating'),
          arabic: "بِسْمِ اللَّهِ",
          transliteration: "Bismillah",
          translation: t('before-eating-translation'),
          reference: "Bukhari & Muslim"
        },
        {
          id: "after-eating",
          title: t('after-eating'),
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
          transliteration: "Alhamdu lillahil-ladhi at'amani hadha wa razaqaneehi min ghayri hawlin minnee wa la quwwah",
          translation: t('after-eating-translation'),
          reference: "Tirmidhi"
        }
      ]
    },
    {
      id: "travel",
      name: t('travel'),
      duas: [
        {
          id: "travel-dua",
          title: t('when-starting-journey'),
          arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
          transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrineen, wa inna ila rabbina la munqaliboon",
          translation: t('travel-dua-translation'),
          reference: "Quran 43:13-14"
        }
      ]
    },
    {
      id: "protection",
      name: t('protection'),
      duas: [
        {
          id: "ayat-kursi",
          title: t('ayat-kursi'),
          arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
          transliteration: "Allahu la ilaha illa huwal-hayyul-qayyum",
          translation: t('ayat-kursi-translation'),
          reference: "Quran 2:255"
        }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('islamic-app-bookmarks');
    if (saved) {
      const bookmarks: Bookmark[] = JSON.parse(saved);
      const duaFavorites = new Set<string>(
        bookmarks
          .filter((b: Bookmark) => b.type === 'dua')
          .map((b: Bookmark) => b.id.replace('dua-', ''))
      );
      setFavorites(duaFavorites);
    }
  }, []);

  const toggleFavorite = (duaId: string) => {
    const dua = duaCategories
      .flatMap(cat => cat.duas)
      .find(d => d.id === duaId);
    
    if (!dua) return;

    const bookmark = {
      id: `dua-${duaId}`,
      type: 'dua' as const,
      title: dua.title,
      subtitle: dua.transliteration,
      data: dua,
      timestamp: Date.now()
    };

    const saved = localStorage.getItem('islamic-app-bookmarks');
    const bookmarks = saved ? JSON.parse(saved) : [];
    
    const existingIndex = bookmarks.findIndex((b: any) => b.id === bookmark.id);
    
    if (existingIndex === -1) {
      bookmarks.push(bookmark);
      setFavorites(prev => new Set([...prev, duaId]));
      toast({
        title: t('added-to-bookmarks'),
        description: t('dua-saved-bookmarks', { title: dua.title }),
      });
    } else {
      bookmarks.splice(existingIndex, 1);
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(duaId);
        return newSet;
      });
      toast({
        title: t('removed-from-bookmarks'),
        description: t('dua-removed-bookmarks', { title: dua.title }),
      });
    }
    
    localStorage.setItem('islamic-app-bookmarks', JSON.stringify(bookmarks));
  };

  const filteredDuas = duaCategories
    .find(cat => cat.id === selectedCategory)
    ?.duas.filter(dua => 
      dua.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dua.translation.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleCopyArabic = (dua: Dua) => {
    copyToClipboard(dua.arabic, t('dua-arabic-copied', { title: dua.title }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          {t('daily-duas-supplications')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t('search-duas-placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {duaCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Duas List */}
        <div className="space-y-3">
          {filteredDuas.map((dua) => (
            <div
              key={dua.id}
              className="border rounded-lg p-4 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{dua.title}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyArabic(dua)}
                    className="h-8 w-8"
                    title={t('copy-arabic-text')}
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(dua.id)}
                    className="h-8 w-8"
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4",
                        favorites.has(dua.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      )}
                    />
                  </Button>
                </div>
              </div>

              {/* Arabic Text */}
              <div className="text-right">
                <p className="text-2xl leading-loose font-arabic cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors" 
                   dir="rtl"
                   onClick={() => handleCopyArabic(dua)}
                   title={t('click-to-copy')}>
                  {dua.arabic}
                </p>
              </div>

              {/* Show more details when expanded */}
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">{t('transliteration')}:</p>
                  <p className="text-sm italic">{dua.transliteration}</p>
                </div>

                {(expandedDua === dua.id || searchTerm) && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">{t('translation')}:</p>
                      <p className="text-sm">{dua.translation}</p>
                    </div>
                    
                    {dua.reference && (
                      <div>
                        <p className="text-sm font-medium text-purple-600 mb-1">{t('reference')}:</p>
                        <p className="text-xs text-gray-600">{dua.reference}</p>
                      </div>
                    )}
                  </>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedDua(expandedDua === dua.id ? null : dua.id)}
                  className="text-xs"
                >
                  {expandedDua === dua.id ? t('show-less') : t('show-translation')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDuas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t('no-duas-found')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DuasSection;
