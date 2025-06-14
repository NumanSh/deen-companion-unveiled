
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, Star, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const sources = ['الكل', 'صحيح البخاري', 'صحيح مسلم', 'سنن أبي داود', 'جامع الترمذي', 'سنن النسائي'];
  const grades = ['الكل', 'صحيح', 'حسن', 'ضعيف'];

  const mockResults: HadithSearchResult[] = [
    {
      id: '1',
      text: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى',
      narrator: 'عمر بن الخطاب',
      source: 'صحيح البخاري',
      book: 'كتاب بدء الوحي',
      chapter: 'باب كيف كان بدء الوحي',
      grade: 'صحيح',
      topic: ['النية', 'الإخلاص', 'العبادة']
    },
    {
      id: '2',
      text: 'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت',
      narrator: 'أبو هريرة',
      source: 'صحيح البخاري',
      book: 'كتاب الأدب',
      chapter: 'باب من كان يؤمن بالله واليوم الآخر',
      grade: 'صحيح',
      topic: ['الكلام', 'الآداب', 'الصمت']
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setResults(mockResults);
    setIsSearching(false);
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
        <CardTitle className="flex items-center gap-2">
          <Search className="w-6 h-6 text-blue-500" />
          محرك البحث في الأحاديث
        </CardTitle>
        <p className="text-sm text-gray-600">ابحث في مئات الآلاف من الأحاديث النبوية الشريفة</p>
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

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">جاري البحث...</p>
          </div>
        )}

        {results.length > 0 && (
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
      </CardContent>
    </Card>
  );
};

export default HadithSearchEngine;
