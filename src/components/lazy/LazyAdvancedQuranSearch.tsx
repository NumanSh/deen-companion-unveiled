import React, { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';

// Lazy load the AdvancedQuranSearch component
const AdvancedQuranSearchComponent = React.lazy(() => 
  import('@/features/quran/components/AdvancedQuranSearch').then((module) => ({
    default: module.default || module.AdvancedQuranSearch
  })).catch(() => ({
    default: () => <div className="p-4 text-center">Advanced search temporarily unavailable</div>
  }))
);

export const LazyAdvancedQuranSearch: React.FC<any> = (props) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdvancedQuranSearchComponent {...props} />
    </Suspense>
  );
};

export default LazyAdvancedQuranSearch;