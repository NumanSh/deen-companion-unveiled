
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface MainHeaderProps {
  onSearchClick: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ onSearchClick }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Deen Companion</h1>
      <Button
        variant="outline"
        onClick={onSearchClick}
        className="flex items-center gap-2"
      >
        <Search className="w-4 h-4" />
        Search All
      </Button>
    </div>
  );
};

export default MainHeader;
