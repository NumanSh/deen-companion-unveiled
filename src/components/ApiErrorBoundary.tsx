import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface ApiErrorBoundaryProps {
  children: React.ReactNode;
  section?: string;
  apiName?: string;
  fallbackData?: any[];
  onRetry?: () => void;
}

export const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({ 
  children, 
  section, 
  apiName, 
  fallbackData, 
  onRetry 
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <ErrorBoundary fallback={
      <div className="p-4 text-center">
        <p>Error in {section || apiName || 'component'}</p>
        {onRetry && (
          <button 
            onClick={handleRetry}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        )}
      </div>
    }>
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;