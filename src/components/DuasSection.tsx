import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

const duaCategories: DuaCategory[] = [
  {
    id: "daily",
    name: "Daily Duas",
    duas: [
      {
        id: "morning",
        title: "Morning Dua",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
        transliteration: "Asbahna wa asbahal-mulku lillahi, walhamdu lillah",
        translation: "We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah.",
        reference: "Muslim"
      },
      {
        id: "evening",
        title: "Evening Dua",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
        transliteration: "Amsayna wa amsal-mulku lillahi, walhamdu lillah",
        translation: "We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah.",
        reference: "Muslim"
      }
    ]
  },
  {
    id: "eating",
    name: "Food & Drink",
    duas: [
      {
        id: "before-eating",
        title: "Before Eating",
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillah",
        translation: "In the name of Allah.",
        reference: "Bukhari & Muslim"
      },
      {
        id: "after-eating",
        title: "After Eating",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        transliteration: "Alhamdu lillahil-ladhi at'amani hadha wa razaqaneehi min ghayri hawlin minnee wa la quwwah",
        translation: "All praise is due to Allah who has fed me this food and provided it for me without any might or power on my part.",
        reference: "Tirmidhi"
      }
    ]
  },
  {
    id: "travel",
    name: "Travel",
    duas: [
      {
        id: "travel-dua",
        title: "When Starting Journey",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrineen, wa inna ila rabbina la munqaliboon",
        translation: "Glory unto Him Who created this transportation for us though we were unable to create it on our own. And unto our Lord we shall return.",
        reference: "Quran 43:13-14"
      }
    ]
  },
  {
    id: "protection",
    name: "Protection",
    duas: [
      {
        id: "ayat-kursi",
        title: "Ayat al-Kursi",
        arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
        transliteration: "Allahu la ilaha illa huwal-hayyul-qayyum",
        translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.",
        reference: "Quran 2:255"
      }
    ]
  }
];

const DuasSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("daily");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedDua, setExpandedDua] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('islamic-app-bookmarks');
    if (saved) {
      const bookmarks = JSON.parse(saved);
      const duaFavorites = new Set(
        bookmarks.filter((b: any) => b.type === 'dua').map((b: any) => b.id.replace('dua-', ''))
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
        title: "Added to bookmarks",
        description: `${dua.title} has been saved to your bookmarks.`,
      });
    } else {
      bookmarks.splice(existingIndex, 1);
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(duaId);
        return newSet;
      });
      toast({
        title: "Removed from bookmarks",
        description: `${dua.title} has been removed from your bookmarks.`,
      });
    }
    
    localStorage.setItem('islamic-app-bookmarks', JSON.stringify(bookmarks));
  };

  const filteredDuas = duaCategories
    .find(cat => cat.id === selectedCategory)
    ?.duas.filter(dua => 
      dua.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Daily Duas (Supplications)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search duas..."
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

              {/* Arabic Text */}
              <div className="text-right">
                <p className="text-2xl leading-loose font-arabic" dir="rtl">
                  {dua.arabic}
                </p>
              </div>

              {/* Show more details when expanded */}
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Transliteration:</p>
                  <p className="text-sm italic">{dua.transliteration}</p>
                </div>

                {(expandedDua === dua.id || searchTerm) && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">Translation:</p>
                      <p className="text-sm">{dua.translation}</p>
                    </div>
                    
                    {dua.reference && (
                      <div>
                        <p className="text-sm font-medium text-purple-600 mb-1">Reference:</p>
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
                  {expandedDua === dua.id ? "Show less" : "Show translation"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDuas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No duas found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DuasSection;
