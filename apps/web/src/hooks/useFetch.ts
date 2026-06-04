import { useState, useEffect, useCallback, useRef } from 'react';

interface UseFetchOptions {
  skip?: boolean;
  onError?: (error: Error) => void;
  onSuccess?: (data: unknown) => void;
}

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(
  url: string | null,
  options: UseFetchOptions = {},
): UseFetchState<T> & { refetch: () => Promise<void> } {
  const { skip = false, onError, onSuccess } = options;

  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: !skip,
    error: null,
  });

  // Keep callbacks in refs so fetchData doesn't re-create when callers pass inline functions
  const onErrorRef = useRef(onError);
  const onSuccessRef = useRef(onSuccess);
  onErrorRef.current = onError;
  onSuccessRef.current = onSuccess;

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!url || skip) return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setState({ data: data as T, loading: false, error: null });
      onSuccessRef.current?.(data);
    } catch (error) {
      if ((error as DOMException).name === 'AbortError') return;
      const err = error instanceof Error ? error : new Error('Unknown error');
      setState({ data: null, loading: false, error: err });
      onErrorRef.current?.(err);
    }
  }, [url, skip]);

  useEffect(() => {
    fetchData();
    return () => { controllerRef.current?.abort(); };
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
