import { useEffect } from 'react';

export const usePerformanceOptimizations = () => {
  useEffect(() => {
    // Performance monitoring and optimizations
    const observer = new PerformanceObserver((list) => {
      console.log('Performance metrics:', list.getEntries());
    });
    
    observer.observe({ type: 'navigation', buffered: true });
    observer.observe({ type: 'resource', buffered: true });
    
    return () => observer.disconnect();
  }, []);
};

export const usePerformanceMonitoring = () => {
  const markStart = (name: string) => {
    performance.mark(`${name}-start`);
  };

  const markEnd = (name: string) => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  };

  return { markStart, markEnd };
};