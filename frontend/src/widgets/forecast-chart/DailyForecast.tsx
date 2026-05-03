import { Icon } from '../../shared/ui';
import { getWeatherInfo } from '../../shared/config/weather-codes';
import { formatTempValue } from '../../shared/lib';
import { useUnits } from '../../features/toggle-units';
import type { DailyForecast as DailyForecastType } from '../../entities/weather';
import styles from './DailyForecast.module.css';

interface DailyForecastProps {
  daily: DailyForecastType[];
}

function formatDay(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { weekday: 'short' });
}

export function DailyForecast({ daily }: DailyForecastProps) {
  const { units } = useUnits();

  if (daily.length === 0) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Прогноз на 7 дней</h2>
      <div className={styles.row}>
        {daily.map((day) => {
          const info = getWeatherInfo(day.weathercode);
          return (
            <div key={day.date} className={styles.day}>
              <span className={styles.dayName}>{formatDay(day.date)}</span>
              <Icon src={info.icon} alt={info.description} size={32} />
              <div className={styles.temps}>
                <span className={styles.max}>{formatTempValue(day.tempMax, units)}°</span>
                <span className={styles.min}>{formatTempValue(day.tempMin, units)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
