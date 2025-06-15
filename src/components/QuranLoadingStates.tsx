
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface QuranLoadingStatesProps {
  type: 'surahs' | 'content';
  selectedSurahName?: string;
}

const QuranLoadingStates: React.FC<QuranLoadingStatesProps> = ({
  type,
  selectedSurahName
}) => {
  if (type === 'surahs') {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <span className="ml-2 text-emerald-600">Loading Quran surahs...</span>
      </div>
    );
  }

  if (type === 'content') {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-emerald-600" />
            <div>
              <h3 className="text-lg font-semibold">Loading Surah...</h3>
              <p className="text-gray-600">
                {selectedSurahName 
                  ? `Loading ${selectedSurahName}...` 
                  : 'Please wait while we fetch the content'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default QuranLoadingStates;
