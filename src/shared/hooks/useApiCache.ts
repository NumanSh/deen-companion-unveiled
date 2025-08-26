import { useState } from 'react';

export const useApiCache = () => {
  const [cache, setCache] = useState(new Map());

  const getCached = (key: string) => {
    return cache.get(key);
  };

  const setCacheData = (key: string, data: any) => {
    setCache(prev => new Map(prev).set(key, data));
  };

  const clearCache = () => {
    setCache(new Map());
  };

  return { getCached, setCache: setCacheData, clearCache };
};