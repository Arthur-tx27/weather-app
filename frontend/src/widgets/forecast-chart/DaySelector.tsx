import styles from './DaySelector.module.css';

interface DaySelectorProps {
  days: Array<{ date: string; label: string }>;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function DaySelector({ days, selectedIndex, onSelect }: DaySelectorProps) {
  if (days.length <= 1) return null;

  return (
    <div className={styles.selector}>
      {days.map((day, i) => (
        <button
          key={day.date}
          className={`${styles.day} ${i === selectedIndex ? styles.active : ''}`}
          onClick={() => onSelect(i)}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}
