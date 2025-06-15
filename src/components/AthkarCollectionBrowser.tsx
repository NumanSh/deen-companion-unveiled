
import React, { useState, useEffect } from 'react';
import { AthkarItem, fetchAllAthkar, searchAthkar } from '../services/athkarService';
import AthkarFilters from './AthkarFilters';
import AthkarList from './AthkarList';

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

  // Update category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === 'all' 
      ? allAthkar.length 
      : allAthkar.filter(athkar => athkar.category === cat.id).length
  }));

  return (
    <div className="space-y-6">
      <AthkarFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={categoriesWithCounts}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />

      <AthkarList
        athkar={filteredAthkar}
        isLoading={isLoading}
        expandedItems={expandedItems}
        favorites={favorites}
        onToggleExpanded={toggleExpanded}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default AthkarCollectionBrowser;
