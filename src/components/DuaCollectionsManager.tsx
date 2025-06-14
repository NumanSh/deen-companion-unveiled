
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Heart, Search, Star, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Dua {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
  occasion: string;
  reference?: string;
  isFavorite?: boolean;
}

const DuaCollectionsManager: React.FC = () => {
  const [duas, setDuas] = useState<Dua[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const duaCollection: Dua[] = [
    {
      id: '1',
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      transliteration: 'Bismillahir-Rahmanir-Raheem',
      translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
      category: 'daily',
      occasion: 'Before starting anything',
      reference: 'Quran'
    },
    {
      id: '2',
      arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا',
      transliteration: 'Allahumma barik lana fima razaqtana',
      translation: 'O Allah, bless us in what You have provided us',
      category: 'food',
      occasion: 'Before eating',
      reference: 'Abu Dawud'
    },
    {
      id: '3',
      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      transliteration: 'Rabbana atina fi\'d-dunya hasanatan wa fi\'l-akhirati hasanatan wa qina adhab an-nar',
      translation: 'Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire',
      category: 'general',
      occasion: 'General supplication',
      reference: 'Quran 2:201'
    },
    {
      id: '4',
      arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
      transliteration: 'Allahumma a\'inni ala dhikrika wa shukrika wa husni ibadatik',
      translation: 'O Allah, help me to remember You, thank You, and worship You in the best manner',
      category: 'worship',
      occasion: 'For spiritual strength',
      reference: 'Abu Dawud'
    },
    {
      id: '5',
      arabic: 'اللَّهُمَّ اشْفِ مَرْضَانَا وَمَرْضَى الْمُسْلِمِينَ',
      transliteration: 'Allahumma ishfi mardana wa marda al-muslimeen',
      translation: 'O Allah, heal our sick and the sick of the Muslims',
      category: 'health',
      occasion: 'For the sick',
      reference: 'Islamic tradition'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Duas', icon: '📚' },
    { id: 'daily', name: 'Daily', icon: '🌅' },
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'worship', name: 'Worship', icon: '🕌' },
    { id: 'health', name: 'Health', icon: '🤲' },
    { id: 'general', name: 'General', icon: '⭐' }
  ];

  useEffect(() => {
    setDuas(duaCollection);
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('dua-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const toggleFavorite = (duaId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(duaId)) {
      newFavorites.delete(duaId);
      toast({
        title: "Removed from favorites",
        description: "Dua removed from your favorites",
      });
    } else {
      newFavorites.add(duaId);
      toast({
        title: "Added to favorites",
        description: "Dua added to your favorites",
      });
    }
    setFavorites(newFavorites);
    localStorage.setItem('dua-favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const playAudio = (dua: Dua) => {
    // In a real app, you would play Arabic audio
    toast({
      title: "Audio Feature",
      description: "Arabic audio playback would be available here",
    });
  };

  const filteredDuas = duas.filter(dua => {
    const matchesSearch = dua.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dua.occasion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dua.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteDuas = duas.filter(dua => favorites.has(dua.id));

  const DuaCard = ({ dua }: { dua: Dua }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Badge variant="secondary" className="text-xs">
              {categories.find(c => c.id === dua.category)?.icon} {dua.occasion}
            </Badge>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => playAudio(dua)}
                className="h-8 w-8"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(dua.id)}
                className={`h-8 w-8 ${favorites.has(dua.id) ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${favorites.has(dua.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
          
          <div className="text-right text-xl leading-relaxed font-arabic">
            {dua.arabic}
          </div>
          
          <div className="text-sm text-blue-600 dark:text-blue-400 italic">
            {dua.transliteration}
          </div>
          
          <div className="text-gray-700 dark:text-gray-300">
            {dua.translation}
          </div>
          
          {dua.reference && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Reference: {dua.reference}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          Dua Collections Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="browse" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Duas</TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="w-4 h-4 mr-2" />
              Favorites ({favorites.size})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search duas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-xs"
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>
            
            {/* Duas List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredDuas.map(dua => (
                <DuaCard key={dua.id} dua={dua} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="space-y-4">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {favoriteDuas.length > 0 ? (
                favoriteDuas.map(dua => (
                  <DuaCard key={dua.id} dua={dua} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No favorite duas yet</p>
                  <p className="text-sm">Start adding duas to your favorites!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DuaCollectionsManager;
