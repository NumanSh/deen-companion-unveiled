
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  X, 
  BookOpen, 
  Heart,
  Clock,
  Star,
  TrendingUp,
  History
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'popular' | 'suggestion';
  category: 'quran' | 'hadith' | 'dua' | 'general';
  icon: React.ComponentType<any>;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  color: string;
}

const EnhancedSearchExperience = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const popularSearches: SearchSuggestion[] = [
    { id: '1', text: 'Surah Al-Fatiha', type: 'popular', category: 'quran', icon: BookOpen },
    { id: '2', text: 'Morning duas', type: 'popular', category: 'dua', icon: Heart },
    { id: '3', text: 'Prayer times', type: 'popular', category: 'general', icon: Clock },
    { id: '4', text: 'Bismillah', type: 'popular', category: 'quran', icon: Star },
  ];

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Today\'s Verse',
      description: 'Read the verse of the day',
      icon: BookOpen,
      action: () => {
        toast({ title: 'Opening today\'s verse...', duration: 1500 });
        setIsOpen(false);
      },
      color: 'bg-emerald-500'
    },
    {
      id: '2',
      title: 'Prayer Times',
      description: 'Check current prayer schedule',
      icon: Clock,
      action: () => {
        window.location.href = '/calendar';
        setIsOpen(false);
      },
      color: 'bg-blue-500'
    },
    {
      id: '3',
      title: 'Random Hadith',
      description: 'Discover a beautiful hadith',
      icon: Heart,
      action: () => {
        toast({ title: 'Finding a beautiful hadith...', duration: 1500 });
        setIsOpen(false);
      },
      color: 'bg-rose-500'
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recent-searches', JSON.stringify(updated));
      
      toast({
        title: 'Searching...',
        description: `Looking for "${searchQuery}"`,
        duration: 2000,
      });
      
      setIsOpen(false);
      setQuery('');
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent-searches');
  };

  if (!isOpen) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white shadow-lg px-6 py-2 rounded-full"
        >
          <Search className="w-4 h-4 mr-2" />
          Search everything...
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-0">
          {/* Search Input */}
          <div className="p-6 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(query);
                  } else if (e.key === 'Escape') {
                    setIsOpen(false);
                  }
                }}
                placeholder="Search Quran, Hadith, Duas, and more..."
                className="w-full pl-12 pr-12 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() === '' ? (
              <div className="p-6 space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={action.id}
                          variant="ghost"
                          className="justify-start h-auto p-3 hover:bg-gray-50"
                          onClick={action.action}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className={`p-2 ${action.color} rounded-lg`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-medium text-gray-800">
                                {action.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {action.description}
                              </p>
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <History className="w-4 h-4 text-gray-600" />
                        Recent Searches
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start text-left"
                          onClick={() => handleSearch(search)}
                        >
                          <History className="w-4 h-4 mr-3 text-gray-400" />
                          {search}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Popular Searches
                  </h3>
                  <div className="space-y-1">
                    {popularSearches.map((suggestion) => {
                      const Icon = suggestion.icon;
                      return (
                        <Button
                          key={suggestion.id}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleSearch(suggestion.text)}
                        >
                          <Icon className="w-4 h-4 mr-3 text-teal-600" />
                          {suggestion.text}
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {suggestion.category}
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Press Enter to search for "{query}"
                </p>
                <Button
                  onClick={() => handleSearch(query)}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSearchExperience;
