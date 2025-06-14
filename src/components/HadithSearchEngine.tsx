
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, Star, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchRandomHadiths, searchHadiths } from '@/services/hadithApi';

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

  const sources = ['الكل', 'صحيح البخاري', 'صحيح مسلم', 'سنن أبي داود', 'جامع الترمذي', 'سنن النسائي'];
  const grades = ['الكل', 'صحيح', 'حسن', 'ضعيف'];

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

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'صحيح': return 'bg-green-100 text-green-800';
      case 'حسن': return 'bg-yellow-100 text-yellow-800';
      case 'ضعيف': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
        {/* Search Interface */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="ابحث في نص الحديث، الراوي، أو الموضوع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">المصدر:</span>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">الدرجة:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {(isSearching || isLoading) && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">{isLoading ? 'جاري تحميل الأحاديث...' : 'جاري البحث...'}</p>
          </div>
        )}

        {/* Search Results */}
        {results.length > 0 && !isSearching && !isLoading && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">نتائج البحث ({results.length})</h3>
            {results.map((hadith) => (
              <div key={hadith.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <Badge className={getGradeColor(hadith.grade)}>{hadith.grade}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyHadith(hadith)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-lg leading-relaxed mb-3 text-right">
                  {hadith.text}
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>الراوي:</strong> {hadith.narrator}</div>
                  <div><strong>المصدر:</strong> {hadith.source} - {hadith.book}</div>
                  <div><strong>الباب:</strong> {hadith.chapter}</div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {hadith.topic.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && !isSearching && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <div className="relative mb-6">
              <BookOpen className="w-16 h-16 mx-auto opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-6 h-6 opacity-50" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">لم يتم العثور على أحاديث</h3>
            <p className="text-sm">جرب تعديل كلمات البحث أو المرشحات</p>
          </div>
        )}

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
