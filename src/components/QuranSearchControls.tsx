
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, TrendingUp } from 'lucide-react';

interface QuranSearchControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAdvancedSearchClick: () => void;
  onProgressClick: () => void;
}

const QuranSearchControls: React.FC<QuranSearchControlsProps> = ({
  searchTerm,
  onSearchChange,
  onAdvancedSearchClick,
  onProgressClick
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search surahs by name, meaning, or number..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onAdvancedSearchClick}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Advanced Search
        </Button>
        <Button
          variant="outline"
          onClick={onProgressClick}
          className="flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Progress
        </Button>
      </div>
    </div>
  );
};

export default QuranSearchControls;
