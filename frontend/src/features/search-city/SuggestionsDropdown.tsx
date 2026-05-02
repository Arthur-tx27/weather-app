import { useEffect, useRef, useCallback } from 'react';
import type { City } from '../../entities/city';
import styles from './SuggestionsDropdown.module.css';

interface SuggestionsDropdownProps {
  results: City[];
  query: string;
  loading: boolean;
  error: string | null;
  visible: boolean;
  onSelect: (city: City) => void;
  onClose: () => void;
}

export function SuggestionsDropdown({
  results,
  query,
  loading,
  error,
  visible,
  onSelect,
  onClose,
}: SuggestionsDropdownProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const activeIndexRef = useRef(-1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!visible || results.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndexRef.current = Math.min(activeIndexRef.current + 1, results.length - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndexRef.current = Math.max(activeIndexRef.current - 1, -1);
      } else if (e.key === 'Enter' && activeIndexRef.current >= 0) {
        e.preventDefault();
        onSelect(results[activeIndexRef.current]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [visible, results, onSelect, onClose],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  useEffect(() => {
    activeIndexRef.current = -1;
  }, [results]);

  if (!visible) return null;

  const hasQuery = query.trim().length >= 2;

  const highlight = (text: string) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className={styles.mark}>{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <div className={styles.dropdown}>
      {error && (
        <div className={styles.state}>
          <span className={styles.stateText}>{error}</span>
        </div>
      )}

      {!error && loading && (
        <div className={styles.state}>
          <span className={styles.stateText}>Поиск...</span>
        </div>
      )}

      {!error && !loading && hasQuery && results.length === 0 && (
        <div className={styles.state}>
          <span className={styles.stateText}>Ничего не найдено</span>
        </div>
      )}

      {!error && !loading && results.length > 0 && (
        <ul className={styles.list} ref={listRef}>
          {results.map((city, i) => (
            <li
              key={`${city.name}-${city.latitude}-${city.longitude}`}
              className={styles.item}
              onMouseDown={() => onSelect(city)}
              onMouseEnter={() => {
                activeIndexRef.current = i;
              }}
            >
              <span className={styles.cityName}>{highlight(city.name)}</span>
              <span className={styles.cityMeta}>
                {city.admin1 ? `${city.admin1}, ` : ''}
                {city.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
