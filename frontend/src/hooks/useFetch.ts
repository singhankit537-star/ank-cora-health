/**
 * Custom hook: useFetch
 * Demonstrates: useState, useEffect, useCallback, useMemo
 * Handles loading, error, and data states with caching
 */

import { useState, useEffect, useCallback, useMemo } from 'react';

interface UseFetchOptions {
  skip?: boolean;
  cache?: boolean;
  onError?: (error: Error) => void;
  onSuccess?: (data: unknown) => void;
}

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Simple in-memory cache for fetch results
const fetchCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useFetch<T>(
  url: string | null,
  options: UseFetchOptions = {},
): UseFetchState<T> & {
  refetch: () => Promise<void>;
  invalidateCache: () => void;
} {
  const { skip = false, cache = true, onError, onSuccess } = options;

  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: !skip,
    error: null,
  });

  // Memoize cache key to prevent unnecessary recalculations
  const cacheKey = useMemo(() => url || '', [url]);

  // Invalidate cache for this URL
  const invalidateCache = useCallback(() => {
    fetchCache.delete(cacheKey);
  }, [cacheKey]);

  // Fetch function with caching support
  const fetchData = useCallback(async () => {
    if (!url || skip) return;

    // Check cache first
    if (cache) {
      const cached = fetchCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setState({
          data: cached.data as T,
          loading: false,
          error: null,
        });
        onSuccess?.(cached.data);
        return;
      }
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache the result
      if (cache) {
        fetchCache.set(cacheKey, { data, timestamp: Date.now() });
      }

      setState({
        data: data as T,
        loading: false,
        error: null,
      });

      onSuccess?.(data);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');

      setState({
        data: null,
        loading: false,
        error: err,
      });

      onError?.(err);
    }
  }, [url, skip, cache, cacheKey, onError, onSuccess]);

  // Fetch on mount and when URL changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
    invalidateCache,
  };
}
