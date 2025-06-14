
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, BookOpen, Clock } from 'lucide-react';
import { AthkarItem, fetchAllAthkar, searchAthkar } from '../services/athkarService';

const AthkarCollectionBrowser = () => {
  const [allAthkar, setAllAthkar] = useState<AthkarItem[]>([]);
  const [filteredAthkar, setFilteredAthkar] = useState<AthkarItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: 'All Athkar', count: 0 },
    { id: 'morning', name: 'Morning', count: 0 },
    { id: 'evening', name: 'Evening', count: 0 },
    { id: 'after_prayer', name: 'After Prayer', count: 0 },
    { id: 'sleeping', name: 'Before Sleep', count: 0 },
    { id: 'general', name: 'General', count: 0 }
  ];

  useEffect(() => {
    loadAllAthkar();
    loadFavorites();
  }, []);

  useEffect(() => {
    filterAthkar();
  }, [allAthkar, searchQuery, selectedCategory]);

  const loadAllAthkar = async () => {
    setIsLoading(true);
    try {
      const athkar = await fetchAllAthkar();
      setAllAthkar(athkar);
    } catch (error) {
      console.error('Failed to load Athkar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem('athkar-favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  };

  const saveFavorites = (newFavorites: Set<string>) => {
    localStorage.setItem('athkar-favorites', JSON.stringify(Array.from(newFavorites)));
    setFavorites(newFavorites);
  };

  const toggleFavorite = (athkarId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(athkarId)) {
      newFavorites.delete(athkarId);
    } else {
      newFavorites.add(athkarId);
    }
    saveFavorites(newFavorites);
  };

  const toggleExpanded = (athkarId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(athkarId)) {
      newExpanded.delete(athkarId);
    } else {
      newExpanded.add(athkarId);
    }
    setExpandedItems(newExpanded);
  };

  const filterAthkar = () => {
    let filtered = allAthkar;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(athkar => athkar.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = searchAthkar(searchQuery, filtered);
    }

    setFilteredAthkar(filtered);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      morning: 'bg-orange-100 text-orange-800',
      evening: 'bg-indigo-100 text-indigo-800',
      after_prayer: 'bg-green-100 text-green-800',
      sleeping: 'bg-purple-100 text-purple-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Update category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === 'all' 
      ? allAthkar.length 
      : allAthkar.filter(athkar => athkar.category === cat.id).length
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            Athkar Collection Browser
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search Athkar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categoriesWithCounts.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="h-8"
              >
                {category.name}
                {category.count > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Athkar List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              Loading Athkar...
            </CardContent>
          </Card>
        ) : filteredAthkar.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No Athkar found matching your search criteria.
            </CardContent>
          </Card>
        ) : (
          filteredAthkar.map((athkar, index) => (
            <Card key={athkar.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <Badge className={getCategoryColor(athkar.category)}>
                          {athkar.category.replace('_', ' ')}
                        </Badge>
                        {athkar.repetitions && (
                          <Badge variant="outline" className="ml-2">
                            <Clock className="w-3 h-3 mr-1" />
                            {athkar.repetitions}x
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(athkar.id)}
                      className="h-8 w-8"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.has(athkar.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Arabic Text */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-xl leading-loose font-arabic text-right" dir="rtl">
                      {athkar.arabic}
                    </div>
                  </div>

                  {/* Transliteration and Translation */}
                  {expandedItems.has(athkar.id) && (
                    <div className="space-y-3 border-t pt-4">
                      {athkar.transliteration && (
                        <div>
                          <h4 className="font-medium text-blue-600 mb-1">Transliteration:</h4>
                          <p className="text-sm italic text-gray-700 dark:text-gray-300">
                            {athkar.transliteration}
                          </p>
                        </div>
                      )}
                      
                      {athkar.translation && (
                        <div>
                          <h4 className="font-medium text-green-600 mb-1">Translation:</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {athkar.translation}
                          </p>
                        </div>
                      )}

                      {athkar.reference && (
                        <div>
                          <h4 className="font-medium text-purple-600 mb-1">Reference:</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {athkar.reference}
                          </p>
                        </div>
                      )}

                      {athkar.benefit && (
                        <div>
                          <h4 className="font-medium text-orange-600 mb-1">Benefit:</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {athkar.benefit}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(athkar.id)}
                    className="text-xs"
                  >
                    {expandedItems.has(athkar.id) ? 'Show less' : 'Show details'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AthkarCollectionBrowser;
