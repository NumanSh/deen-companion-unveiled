
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search, ChevronDown, ChevronUp } from "lucide-react";
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
  }
];

const HadithSection: React.FC = () => {
  const [expandedHadith, setExpandedHadith] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('All');

  const collections = ['All', 'Sahih Bukhari', 'Sahih Muslim', 'Sunan Abu Dawud', 'Jami\' At-Tirmidhi'];

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
                         hadith.narrator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hadith.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollection = selectedCollection === 'All' || hadith.collection === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Hadith Collections
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search hadith..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {collections.map(collection => (
              <option key={collection} value={collection}>{collection}</option>
            ))}
          </select>
        </div>

        {/* Hadith List */}
        <div className="space-y-4">
          {filteredHadith.map((hadith) => (
            <div
              key={hadith.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {hadith.collection}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {hadith.reference}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-medium">Category:</span> {hadith.category}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(hadith.id)}
                    className={cn(
                      "p-2",
                      favorites.includes(hadith.id) && "text-red-500"
                    )}
                  >
                    <Heart className={cn(
                      "w-4 h-4",
                      favorites.includes(hadith.id) && "fill-current"
                    )} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(hadith.id)}
                    className="p-2"
                  >
                    {expandedHadith === hadith.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-base leading-relaxed">
                  {hadith.english}
                </div>
                
                {expandedHadith === hadith.id && (
                  <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-600">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <div className="text-right text-lg leading-relaxed font-arabic">
                        {hadith.arabic}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Narrator:</span> {hadith.narrator}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Source:</span> {hadith.book} - {hadith.reference}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredHadith.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No hadith found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HadithSection;
