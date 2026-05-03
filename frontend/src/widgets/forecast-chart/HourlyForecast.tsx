import { Icon } from '../../shared/ui';
import { getWeatherInfo } from '../../shared/config/weather-codes';
import { formatTempValue } from '../../shared/lib';
import { useUnits } from '../../features/toggle-units';
import type { HourlyForecast as HourlyForecastType } from '../../entities/weather';
import { DaySelector } from './DaySelector';
import styles from './HourlyForecast.module.css';
import { useMemo, useRef, useState, useEffect } from 'react';

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
}

function formatHour(timeStr: string): string {
  const date = new Date(timeStr);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function formatDayLabel(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { weekday: 'long' });
}

export function HourlyForecast({ hourly }: HourlyForecastProps) {
  const { units } = useUnits();

  const dayGroups = useMemo(() => {
    const groups: Map<string, { date: string; label: string; hours: HourlyForecastType[] }> =
      new Map();
    hourly.forEach((h) => {
      const date = h.time.split('T')[0];
      if (!groups.has(date)) {
        groups.set(date, { date, label: formatDayLabel(date), hours: [] });
      }
      groups.get(date)!.hours.push(h);
    });
    return Array.from(groups.values());
  }, [hourly]);

  const [selectedDay, setSelectedDay] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [selectedDay]);

  if (hourly.length === 0) return null;

  const currentGroup = dayGroups[selectedDay]?.hours ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Почасовой прогноз</h2>
        <DaySelector
          days={dayGroups.map((g) => ({ date: g.date, label: g.label }))}
          selectedIndex={selectedDay}
          onSelect={setSelectedDay}
        />
      </div>
      <div className={styles.scroll} ref={scrollRef}>
        {currentGroup.map((hour) => {
          const info = getWeatherInfo(hour.weathercode);
          return (
            <div key={hour.time} className={styles.hour}>
              <div className={styles.hourLeft}>
                <Icon src={info.icon} alt={info.description} size={28} />
                <span className={styles.time}>{formatHour(hour.time)}</span>
              </div>
              <span className={styles.temp}>{formatTempValue(hour.temperature, units)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
