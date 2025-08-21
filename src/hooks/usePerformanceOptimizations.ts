import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { debounce, throttle } from 'lodash-es';

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    apiResponseTime: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          setMetrics(prev => ({
            ...prev,
            loadTime: navEntry.loadEventEnd - navEntry.loadEventStart
          }));
        }
        
        if (entry.entryType === 'measure') {
          if (entry.name === 'component-render') {
            setMetrics(prev => ({
              ...prev,
              renderTime: entry.duration
            }));
          }
          if (entry.name.includes('api-call')) {
            setMetrics(prev => ({
              ...prev,
              apiResponseTime: entry.duration
            }));
          }
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'measure'] });

    // Monitor memory usage
    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / 1024 / 1024 // MB
        }));
      }
    };

    const memoryInterval = setInterval(checkMemory, 5000);

    return () => {
      observer.disconnect();
      clearInterval(memoryInterval);
    };
  }, []);

  const markStart = useCallback((name: string) => {
    performance.mark(`${name}-start`);
  }, []);

  const markEnd = useCallback((name: string) => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  }, []);

  return { metrics, markStart, markEnd };
};

// Optimized search hook with debouncing and caching
export const useOptimizedSearch = <T>(
  searchFunction: (query: string) => Promise<T[]>,
  debounceMs: number = 300,
  cacheSize: number = 50
) => {
  const [results, setResults] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const cache = useRef(new Map<string, T[]>());
  const cacheKeys = useRef<string[]>([]);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Check cache first
    if (cache.current.has(query)) {
      setResults(cache.current.get(query)!);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const searchResults = await searchFunction(query);
      
      // Update cache
      cache.current.set(query, searchResults);
      cacheKeys.current.push(query);
      
      // Maintain cache size limit
      if (cacheKeys.current.length > cacheSize) {
        const oldestKey = cacheKeys.current.shift()!;
        cache.current.delete(oldestKey);
      }
      
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [searchFunction, cacheSize]);

  const debouncedSearch = useMemo(
    () => debounce(performSearch, debounceMs),
    [performSearch, debounceMs]
  );

  const clearCache = useCallback(() => {
    cache.current.clear();
    cacheKeys.current = [];
  }, []);

  return {
    results,
    isSearching,
    error,
    search: debouncedSearch,
    clearCache
  };
};

// Enhanced caching hook for API responses
export const useApiCache = <T>(
  cacheKey: string,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
) => {
  const getCachedData = useCallback((): T | null => {
    try {
      const cached = localStorage.getItem(`api_cache_${cacheKey}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
          return data;
        } else {
          localStorage.removeItem(`api_cache_${cacheKey}`);
        }
      }
    } catch (error) {
      console.error('Cache read error:', error);
    }
    return null;
  }, [cacheKey, ttl]);

  const setCachedData = useCallback((data: T) => {
    try {
      localStorage.setItem(`api_cache_${cacheKey}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }, [cacheKey]);

  const clearCache = useCallback(() => {
    localStorage.removeItem(`api_cache_${cacheKey}`);
  }, [cacheKey]);

  return { getCachedData, setCachedData, clearCache };
};

// Throttled scroll hook for performance
export const useThrottledScroll = (callback: (scrollY: number) => void, delay: number = 100) => {
  const throttledCallback = useMemo(
    () => throttle(() => callback(window.scrollY), delay),
    [callback, delay]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
};

// Image lazy loading hook
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!imageRef || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
            observer.disconnect();
          };
          img.onerror = () => {
            setIsError(true);
            observer.disconnect();
          };
          img.src = src;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imageRef);

    return () => observer.disconnect();
  }, [imageRef, src]);

  return { imageSrc, setImageRef, isLoaded, isError };
};

// Component render optimization hook
export const useRenderOptimization = (componentName: string) => {
  const renderCount = useRef(0);
  const startTime = useRef<number>(0);

  useEffect(() => {
    renderCount.current += 1;
    startTime.current = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime.current;
      
      if (renderTime > 16) { // More than one frame (60fps)
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms (render #${renderCount.current})`);
      }
    };
  });

  return renderCount.current;
};