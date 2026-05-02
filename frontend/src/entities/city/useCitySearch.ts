import { useState, useEffect, useRef, useCallback } from 'react';
import { searchCity } from '../../shared/api';
import type { City } from './city.types';

interface UseCitySearchResult {
  query: string;
  results: City[];
  loading: boolean;
  error: string | null;
  setQuery: (q: string) => void;
  clearResults: () => void;
}

export function useCitySearch(debounceMs = 300): UseCitySearchResult {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    timerRef.current = setTimeout(async () => {
      try {
        const data = await searchCity(query.trim());
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, debounceMs]);

  return { query, results, loading, error, setQuery, clearResults };
}
