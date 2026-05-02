import { Icon } from '../../shared/ui';
import { getWeatherInfo } from '../../shared/config/weather-codes';
import type { CurrentWeather } from '../../entities/weather';
import { AdditionalMetrics } from './AdditionalMetrics';
import styles from './CurrentWeatherCard.module.css';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface CurrentWeatherCardProps {
  city: string;
  current: CurrentWeather | null;
  loading: boolean;
  error: string | null;
}

export function CurrentWeatherCard({ city, current, loading, error }: CurrentWeatherCardProps) {
  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonLine} style={{ width: '40%' }} />
          <div className={styles.skeletonLine} style={{ width: '25%' }} />
          <div className={styles.skeletonTemp} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <div className={styles.errorBlock}>
          <Icon src="/images/icon-error.svg" alt="" size={48} />
          <p className={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  if (!current) {
    return null;
  }

  const info = getWeatherInfo(current.weathercode);
  const dateFormatted = formatDate(current.time);

  return (
    <div className={styles.card}>
      <div className={styles.bgOverlay} />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.city}>{city}</h1>
          <p className={styles.date}>{dateFormatted}</p>
        </div>
        <div className={styles.main}>
          <Icon src={info.icon} alt={info.description} size={72} />
          <span className={styles.temp}>{Math.round(current.temperature)}°</span>
        </div>
        <p className={styles.description}>{info.description}</p>
        <AdditionalMetrics
          feelsLike={current.feelsLike}
          humidity={current.humidity}
          windSpeed={current.windspeed}
          precipitation={current.precipitation}
        />
      </div>
    </div>
  );
}
