
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchRandomHadiths, searchHadiths } from '@/services/hadithApi';
import HadithSearchFilters from './HadithSearchFilters';
import HadithSearchResults from './HadithSearchResults';
import HadithLoadingState from './HadithLoadingState';

interface HadithSearchResult {
  id: string;
  text: string;
  narrator: string;
  source: string;
  book: string;
  chapter: string;
  grade: 'صحيح' | 'حسن' | 'ضعيف';
  topic: string[];
}

const HadithSearchEngine = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('الكل');
  const [selectedGrade, setSelectedGrade] = useState('الكل');
  const [results, setResults] = useState<HadithSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial hadiths from API
  useEffect(() => {
    const loadInitialHadiths = async () => {
      setIsLoading(true);
      try {
        const hadiths = await fetchRandomHadiths(15);
        setResults(hadiths);
        console.log('Loaded initial hadiths from API:', hadiths.length);
      } catch (error) {
        console.error('Failed to load initial hadiths:', error);
        toast({
          title: 'خطأ في التحميل',
          description: 'فشل في تحميل الأحاديث من الخادم',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialHadiths();
  }, [toast]);

  const handleSearch = async () => {
    setIsSearching(true);
    
    try {
      console.log('Searching hadiths with query:', searchQuery);
      const searchResults = await searchHadiths(searchQuery, selectedSource, selectedGrade);
      setResults(searchResults);
      
      toast({
        title: 'تم البحث',
        description: `تم العثور على ${searchResults.length} حديث`,
      });
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: 'خطأ في البحث',
        description: 'فشل في البحث، يرجى المحاولة مرة أخرى',
        variant: 'destructive'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const refreshHadiths = async () => {
    setIsLoading(true);
    try {
      const freshHadiths = await fetchRandomHadiths(15);
      setResults(freshHadiths);
      setSearchQuery('');
      setSelectedSource('الكل');
      setSelectedGrade('الكل');
      
      toast({
        title: 'تم التحديث',
        description: 'تم تحميل أحاديث جديدة من الخادم',
      });
    } catch (error) {
      console.error('Refresh failed:', error);
      toast({
        title: 'خطأ في التحديث',
        description: 'فشل في تحديث الأحاديث',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyHadith = (hadith: HadithSearchResult) => {
    const text = `${hadith.text}\n\nالراوي: ${hadith.narrator}\nالمصدر: ${hadith.source}\nالدرجة: ${hadith.grade}`;
    navigator.clipboard.writeText(text);
    toast({
      title: 'تم النسخ',
      description: 'تم نسخ الحديث إلى الحافظة',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-500" />
            محرك البحث في الأحاديث
          </div>
          <Button
            onClick={refreshHadiths}
            size="sm"
            variant="outline"
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
        </CardTitle>
        <p className="text-sm text-gray-600">ابحث في مجموعة شاملة من الأحاديث النبوية الشريفة من مصادر موثوقة</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <HadithSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          onSearch={handleSearch}
          isSearching={isSearching}
        />

        <HadithLoadingState isLoading={isLoading} isSearching={isSearching} />

        <HadithSearchResults
          results={results}
          onCopyHadith={copyHadith}
          isSearching={isSearching}
          isLoading={isLoading}
        />

        {/* API Status */}
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">مصدر البيانات</div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">🌐</span>
            <span className="text-gray-600">Hadith API</span>
            {(isLoading || isSearching) && <span className="text-blue-600">جاري التحديث...</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HadithSearchEngine;
