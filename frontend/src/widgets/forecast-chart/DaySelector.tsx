import styles from './DaySelector.module.css';

interface DaySelectorProps {
  days: Array<{ date: string; label: string }>;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function DaySelector({ days, selectedIndex, onSelect }: DaySelectorProps) {
  if (days.length <= 1) return null;

  return (
    <select
      className={styles.select}
      value={selectedIndex}
      onChange={(e) => onSelect(Number(e.target.value))}
    >
      {days.map((day, i) => (
        <option key={day.date} value={i}>
          {day.label}
        </option>
      ))}
    </select>
  );
}
