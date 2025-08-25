import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface ApiErrorBoundaryProps {
  children: React.ReactNode;
  section?: string;
}

export const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({ children, section }) => {
  return (
    <ErrorBoundary fallback={<div>Error in {section || 'component'}</div>}>
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;