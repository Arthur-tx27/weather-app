import { useState, useEffect } from 'react';
import { getForecast } from '../../shared/api';
import type { WeatherForecast } from './weather.types';

interface UseWeatherResult {
  forecast: WeatherForecast | null;
  loading: boolean;
  error: string | null;
}

export function useWeatherForecast(
  city: string | null,
  latitude: number | null,
  longitude: number | null,
): UseWeatherResult {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city || latitude === null || longitude === null) {
      setForecast(null);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getForecast(city, latitude, longitude)
      .then((data) => {
        if (!cancelled) {
          setForecast(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load forecast');
          setForecast(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [city, latitude, longitude]);

  return { forecast, loading, error };
}
