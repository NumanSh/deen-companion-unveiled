import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Book, Clock, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedLoadingStatesProps {
  type: 'quran-list' | 'quran-content' | 'prayer-times' | 'hadith-search' | 'general';
  title?: string;
  description?: string;
  showProgress?: boolean;
  progress?: number;
  className?: string;
}

const EnhancedLoadingStates: React.FC<EnhancedLoadingStatesProps> = ({
  type,
  title,
  description,
  showProgress = false,
  progress = 0,
  className
}) => {
  const getIcon = () => {
    switch (type) {
      case 'quran-list':
      case 'quran-content':
        return Book;
      case 'prayer-times':
        return Clock;
      case 'hadith-search':
        return Search;
      default:
        return Loader2;
    }
  };

  const Icon = getIcon();

  if (type === 'quran-list') {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
          <span className="text-primary" role="status" aria-live="polite">
            {title || 'Loading Quran chapters...'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-4" />
                </div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'quran-content') {
    return (
      <Card className={cn("", className)}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2" role="status" aria-live="polite">
              {title || 'Loading Surah Content...'}
            </h3>
            <p className="text-muted-foreground">
              {description || 'Please wait while we fetch the verses'}
            </p>
            {showProgress && (
              <div className="mt-4 max-w-xs mx-auto">
                <div className="bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
              </div>
            )}
          </div>
          
          {/* Skeleton verses */}
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b border-border pb-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
                <div className="space-y-3 mb-4" dir="rtl">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-8 w-5/6" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'prayer-times') {
    return (
      <Card className={cn("", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <Clock className="w-8 h-8 animate-pulse text-primary mx-auto mb-2" />
            <p className="text-primary" role="status" aria-live="polite">
              {title || 'Loading prayer times...'}
            </p>
          </div>
          
          {/* Next prayer skeleton */}
          <Card>
            <CardContent className="p-4 text-center">
              <Skeleton className="h-4 w-20 mx-auto mb-2" />
              <Skeleton className="h-6 w-32 mx-auto mb-1" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </CardContent>
          </Card>

          {/* Prayer times skeleton */}
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'hadith-search') {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center justify-center py-4">
          <Search className="w-6 h-6 animate-pulse text-primary mr-2" />
          <span className="text-primary" role="status" aria-live="polite">
            {title || 'Searching Hadith collection...'}
          </span>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Skeleton className="h-4 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // General loading state
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className="text-center space-y-4">
        <Icon className="w-12 h-12 animate-spin mx-auto text-primary" />
        <div>
          <h3 className="text-lg font-semibold" role="status" aria-live="polite">
            {title || 'Loading...'}
          </h3>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        {showProgress && (
          <div className="max-w-xs mx-auto">
            <div className="bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedLoadingStates;