import { useState } from 'react';
import { SearchCity } from '../../features/search-city';
import { UnitDropdown } from '../../features/toggle-units';
import { CurrentWeatherCard } from '../../widgets/weather-card';
import { DailyForecast } from '../../widgets/forecast-chart';
import { HourlyForecast } from '../../widgets/forecast-chart';
import { useWeatherForecast } from '../../entities/weather';
import type { City } from '../../entities/city';
import styles from './HomePage.module.css';

export function HomePage() {
  const [city, setCity] = useState<City | null>(null);

  const {
    forecast,
    loading,
    error,
  } = useWeatherForecast(
    city?.name ?? null,
    city?.latitude ?? null,
    city?.longitude ?? null,
  );

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
            <CurrentWeatherCard
              city={city.name}
              current={forecast?.current ?? null}
              loading={loading}
              error={error}
            />

            {hasData && (
              <>
                <DailyForecast daily={forecast!.daily} />
                <HourlyForecast hourly={forecast!.hourly} />
              </>
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
