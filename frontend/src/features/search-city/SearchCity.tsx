import { useState, useCallback } from 'react';
import { useCitySearch } from '../../entities/city';
import type { City } from '../../entities/city';
import { SearchInput } from './SearchInput';
import { SuggestionsDropdown } from './SuggestionsDropdown';
import styles from './SearchCity.module.css';

interface SearchCityProps {
  onCitySelect: (city: City) => void;
}

export function SearchCity({ onCitySelect }: SearchCityProps) {
  const { query, results, loading, error, setQuery, clearResults } = useCitySearch(300);
  const [focused, setFocused] = useState(false);

  const visible = focused && (query.trim().length >= 2 || loading || !!error);

  const handleSelect = useCallback(
    (city: City) => {
      setFocused(false);
      setQuery(`${city.name}, ${city.country}`);
      clearResults();
      onCitySelect(city);
    },
    [onCitySelect, setQuery, clearResults],
  );

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => setFocused(false), 150);
  }, []);

  return (
    <div className={styles.container}>
      <SearchInput
        value={query}
        onChange={setQuery}
        loading={loading}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <SuggestionsDropdown
        results={results}
        query={query}
        loading={loading}
        error={error}
        visible={visible}
        onSelect={handleSelect}
        onClose={() => setFocused(false)}
      />
    </div>
  );
}
