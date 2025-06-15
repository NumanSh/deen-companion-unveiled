
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Clock, Trash2, TrendingUp, X } from 'lucide-react';

interface SearchHistory {
  term: string;
  timestamp: number;
  results: number;
}

interface EnhancedQuranSearchProps {
  onSearch: (term: string) => void;
  onClose: () => void;
}

const EnhancedQuranSearch: React.FC<EnhancedQuranSearchProps> = ({
  onSearch,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [popularSearches] = useState([
    'الله', 'الرحمن', 'الجنة', 'النار', 'الصلاة', 'الزكاة', 'الصيام', 'الحج'
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('quran-search-history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (term: string) => {
    if (!term.trim()) return;

    // Add to search history
    const newHistory = [
      { term, timestamp: Date.now(), results: 0 },
      ...searchHistory.filter(h => h.term !== term).slice(0, 9)
    ];
    setSearchHistory(newHistory);
    localStorage.setItem('quran-search-history', JSON.stringify(newHistory));

    onSearch(term);
    onClose();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('quran-search-history');
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-20">
      <Card className="w-full max-w-lg bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-600" />
              Search Quran
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Search for Arabic words or phrases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
              className="text-right"
              dir="rtl"
              autoFocus
            />
            <Button 
              onClick={() => handleSearch(searchTerm)}
              disabled={!searchTerm.trim()}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Popular Searches */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch(term)}
                  className="text-right h-8 px-3"
                  dir="rtl"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          {searchHistory.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleSearch(item.term)}
                  >
                    <div className="flex-1 text-right" dir="rtl">
                      <div className="text-sm">{item.term}</div>
                    </div>
                    <div className="text-xs text-gray-400 ml-2">
                      {formatTimeAgo(item.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Tips */}
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <strong>Search Tips:</strong> Use Arabic words for best results. Try searching for 
            Allah names, Islamic concepts, or specific themes.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedQuranSearch;
