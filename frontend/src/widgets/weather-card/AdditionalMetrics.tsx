import { useUnits } from '../../features/toggle-units';
import { formatTempValue, formatWind, formatPrecip } from '../../shared/lib';
import styles from './AdditionalMetrics.module.css';

interface AdditionalMetricsProps {
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.item}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export function AdditionalMetrics({
  feelsLike,
  humidity,
  windSpeed,
  precipitation,
}: AdditionalMetricsProps) {
  const { units } = useUnits();

  return (
    <div className={styles.grid}>
      <MetricItem label="Ощущается как" value={`${formatTempValue(feelsLike, units)}°`} />
      <MetricItem label="Влажность" value={`${Math.round(humidity)}%`} />
      <MetricItem label="Ветер" value={formatWind(windSpeed, units)} />
      <MetricItem label="Осадки" value={formatPrecip(precipitation, units)} />
    </div>
  );
}
