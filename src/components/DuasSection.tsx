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

  // Enhanced mock data with more comprehensive duas
  const duaCategories: DuaCategory[] = [
    {
      id: "daily",
      name: t('daily-duas'),
      duas: [
        {
          id: "morning",
          title: t('morning-dua'),
          arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          transliteration: "Asbahna wa asbahal-mulku lillahi, walhamdu lillahi, la ilaha illa Allahu wahdahu la shareeka lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadeer",
          translation: t('morning-dua-translation'),
          reference: "Muslim"
        },
        {
          id: "evening",
          title: t('evening-dua'),
          arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          transliteration: "Amsayna wa amsal-mulku lillahi, walhamdu lillahi, la ilaha illa Allahu wahdahu la shareeka lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadeer",
          translation: t('evening-dua-translation'),
          reference: "Muslim"
        },
        {
          id: "waking-up",
          title: "Upon Waking Up",
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
          transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
          translation: "All praise is due to Allah who gave us life after causing us to die, and unto Him is the resurrection",
          reference: "Bukhari"
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
        },
        {
          id: "drinking-milk",
          title: "After Drinking Milk",
          arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ",
          transliteration: "Allahumma barik lana feehi wa zidna minhu",
          translation: "O Allah, bless us in it and give us more of it",
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
        },
        {
          id: "entering-vehicle",
          title: "When Boarding a Vehicle",
          arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ هَذِهِ السَّفْرَةِ وَخَيْرِ مَا فِيهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا",
          transliteration: "Allahumma inni as'aluka min khayri hadhihis-safrati wa khayri ma feeha, wa a'udhu bika min sharriha wa sharri ma feeha",
          translation: "O Allah, I ask You for the goodness of this journey and the goodness of what is in it, and I seek refuge in You from its evil and the evil of what is in it",
          reference: "Muslim"
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
          arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
          transliteration: "Allahu la ilaha illa huwal-hayyul-qayyumu la ta'khudhahu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard",
          translation: t('ayat-kursi-translation'),
          reference: "Quran 2:255"
        },
        {
          id: "seeking-protection",
          title: "Seeking Allah's Protection",
          arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
          transliteration: "A'udhu bi kalimatillahit-tammati min sharri ma khalaq",
          translation: "I seek refuge in the perfect words of Allah from the evil of what He has created",
          reference: "Muslim"
        }
      ]
    },
    {
      id: "forgiveness",
      name: "Forgiveness & Repentance",
      duas: [
        {
          id: "istighfar",
          title: "Master of Seeking Forgiveness",
          arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
          transliteration: "Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mastata't",
          translation: "O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant, and I am faithful to my covenant and my promise to You as much as I can",
          reference: "Bukhari"
        },
        {
          id: "simple-istighfar",
          title: "Simple Seeking Forgiveness",
          arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
          transliteration: "Astaghfirullaha al-'azeem alladhi la ilaha illa huwa al-hayya al-qayyuma wa atubu ilayh",
          translation: "I seek forgiveness from Allah the Mighty, whom there is no deity except Him, the Living, the Eternal, and I repent to Him",
          reference: "Tirmidhi"
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
        description: t('dua-saved-bookmarks'),
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
        description: t('dua-removed-bookmarks'),
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
    copyToClipboard(dua.arabic);
    toast({
      title: t('dua-arabic-copied'),
      description: dua.title,
    });
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
