
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2, BookOpen, Copy } from 'lucide-react';
import { searchQuranWords } from '@/features/quran';
import { useCopyToClipboard, useToast } from '@/shared';

interface SearchResult {
  id: number;
  verse_number: number;
  chapter_id: number;
  text: string;
  verse_key?: string;
  surah_name?: string;
}

const QuranWordSearch: React.FC = () => {
  const { copyToClipboard } = useCopyToClipboard();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: 'Enter Search Term',
        description: 'Please enter an Arabic word to search',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSearching(true);
      setHasSearched(true);
      const results = await searchQuranWords(searchTerm.trim());
      setSearchResults(results);
      
      toast({
        title: 'Search Complete',
        description: `Found ${results.length} verses containing "${searchTerm}"`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Search Error',
        description: 'Failed to search. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopyVerse = (result: SearchResult) => {
    const verseText = `${result.text}\n\n- سورة ${result.chapter_id}، الآية ${result.verse_number}`;
    copyToClipboard(verseText, 'Verse copied to clipboard');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-emerald-600" />
          البحث في القرآن الكريم - Quran Word Search
        </CardTitle>
        <p className="text-sm text-gray-600">
          Search for Arabic words and phrases in the Holy Quran
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Input */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="ادخل كلمة للبحث... (Enter Arabic word to search)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-right"
              dir="rtl"
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isSearching || !searchTerm.trim()}
            className="flex items-center gap-2"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Search Results {searchResults.length > 0 && `(${searchResults.length})`}
              </h3>
              {searchResults.length > 0 && (
                <div className="text-sm text-gray-600">
                  Found in {new Set(searchResults.map(r => r.chapter_id)).size} surahs
                </div>
              )}
            </div>

            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                <span className="ml-2">Searching Quran...</span>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No verses found containing "{searchTerm}"</p>
                <p className="text-sm mt-2">Try searching with different Arabic words</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <Card key={`${result.id}-${index}`} className="border-l-4 border-l-emerald-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm text-emerald-700">
                          <BookOpen className="w-4 h-4" />
                          <span>Surah {result.chapter_id}, Verse {result.verse_number}</span>
                          {result.verse_key && (
                            <span className="text-gray-500">({result.verse_key})</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyVerse(result)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div
                        className="text-right leading-loose text-gray-800"
                        style={{ 
                          fontSize: '18px',
                          fontFamily: 'Amiri, Scheherazade New, Arabic Typesetting, serif',
                          lineHeight: '2'
                        }}
                        dir="rtl"
                      >
                        {result.text}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuranWordSearch;
