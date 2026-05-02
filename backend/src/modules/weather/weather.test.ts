import {
  getForecastByCoords,
  getWeatherForecast,
  searchCity,
} from './weather.service';

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe('weather.service', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  const mockGeocodingResponse = {
    results: [
      { name: 'Moscow', country: 'Russia', admin1: 'Moscow', latitude: 55.75, longitude: 37.61 },
      { name: 'Moscow', country: 'United States', admin1: 'Pennsylvania', latitude: 41.34, longitude: -75.52 },
    ],
  };

  const mockForecastResponse = {
    latitude: 55.75,
    longitude: 37.61,
    current_weather: {
      temperature: 15,
      windspeed: 10,
      weathercode: 1,
      time: '2025-01-01T10:00',
    },
    hourly: {
      time: ['2025-01-01T10:00', '2025-01-01T11:00'],
      temperature_2m: [15, 16],
      apparent_temperature: [13, 14],
      relativehumidity_2m: [60, 58],
      precipitation: [0, 0.2],
      wind_speed_10m: [10, 12],
      weathercode: [1, 2],
    },
    daily: {
      time: ['2025-01-01', '2025-01-02'],
      temperature_2m_max: [18, 20],
      temperature_2m_min: [10, 12],
      weathercode: [1, 2],
      precipitation_sum: [0, 1.5],
    },
  };

  describe('searchCity', () => {
    it('returns mapped city results', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGeocodingResponse),
      });

      const results = await searchCity('Moscow');
      expect(results).toHaveLength(2);
      expect(results[0].name).toBe('Moscow');
      expect(results[0].latitude).toBe(55.75);
    });

    it('returns empty array when no results', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

      const results = await searchCity('xyz');
      expect(results).toHaveLength(0);
    });

    it('throws on API error', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

      await expect(searchCity('Moscow')).rejects.toThrow('Geocoding API error: 500');
    });
  });

  describe('getForecastByCoords', () => {
    it('fetches forecast with hourly and daily data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockForecastResponse),
      });

      const result = await getForecastByCoords(55.75, 37.61);
      expect(result.current_weather.temperature).toBe(15);
      expect(result.hourly.time).toHaveLength(2);
      expect(result.daily.precipitation_sum).toEqual([0, 1.5]);
    });

    it('throws on API error', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

      await expect(getForecastByCoords(55.75, 37.61)).rejects.toThrow(
        'Open-Meteo API error: 500',
      );
    });
  });

  describe('getWeatherForecast', () => {
    it('maps response to full forecast with hourly and extended daily', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockForecastResponse),
      });

      const forecast = await getWeatherForecast('Moscow', 55.75, 37.61);

      expect(forecast.city).toBe('Moscow');
      expect(forecast.current.temperature).toBe(15);
      expect(forecast.current.feelsLike).toBe(13);
      expect(forecast.current.humidity).toBe(60);
      expect(forecast.current.precipitation).toBe(0);

      expect(forecast.hourly).toHaveLength(2);
      expect(forecast.hourly[0].temperature).toBe(15);
      expect(forecast.hourly[0].windSpeed).toBe(10);

      expect(forecast.daily).toHaveLength(2);
      expect(forecast.daily[0].precipitationSum).toBe(0);
      expect(forecast.daily[1].precipitationSum).toBe(1.5);
    });
  });
});
