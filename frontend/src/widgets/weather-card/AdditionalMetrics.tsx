import styles from './AdditionalMetrics.module.css';

interface AdditionalMetricsProps {
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

function MetricItem({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className={styles.item}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        {Math.round(value)}
        {unit}
      </span>
    </div>
  );
}

export function AdditionalMetrics({
  feelsLike,
  humidity,
  windSpeed,
  precipitation,
}: AdditionalMetricsProps) {
  return (
    <div className={styles.grid}>
      <MetricItem label="Ощущается как" value={feelsLike} unit="°" />
      <MetricItem label="Влажность" value={humidity} unit="%" />
      <MetricItem label="Ветер" value={windSpeed} unit=" км/ч" />
      <MetricItem label="Осадки" value={precipitation} unit=" мм" />
    </div>
  );
}
