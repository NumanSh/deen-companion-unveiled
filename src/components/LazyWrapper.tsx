import React, { Suspense, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  minHeight?: string;
}

const DefaultFallback = ({ minHeight = 'h-32' }: { minHeight?: string }) => (
  <Card className={minHeight}>
    <CardContent className="flex items-center justify-center h-full">
      <div className="text-center space-y-2">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-600" />
        <p className="text-sm text-gray-600">Loading component...</p>
      </div>
    </CardContent>
  </Card>
);

const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback = <DefaultFallback />, 
  minHeight 
}) => {
  return (
    <Suspense fallback={fallback || <DefaultFallback minHeight={minHeight} />}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;