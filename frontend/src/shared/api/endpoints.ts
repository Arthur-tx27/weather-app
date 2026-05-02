import { httpClient } from './client';
import type { City } from '../../entities/city/city.types';
import type { WeatherForecast } from '../../entities/weather/weather.types';

interface ApiResponse<T> {
  data?: T;
  error?: { message: string; code: number };
}

export async function searchCity(q: string): Promise<City[]> {
  const res = await httpClient.get<ApiResponse<City[]>>('/weather/search', { q });
  if (res.error) throw new Error(res.error.message);
  return res.data ?? [];
}

export async function getForecast(
  city: string,
  latitude: number,
  longitude: number,
): Promise<WeatherForecast> {
  const res = await httpClient.get<ApiResponse<WeatherForecast>>('/weather/forecast', {
    city,
    latitude: String(latitude),
    longitude: String(longitude),
  });
  if (res.error) throw new Error(res.error.message);
  if (!res.data) throw new Error('No forecast data');
  return res.data;
}
