
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Book, Clock, Star } from 'lucide-react';
import { QuranSurah } from '@/services/quranService';

interface SearchFilters {
  revelationType: 'All' | 'Meccan' | 'Medinan';
  lengthRange: 'All' | 'Short' | 'Medium' | 'Long';
  searchIn: 'name' | 'translation' | 'both';
}

interface AdvancedQuranSearchProps {
  surahs: QuranSurah[];
  onSurahSelect: (surah: QuranSurah) => void;
  onClose: () => void;
}

const AdvancedQuranSearch: React.FC<AdvancedQuranSearchProps> = ({
  surahs,
  onSurahSelect,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    revelationType: 'All',
    lengthRange: 'All',
    searchIn: 'both'
  });
  const [filteredSurahs, setFilteredSurahs] = useState<QuranSurah[]>(surahs);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSurahs] = useState([1, 2, 18, 36, 55, 67, 112, 113, 114]);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('recent-quran-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...surahs];

    // Apply revelation type filter
    if (filters.revelationType !== 'All') {
      filtered = filtered.filter(surah => surah.revelationType === filters.revelationType);
    }

    // Apply length filter
    if (filters.lengthRange !== 'All') {
      filtered = filtered.filter(surah => {
        const ayahCount = surah.numberOfAyahs;
        switch (filters.lengthRange) {
          case 'Short': return ayahCount <= 20;
          case 'Medium': return ayahCount > 20 && ayahCount <= 100;
          case 'Long': return ayahCount > 100;
          default: return true;
        }
      });
    }

    // Apply search term
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(surah => {
        const searchInName = filters.searchIn === 'name' || filters.searchIn === 'both';
        const searchInTranslation = filters.searchIn === 'translation' || filters.searchIn === 'both';
        
        return (
          (searchInName && (
            surah.name.includes(query) ||
            surah.englishName.toLowerCase().includes(query) ||
            surah.number.toString().includes(query)
          )) ||
          (searchInTranslation && surah.englishNameTranslation.toLowerCase().includes(query))
        );
      });
    }

    setFilteredSurahs(filtered);
  }, [searchTerm, filters, surahs]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.trim() && !recentSearches.includes(term)) {
      const newRecent = [term, ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecent);
      localStorage.setItem('recent-quran-searches', JSON.stringify(newRecent));
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilters({
      revelationType: 'All',
      lengthRange: 'All',
      searchIn: 'both'
    });
  };

  const getSurahLength = (ayahCount: number) => {
    if (ayahCount <= 20) return 'Short';
    if (ayahCount <= 100) return 'Medium';
    return 'Long';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            Advanced Quran Search
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by surah name, number, or meaning..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-12"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium">Revelation Type:</label>
            <div className="flex gap-2">
              {(['All', 'Meccan', 'Medinan'] as const).map(type => (
                <Button
                  key={type}
                  size="sm"
                  variant={filters.revelationType === type ? 'default' : 'outline'}
                  onClick={() => setFilters(prev => ({ ...prev, revelationType: type }))}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Length:</label>
            <div className="flex gap-2">
              {(['All', 'Short', 'Medium', 'Long'] as const).map(length => (
                <Button
                  key={length}
                  size="sm"
                  variant={filters.lengthRange === length ? 'default' : 'outline'}
                  onClick={() => setFilters(prev => ({ ...prev, lengthRange: length }))}
                >
                  {length}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Search In:</label>
            <div className="flex gap-2">
              {([
                { key: 'both', label: 'Both' },
                { key: 'name', label: 'Name' },
                { key: 'translation', label: 'Meaning' }
              ] as const).map(option => (
                <Button
                  key={option.key}
                  size="sm"
                  variant={filters.searchIn === option.key ? 'default' : 'outline'}
                  onClick={() => setFilters(prev => ({ ...prev, searchIn: option.key }))}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Searches */}
        {!searchTerm && recentSearches.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-medium">Recent Searches</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-emerald-100"
                  onClick={() => handleSearch(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Popular Surahs */}
        {!searchTerm && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-medium">Popular Surahs</h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {popularSurahs.map(surahNumber => {
                const surah = surahs.find(s => s.number === surahNumber);
                if (!surah) return null;
                
                return (
                  <Button
                    key={surahNumber}
                    variant="outline"
                    size="sm"
                    onClick={() => onSurahSelect(surah)}
                    className="text-left justify-start"
                  >
                    <span className="text-xs">
                      {surah.number}. {surah.englishName}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              {searchTerm ? 'Search Results' : 'All Surahs'} ({filteredSurahs.length})
            </h3>
            {(searchTerm || filters.revelationType !== 'All' || filters.lengthRange !== 'All') && (
              <Button size="sm" variant="ghost" onClick={clearSearch}>
                Clear All
              </Button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredSurahs.map(surah => (
              <div
                key={surah.number}
                onClick={() => onSurahSelect(surah)}
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded text-sm font-bold">
                      {surah.number}
                    </div>
                    <div>
                      <h4 className="font-semibold">{surah.englishName}</h4>
                      <p className="text-sm text-emerald-600">{surah.englishNameTranslation}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <Badge variant="outline" className="text-xs">
                    {surah.revelationType}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {surah.numberOfAyahs} verses • {getSurahLength(surah.numberOfAyahs)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedQuranSearch;
