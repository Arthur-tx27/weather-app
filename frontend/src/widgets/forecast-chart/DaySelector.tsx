import { useEffect, useRef, useState } from 'react';
import { useSelectedDay } from '../../entities/weather';
import styles from './DaySelector.module.css';

interface DaySelectorProps {
  days: Array<{ date: string; label: string }>;
}

export function DaySelector({ days }: DaySelectorProps) {
  const { selectedDay, selectDay } = useSelectedDay();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (days.length <= 1) return null;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen((v) => !v)}
        type="button"
      >
        <span>{days[selectedDay]?.label}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {days.map((day, i) => (
            <button
              key={day.date}
              className={`${styles.option} ${i === selectedDay ? styles.optionActive : ''}`}
              onClick={() => {
                selectDay(i);
                setIsOpen(false);
              }}
              type="button"
            >
              {day.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
