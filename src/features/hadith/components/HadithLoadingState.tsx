
import React from 'react';

interface HadithLoadingStateProps {
  isLoading: boolean;
  isSearching: boolean;
}

const HadithLoadingState: React.FC<HadithLoadingStateProps> = ({ isLoading, isSearching }) => {
  if (!isLoading && !isSearching) return null;

  return (
    <div className="text-center py-8">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-gray-600">{isLoading ? 'جاري تحميل الأحاديث...' : 'جاري البحث...'}</p>
    </div>
  );
};

export default HadithLoadingState;
