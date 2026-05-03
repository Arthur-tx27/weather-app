import { useEffect, useMemo, useState } from 'react';
import { SearchCity } from '../../features/search-city';
import { UnitDropdown } from '../../features/toggle-units';
import { CurrentWeatherCard } from '../../widgets/weather-card';
import { DailyForecast } from '../../widgets/forecast-chart';
import { HourlyForecast } from '../../widgets/forecast-chart';
import { useWeatherForecast, useSelectedDay } from '../../entities/weather';
import type { City } from '../../entities/city';
import type { CurrentWeather } from '../../entities/weather';
import styles from './HomePage.module.css';

export function HomePage() {
  const [city, setCity] = useState<City | null>(null);
  const { selectedDay, selectDay } = useSelectedDay();

  const {
    forecast,
    loading,
    error,
  } = useWeatherForecast(
    city?.name ?? null,
    city?.latitude ?? null,
    city?.longitude ?? null,
  );

  useEffect(() => {
    selectDay(0);
  }, [forecast, selectDay]);

  const currentWeatherData = useMemo<CurrentWeather | null>(() => {
    if (!forecast) return null;
    if (selectedDay === 0) return forecast.current;
    const date = forecast.daily[selectedDay]?.date;
    if (!date) return null;
    const hourly = forecast.hourly.find((h) => h.time.startsWith(date));
    if (!hourly) return forecast.current;
    return {
      temperature: hourly.temperature,
      feelsLike: hourly.feelsLike,
      humidity: hourly.humidity,
      precipitation: hourly.precipitation,
      windspeed: hourly.windSpeed,
      weathercode: hourly.weathercode,
      time: hourly.time,
    };
  }, [forecast, selectedDay]);

  const handleCitySelect = (selected: City) => {
    setCity(selected);
  };

  const hasData = forecast !== null && !loading && !error;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img src="/images/logo.svg" alt="Weather App" className={styles.logo} />
        <UnitDropdown />
      </header>

      <main className={styles.main}>
        <SearchCity onCitySelect={handleCitySelect} />

        {city && (
          <div className={styles.results}>
            <div className={styles.leftColumn}>
              <CurrentWeatherCard
                city={city.name}
                current={currentWeatherData}
                loading={loading}
                error={error}
              />

              {hasData && <DailyForecast daily={forecast.daily} />}
            </div>

            {hasData && (
              <div className={styles.rightColumn}>
                <HourlyForecast hourly={forecast!.hourly} />
              </div>
            )}
          </div>
        )}

        {!city && (
          <p className={styles.hint}>
            Введите название города, чтобы узнать погоду
          </p>
        )}
      </main>
    </div>
  );
}
