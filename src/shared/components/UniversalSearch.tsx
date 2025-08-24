
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, X, Book, Heart, Calendar, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  type: 'surah' | 'dua' | 'hadith' | 'dhikr';
  title: string;
  subtitle?: string;
  content: string;
  score: number;
}

interface UniversalSearchProps {
  onResult: (result: SearchResult) => void;
  isOpen: boolean;
  onClose: () => void;
}

const UniversalSearch: React.FC<UniversalSearchProps> = ({ onResult, isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['surah', 'dua', 'hadith', 'dhikr']);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - in a real app, this would come from your data sources
  const searchableContent = useMemo(() => [
    {
      id: 'fatihah',
      type: 'surah' as const,
      title: 'Al-Fatihah',
      subtitle: 'The Opening',
      content: 'In the name of Allah, the Most Gracious, the Most Merciful'
    },
    {
      id: 'morning-dua',
      type: 'dua' as const,
      title: 'Morning Dua',
      subtitle: 'Daily Morning Prayer',
      content: 'We have reached the morning and at this very time unto Allah belongs all sovereignty'
    },
    {
      id: 'subhanallah',
      type: 'dhikr' as const,
      title: 'SubhanAllah',
      subtitle: 'Glory be to Allah',
      content: 'Glory be to Allah, praise and glorification'
    }
  ], []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    return searchableContent
      .filter(item => selectedTypes.includes(item.type))
      .map(item => {
        const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
        const subtitleMatch = item.subtitle?.toLowerCase().includes(query.toLowerCase());
        const contentMatch = item.content.toLowerCase().includes(query.toLowerCase());
        
        let score = 0;
        if (titleMatch) score += 3;
        if (subtitleMatch) score += 2;
        if (contentMatch) score += 1;

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query, selectedTypes, searchableContent]);

  const typeIcons = {
    surah: Book,
    dua: Calendar,
    hadith: Book,
    dhikr: RotateCcw
  };

  const typeColors = {
    surah: 'text-green-600',
    dua: 'text-blue-600',
    hadith: 'text-purple-600',
    dhikr: 'text-orange-600'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Search Header */}
          <div className="border-b p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search across Quran, Duas, Hadith, and Dhikr..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 pr-4"
                  autoFocus
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(showFilters && "bg-gray-100")}
              >
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="flex flex-wrap gap-2">
                {['surah', 'dua', 'hadith', 'dhikr'].map((type) => {
                  const Icon = typeIcons[type as keyof typeof typeIcons];
                  return (
                    <Button
                      key={type}
                      variant={selectedTypes.includes(type) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedTypes(prev =>
                          prev.includes(type)
                            ? prev.filter(t => t !== type)
                            : [...prev, type]
                        );
                      }}
                      className="text-xs capitalize"
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {type}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() && (
              <div className="p-2">
                {filteredResults.length > 0 ? (
                  <div className="space-y-1">
                    {filteredResults.map((result) => {
                      const Icon = typeIcons[result.type];
                      return (
                        <button
                          key={result.id}
                          onClick={() => onResult(result)}
                          className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className={cn("w-4 h-4 mt-1", typeColors[result.type])} />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{result.title}</h3>
                              {result.subtitle && (
                                <p className="text-sm text-gray-600 truncate">{result.subtitle}</p>
                              )}
                              <p className="text-xs text-gray-500 truncate mt-1">{result.content}</p>
                            </div>
                            <span className="text-xs text-gray-400 capitalize">{result.type}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No results found for "{query}"</p>
                  </div>
                )}
              </div>
            )}

            {!query.trim() && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Start typing to search across all Islamic content</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversalSearch;
