import type {
  WeatherResponse,
  WeatherForecast,
  HourlyForecast,
  CityResult,
} from './weather.types';

const API_URL = process.env.API_URL || 'https://api.open-meteo.com';
const GEOCODING_API_URL =
  process.env.GEOCODING_API_URL || 'https://geocoding-api.open-meteo.com';

interface GeocodingResult {
  name: string;
  country: string;
  admin1: string;
  latitude: number;
  longitude: number;
}

export async function searchCity(query: string): Promise<CityResult[]> {
  const url = new URL(`${GEOCODING_API_URL}/v1/search`);
  url.searchParams.set('name', query);
  url.searchParams.set('count', '5');
  url.searchParams.set('language', 'ru');

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Geocoding API error: ${res.status}`);
  }

  const data = (await res.json()) as { results?: GeocodingResult[] };
  return (data.results || []).map((item) => ({
    name: item.name,
    country: item.country,
    admin1: item.admin1,
    latitude: item.latitude,
    longitude: item.longitude,
  }));
}

export function getForecastByCoords(
  latitude: number,
  longitude: number,
): Promise<WeatherResponse> {
  const url = new URL(`${API_URL}/v1/forecast`);
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('current_weather', 'true');
  url.searchParams.set(
    'hourly',
    'temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,wind_speed_10m,weathercode',
  );
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum');
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('forecast_days', '7');

  return fetch(url.toString()).then((res) => {
    if (!res.ok) {
      throw new Error(`Open-Meteo API error: ${res.status}`);
    }
    return res.json() as Promise<WeatherResponse>;
  });
}

function mapHourly(response: WeatherResponse): HourlyForecast[] {
  const { hourly } = response;
  return hourly.time.map((_, i) => ({
    time: hourly.time[i],
    temperature: hourly.temperature_2m[i],
    feelsLike: hourly.apparent_temperature[i],
    humidity: hourly.relativehumidity_2m[i],
    precipitation: hourly.precipitation[i],
    windSpeed: hourly.wind_speed_10m[i],
    weathercode: hourly.weathercode?.[i] ?? 0,
  }));
}

export function mapToForecast(response: WeatherResponse, city: string): WeatherForecast {
  const { current_weather, daily, latitude, longitude } = response;

  const currentHourIndex = 0;

  return {
    city,
    latitude,
    longitude,
    current: {
      temperature: current_weather.temperature,
      feelsLike: response.hourly.apparent_temperature[currentHourIndex] ?? current_weather.temperature,
      humidity: response.hourly.relativehumidity_2m[currentHourIndex] ?? 0,
      precipitation: response.hourly.precipitation[currentHourIndex] ?? 0,
      windspeed: current_weather.windspeed,
      weathercode: current_weather.weathercode,
      time: current_weather.time,
    },
    hourly: mapHourly(response),
    daily: daily.time.map((date, i) => ({
      date,
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
      weathercode: daily.weathercode[i],
      precipitationSum: daily.precipitation_sum[i],
    })),
  };
}

export async function getWeatherForecast(
  city: string,
  latitude: number,
  longitude: number,
): Promise<WeatherForecast> {
  const data = await getForecastByCoords(latitude, longitude);
  return mapToForecast(data, city);
}
