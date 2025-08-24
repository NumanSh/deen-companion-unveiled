
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MainHeaderProps {
  onSearchClick: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ onSearchClick }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">{t('app-name')}</h1>
      <Button
        variant="outline"
        onClick={onSearchClick}
        className="flex items-center gap-2"
      >
        <Search className="w-4 h-4" />
        {t('search')} {t('all')}
      </Button>
    </div>
  );
};

export default MainHeader;
