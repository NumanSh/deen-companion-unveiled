import { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash-es';

export const useOptimizedSearch = (initialQuery = '', debounceMs = 300) => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  const debouncedSetQuery = useMemo(
    () => debounce((newQuery: string) => {
      setDebouncedQuery(newQuery);
    }, debounceMs),
    [debounceMs]
  );

  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    debouncedSetQuery(newQuery);
  }, [debouncedSetQuery]);

  const clearQuery = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    debouncedSetQuery.cancel();
  }, [debouncedSetQuery]);

  return {
    query,
    debouncedQuery,
    updateQuery,
    clearQuery,
    isSearching: query !== debouncedQuery
  };
};