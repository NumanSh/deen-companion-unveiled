import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WifiOff, Wifi, RefreshCw, Download } from 'lucide-react';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
  className?: string;
  showDetails?: boolean;
  onRetry?: () => void;
  onDownloadOfflineContent?: () => void;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  className,
  showDetails = false,
  onRetry,
  onDownloadOfflineContent
}) => {
  const { isOnline, isOffline, wasOffline } = useOfflineStatus();

  if (isOnline && !wasOffline) {
    return null;
  }

  if (showDetails) {
    return (
      <Card className={cn("border-destructive bg-destructive/5", className)}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {isOffline ? (
                <WifiOff className="w-6 h-6 text-destructive" />
              ) : (
                <Wifi className="w-6 h-6 text-green-600" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm">
                {isOffline ? 'You are offline' : 'Connection restored'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {isOffline 
                  ? 'Some features may be limited. Using cached content when available.'
                  : 'All features are now available. Content will sync automatically.'
                }
              </p>
            </div>

            <div className="flex gap-2">
              {isOffline && onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="h-8"
                  aria-label="Retry connection"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Retry
                </Button>
              )}
              
              {isOffline && onDownloadOfflineContent && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDownloadOfflineContent}
                  className="h-8"
                  aria-label="Download content for offline use"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Offline
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Compact indicator
  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
      isOffline 
        ? "bg-destructive/10 text-destructive border border-destructive/20" 
        : "bg-green-50 text-green-700 border border-green-200",
      className
    )}>
      {isOffline ? (
        <WifiOff className="w-4 h-4" />
      ) : (
        <Wifi className="w-4 h-4" />
      )}
      <span>
        {isOffline ? 'Offline mode' : 'Back online'}
      </span>
      
      {isOffline && onRetry && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRetry}
          className="h-6 px-2 ml-2"
          aria-label="Retry connection"
        >
          <RefreshCw className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};

export default OfflineIndicator;