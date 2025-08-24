
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Heart, Volume2, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Name {
  number: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  benefit: string;
}

const AsmaUlHusna: React.FC = () => {
  const [currentName, setCurrentName] = useState<Name | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'daily' | 'list' | 'favorites'>('daily');
  const { toast } = useToast();

  const names: Name[] = [
    {
      number: 1,
      arabic: "الرَّحْمَنُ",
      transliteration: "Ar-Rahman",
      meaning: "The Most Merciful",
      benefit: "Recite for Allah's mercy and compassion"
    },
    {
      number: 2,
      arabic: "الرَّحِيمُ",
      transliteration: "Ar-Raheem",
      meaning: "The Most Compassionate",
      benefit: "For receiving divine mercy in times of difficulty"
    },
    {
      number: 3,
      arabic: "الْمَلِكُ",
      transliteration: "Al-Malik",
      meaning: "The King",
      benefit: "For seeking Allah's sovereignty and guidance"
    },
    {
      number: 4,
      arabic: "الْقُدُّوسُ",
      transliteration: "Al-Quddus",
      meaning: "The Most Sacred",
      benefit: "For spiritual purification and cleansing of the heart"
    },
    {
      number: 5,
      arabic: "السَّلاَمُ",
      transliteration: "As-Salaam",
      meaning: "The Source of Peace",
      benefit: "For inner peace and tranquility"
    },
    {
      number: 6,
      arabic: "الْمُؤْمِنُ",
      transliteration: "Al-Mu'min",
      meaning: "The Guardian of Faith",
      benefit: "For strengthening faith and security"
    },
    {
      number: 7,
      arabic: "الْمُهَيْمِنُ",
      transliteration: "Al-Muhaymin",
      meaning: "The Protector",
      benefit: "For divine protection and guardianship"
    },
    {
      number: 8,
      arabic: "الْعَزِيزُ",
      transliteration: "Al-Azeez",
      meaning: "The Mighty",
      benefit: "For strength and honor in facing challenges"
    },
    {
      number: 9,
      arabic: "الْجَبَّارُ",
      transliteration: "Al-Jabbar",
      meaning: "The Compeller",
      benefit: "For overcoming oppression and finding justice"
    },
    {
      number: 10,
      arabic: "الْمُتَكَبِّرُ",
      transliteration: "Al-Mutakabbir",
      meaning: "The Supreme",
      benefit: "For humility and recognizing Allah's greatness"
    }
  ];

  useEffect(() => {
    // Load favorites
    const saved = localStorage.getItem('asma-ul-husna-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }

    // Set daily name
    const today = new Date();
    const dayIndex = today.getDate() % names.length;
    setCurrentName(names[dayIndex]);
  }, []);

  const toggleFavorite = (nameNumber: number) => {
    const updated = favorites.includes(nameNumber)
      ? favorites.filter(n => n !== nameNumber)
      : [...favorites, nameNumber];
    
    setFavorites(updated);
    localStorage.setItem('asma-ul-husna-favorites', JSON.stringify(updated));

    toast({
      title: favorites.includes(nameNumber) ? "Removed from Favorites" : "Added to Favorites",
      description: "Your favorite names have been updated.",
    });
  };

  const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    setCurrentName(names[randomIndex]);
  };

  const playPronunciation = (name: Name) => {
    // In a real app, this would play audio
    toast({
      title: "Pronunciation",
      description: `${name.transliteration} - ${name.meaning}`,
    });
  };

  const renderNameCard = (name: Name, showFavoriteButton = true) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-amber-200 shadow-lg">
      <div className="text-center space-y-4">
        {/* Arabic Name */}
        <div className="text-4xl font-arabic text-amber-800 dark:text-amber-200" dir="rtl">
          {name.arabic}
        </div>
        
        {/* Transliteration */}
        <div className="text-xl font-semibold text-amber-700 dark:text-amber-300">
          {name.transliteration}
        </div>
        
        {/* Meaning */}
        <div className="text-lg text-gray-700 dark:text-gray-300">
          {name.meaning}
        </div>
        
        {/* Number */}
        <div className="inline-block bg-amber-100 dark:bg-amber-800 px-3 py-1 rounded-full">
          <span className="text-amber-800 dark:text-amber-200 text-sm font-medium">
            {name.number} of 99
          </span>
        </div>
        
        {/* Benefit */}
        <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
          <div className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
            Spiritual Benefit:
          </div>
          <div className="text-sm text-amber-700 dark:text-amber-300 italic">
            {name.benefit}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => playPronunciation(name)}
            className="text-amber-600 hover:text-amber-700"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
          
          {showFavoriteButton && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(name.number)}
              className={favorites.includes(name.number) 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-500 hover:text-red-500'
              }
            >
              <Heart className={`w-4 h-4 ${favorites.includes(name.number) ? 'fill-current' : ''}`} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-600" />
          Asma Ul Husna - 99 Names of Allah
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* View Mode Tabs */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('daily')}
            className="flex-1"
          >
            Today's Name
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="flex-1"
          >
            All Names
          </Button>
          <Button
            variant={viewMode === 'favorites' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('favorites')}
            className="flex-1"
          >
            Favorites ({favorites.length})
          </Button>
        </div>

        {/* Daily Name View */}
        {viewMode === 'daily' && currentName && (
          <div className="space-y-4">
            {renderNameCard(currentName)}
            
            <div className="flex gap-2">
              <Button
                onClick={getRandomName}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Random Name
              </Button>
            </div>
            
            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg text-center">
              <div className="text-sm text-amber-800 dark:text-amber-200">
                💡 <strong>Daily Practice:</strong> Reflect on this name throughout your day and see how it manifests in your life.
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
            {names.map((name) => (
              <div
                key={name.number}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg border hover:border-amber-300 transition-colors cursor-pointer"
                onClick={() => setCurrentName(name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 dark:bg-amber-800 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 dark:text-amber-200 text-xs font-bold">
                        {name.number}
                      </span>
                    </div>
                    <div>
                      <div className="font-arabic text-amber-800 dark:text-amber-200" dir="rtl">
                        {name.arabic}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {name.transliteration} - {name.meaning}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(name.number);
                    }}
                    className={favorites.includes(name.number) 
                      ? 'text-red-500' 
                      : 'text-gray-400 hover:text-red-500'
                    }
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(name.number) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Favorites View */}
        {viewMode === 'favorites' && (
          <div className="space-y-3">
            {favorites.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No favorite names yet.</p>
                <p className="text-sm">Tap the heart icon to add names to your favorites.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {names
                  .filter(name => favorites.includes(name.number))
                  .map((name) => (
                    <div key={name.number} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-arabic text-lg text-amber-800 dark:text-amber-200" dir="rtl">
                            {name.arabic}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {name.transliteration} - {name.meaning}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(name.number)}
                          className="text-red-500"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AsmaUlHusna;
