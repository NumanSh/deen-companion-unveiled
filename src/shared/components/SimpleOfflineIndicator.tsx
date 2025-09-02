import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw } from 'lucide-react';

interface SimpleOfflineIndicatorProps {
  className?: string;
  onRetry?: () => void;
}

const SimpleOfflineIndicator: React.FC<SimpleOfflineIndicatorProps> = ({ 
  className, 
  onRetry 
}) => {
  return (
    <Alert className={`border-orange-200 bg-orange-50 ${className}`}>
      <WifiOff className="h-4 w-4 text-orange-600" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-orange-800">
          You're offline. Some features may not work properly.
        </span>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default SimpleOfflineIndicator;