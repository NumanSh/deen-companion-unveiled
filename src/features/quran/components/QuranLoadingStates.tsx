
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { EnhancedLoadingStates } from '@/shared';

interface QuranLoadingStatesProps {
  type: 'surahs' | 'content';
  selectedSurahName?: string;
}

const QuranLoadingStates: React.FC<QuranLoadingStatesProps> = ({
  type,
  selectedSurahName
}) => {
  if (type === 'surahs') {
    return <EnhancedLoadingStates type="quran-list" title="Loading Quran chapters..." />;
  }

  if (type === 'content') {
    return (
      <EnhancedLoadingStates 
        type="quran-content" 
        title="Loading Surah Content..."
        description={selectedSurahName 
          ? `Loading ${selectedSurahName}...` 
          : 'Please wait while we fetch the verses'
        }
      />
    );
  }

  return null;
};

export default QuranLoadingStates;
