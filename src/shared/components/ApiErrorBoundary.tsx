import React, { Component, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wifi, WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorInfo {
  componentStack: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface Props {
  children: ReactNode;
  apiName?: string;
  fallbackData?: unknown;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  isOnline: boolean;
  retryCount: number;
}

class ApiErrorBoundary extends Component<Props, State> {
  private retryTimer: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      isOnline: navigator.onLine,
      retryCount: 0
    };
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }
  }

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
      isOnline: navigator.onLine,
      retryCount: 0
    };
  }

  handleOnline = () => {
    this.setState({ isOnline: true });
    if (this.state.hasError) {
      this.handleRetryWithBackoff();
    }
  };

  handleOffline = () => {
    this.setState({ isOnline: false });
  };

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      retryCount: this.state.retryCount + 1 
    });
    this.props.onRetry?.();
  };

  handleRetryWithBackoff = () => {
    const delay = Math.min(1000 * Math.pow(2, this.state.retryCount), 30000);
    
    this.retryTimer = setTimeout(() => {
      this.handleRetry();
    }, delay);
  };

  render() {
    if (this.state.hasError) {
      const { apiName = 'API', fallbackData } = this.props;
      
      return (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              {apiName} Connection Issue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <div className="flex items-center gap-2">
                {this.state.isOnline ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription>
                  {this.state.isOnline 
                    ? `Unable to connect to ${apiName}. The service might be temporarily unavailable.`
                    : 'You appear to be offline. Please check your internet connection.'
                  }
                </AlertDescription>
              </div>
            </Alert>

            {fallbackData && (
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Good news:</strong> We're showing you cached content while we try to reconnect.
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={this.handleRetry} 
                className="flex items-center gap-2"
                disabled={!this.state.isOnline}
              >
                <RefreshCw className="w-4 h-4" />
                Retry Connection
              </Button>
              
              {this.state.retryCount > 0 && (
                <Button 
                  variant="outline" 
                  onClick={this.handleRetryWithBackoff}
                  className="flex items-center gap-2"
                >
                  Auto Retry ({Math.ceil((Math.min(1000 * Math.pow(2, this.state.retryCount), 30000)) / 1000)}s)
                </Button>
              )}
            </div>

            {this.state.retryCount > 3 && (
              <div className="text-sm text-gray-600">
                <p>Having trouble connecting? Try:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Checking your internet connection</li>
                  <li>Refreshing the entire page</li>
                  <li>Trying again in a few minutes</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ApiErrorBoundary;