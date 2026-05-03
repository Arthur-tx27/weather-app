import { useEffect, useRef, useState } from 'react';
import { useUnits } from './UnitContext';
import { UNIT_LABELS } from '../../shared/config/units';
import type { UnitSystem } from '../../shared/config/units';
import styles from './UnitDropdown.module.css';

export function UnitDropdown() {
  const { units, setUnits } = useUnits();
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

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <img src="/images/icon-units.svg" alt="" className={styles.icon} />
      <button
        className={styles.trigger}
        onClick={() => setIsOpen((v) => !v)}
        type="button"
      >
        <span>{UNIT_LABELS[units]}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {(Object.entries(UNIT_LABELS) as [UnitSystem, string][]).map(([key, label]) => (
            <button
              key={key}
              className={`${styles.option} ${key === units ? styles.optionActive : ''}`}
              onClick={() => {
                setUnits(key);
                setIsOpen(false);
              }}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
