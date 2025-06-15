
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, BookOpen, Search } from 'lucide-react';

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

interface HadithSearchResultsProps {
  results: HadithSearchResult[];
  onCopyHadith: (hadith: HadithSearchResult) => void;
  isSearching: boolean;
  isLoading: boolean;
}

type HadithGrade = 'صحيح' | 'حسن' | 'ضعيف';

const HadithSearchResults: React.FC<HadithSearchResultsProps> = ({
  results,
  onCopyHadith,
  isSearching,
  isLoading
}) => {
  const getGradeColor = (grade: HadithGrade): string => {
    const gradeColors: Record<HadithGrade, string> = {
      'صحيح': 'bg-green-100 text-green-800',
      'حسن': 'bg-yellow-100 text-yellow-800',
      'ضعيف': 'bg-red-100 text-red-800'
    };
    return gradeColors[grade] || 'bg-gray-100 text-gray-800';
  };

  if (isSearching || isLoading) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500" role="status" aria-live="polite">
        <div className="relative mb-6">
          <BookOpen className="w-16 h-16 mx-auto opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-6 h-6 opacity-50" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">لم يتم العثور على أحاديث</h3>
        <p className="text-sm">جرب تعديل كلمات البحث أو المرشحات</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg" role="status" aria-live="polite">
        نتائج البحث ({results.length})
      </h3>
      {results.map((hadith) => (
        <article key={hadith.id} className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-3">
            <Badge className={getGradeColor(hadith.grade)} aria-label={`درجة الحديث: ${hadith.grade}`}>
              {hadith.grade}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopyHadith(hadith)}
              className="text-gray-500 hover:text-gray-700"
              aria-label={`نسخ الحديث: ${hadith.text.substring(0, 50)}...`}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          
          <blockquote className="text-lg leading-relaxed mb-3 text-right">
            {hadith.text}
          </blockquote>
          
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>الراوي:</strong> {hadith.narrator}</div>
            <div><strong>المصدر:</strong> {hadith.source} - {hadith.book}</div>
            <div><strong>الباب:</strong> {hadith.chapter}</div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3" role="list" aria-label="مواضيع الحديث">
            {hadith.topic.map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs" role="listitem">
                {topic}
              </Badge>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default HadithSearchResults;
