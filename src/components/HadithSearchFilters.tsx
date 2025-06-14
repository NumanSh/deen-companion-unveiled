
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface HadithSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  selectedGrade: string;
  setSelectedGrade: (grade: string) => void;
  onSearch: () => void;
  isSearching: boolean;
}

const HadithSearchFilters: React.FC<HadithSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSource,
  setSelectedSource,
  selectedGrade,
  setSelectedGrade,
  onSearch,
  isSearching
}) => {
  const sources = ['الكل', 'صحيح البخاري', 'صحيح مسلم', 'سنن أبي داود', 'جامع الترمذي', 'سنن النسائي'];
  const grades = ['الكل', 'صحيح', 'حسن', 'ضعيف'];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="ابحث في نص الحديث، الراوي، أو الموضوع..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
        <Button onClick={onSearch} disabled={isSearching}>
          <Search className="w-4 h-4" />
        </Button>
      </div>

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
  );
};

export default HadithSearchFilters;
