import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search, ChevronDown, ChevronUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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

const hadithCollections: Hadith[] = [
  {
    id: '1',
    collection: 'Sahih Bukhari',
    book: 'Book of Faith',
    hadithNumber: '1',
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    english: 'Actions are (judged) by motives (niyyah), so each man will have what he intended.',
    narrator: 'Umar ibn Al-Khattab (RA)',
    reference: 'Sahih Bukhari 1',
    category: 'Faith'
  },
  {
    id: '2',
    collection: 'Sahih Muslim',
    book: 'Book of Faith',
    hadithNumber: '99',
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    english: 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    narrator: 'Abu Hurairah (RA)',
    reference: 'Sahih Muslim 99',
    category: 'Manners'
  },
  {
    id: '3',
    collection: 'Sunan Abu Dawud',
    book: 'Book of Prayer',
    hadithNumber: '425',
    arabic: 'الطُّهُورُ شَطْرُ الْإِيمَانِ',
    english: 'Cleanliness is half of faith.',
    narrator: 'Abu Malik Al-Ash\'ari (RA)',
    reference: 'Sunan Abu Dawud 425',
    category: 'Purification'
  },
  {
    id: '4',
    collection: 'Jami\' At-Tirmidhi',
    book: 'Book of Good Manners',
    hadithNumber: '1987',
    arabic: 'الْمُؤْمِنُ لَيْسَ بِالطَّعَّانِ وَلَا اللَّعَّانِ وَلَا الْفَاحِشِ وَلَا الْبَذِيءِ',
    english: 'The believer is not one who taunts others, curses others, is indecent, or is foul.',
    narrator: 'Abdullah ibn Mas\'ud (RA)',
    reference: 'Jami\' At-Tirmidhi 1987',
    category: 'Character'
  },
  {
    id: '5',
    collection: 'Sahih Bukhari',
    book: 'Book of Knowledge',
    hadithNumber: '71',
    arabic: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ',
    english: 'If Allah wants to do good to a person, He makes him comprehend the religion.',
    narrator: 'Mu\'awiya (RA)',
    reference: 'Sahih Bukhari 71',
    category: 'Knowledge'
  },
  {
    id: '6',
    collection: 'Sahih Bukhari',
    book: 'Book of Faith',
    hadithNumber: '13',
    arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    english: 'None of you truly believes until he loves for his brother what he loves for himself.',
    narrator: 'Anas ibn Malik (RA)',
    reference: 'Sahih Bukhari 13',
    category: 'Faith'
  },
  {
    id: '7',
    collection: 'Sahih Muslim',
    book: 'Book of Prayer',
    hadithNumber: '233',
    arabic: 'مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ',
    english: 'Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.',
    narrator: 'Abu Musa Al-Ash\'ari (RA)',
    reference: 'Sahih Muslim 233',
    category: 'Prayer'
  },
  {
    id: '8',
    collection: 'Sahih Muslim',
    book: 'Book of Faith',
    hadithNumber: '55',
    arabic: 'الدِّينُ النَّصِيحَةُ',
    english: 'Religion is sincere advice.',
    narrator: 'Tamim Ad-Dari (RA)',
    reference: 'Sahih Muslim 55',
    category: 'Faith'
  },
  {
    id: '9',
    collection: 'Sunan Ibn Majah',
    book: 'Book of Rulings',
    hadithNumber: '2341',
    arabic: 'لَا ضَرَرَ وَلَا ضِرَارَ',
    english: 'There should be neither harming nor reciprocating harm.',
    narrator: 'Abu Sa\'id Al-Khudri (RA)',
    reference: 'Sunan Ibn Majah 2341',
    category: 'Justice'
  },
  {
    id: '10',
    collection: 'Sahih Muslim',
    book: 'Book of Wills',
    hadithNumber: '1631',
    arabic: 'إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ',
    english: 'When a person dies, his deeds come to an end except for three things.',
    narrator: 'Abu Hurairah (RA)',
    reference: 'Sahih Muslim 1631',
    category: 'Death'
  },
  {
    id: '11',
    collection: 'Sahih Bukhari',
    book: 'Book of Fasting',
    hadithNumber: '1904',
    arabic: 'كُلُّ عَمَلِ ابْنِ آدَمَ لَهُ إِلَّا الصَّوْمَ فَإِنَّهُ لِي وَأَنَا أَجْزِي بِهِ',
    english: 'Every deed of the son of Adam is for him except fasting; it is for Me and I shall reward for it.',
    narrator: 'Abu Hurairah (RA)',
    reference: 'Sahih Bukhari 1904',
    category: 'Fasting'
  },
  {
    id: '12',
    collection: 'At-Tabarani',
    book: 'Al-Mu\'jam Al-Awsat',
    hadithNumber: '6026',
    arabic: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
    english: 'The best of people are those who are most beneficial to others.',
    narrator: 'Abdullah ibn Umar (RA)',
    reference: 'At-Tabarani 6026',
    category: 'Character'
  },
  {
    id: '13',
    collection: 'Jami\' At-Tirmidhi',
    book: 'Book of Righteousness',
    hadithNumber: '1987',
    arabic: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ',
    english: 'Fear Allah wherever you are.',
    narrator: 'Abu Dharr Al-Ghifari (RA)',
    reference: 'Jami\' At-Tirmidhi 1987',
    category: 'Taqwa'
  },
  {
    id: '14',
    collection: 'Sahih Muslim',
    book: 'Book of Zakat',
    hadithNumber: '1017',
    arabic: 'مَنْ سَنَّ فِي الْإِسْلَامِ سُنَّةً حَسَنَةً فَلَهُ أَجْرُهَا وَأَجْرُ مَنْ عَمِلَ بِهَا',
    english: 'Whoever establishes a good practice in Islam will have its reward and the reward of those who act upon it.',
    narrator: 'Jarir ibn Abdullah (RA)',
    reference: 'Sahih Muslim 1017',
    category: 'Good Deeds'
  },
  {
    id: '15',
    collection: 'Sahih Muslim',
    book: 'Book of Faith',
    hadithNumber: '91',
    arabic: 'إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ',
    english: 'Verily, Allah is beautiful and He loves beauty.',
    narrator: 'Abdullah ibn Mas\'ud (RA)',
    reference: 'Sahih Muslim 91',
    category: 'Beauty'
  }
];

const HadithSection: React.FC = () => {
  const [expandedHadith, setExpandedHadith] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('All');

  const collections = ['All', 'Sahih Bukhari', 'Sahih Muslim', 'Sunan Abu Dawud', 'Jami\' At-Tirmidhi', 'Sunan Ibn Majah', 'At-Tabarani'];

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
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="relative">
              <BookOpen className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
            </div>
            <span className="bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
              Hadith Collections
            </span>
          </CardTitle>
          <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-2 font-medium">
            Authentic sayings and teachings of Prophet Muhammad ﷺ
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

          {/* Enhanced Hadith List */}
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

          {filteredHadith.length === 0 && (
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
        </CardContent>
      </Card>
    </div>
  );
};

export default HadithSection;
