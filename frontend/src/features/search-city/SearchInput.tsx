import { Input } from '../../shared/ui';
import { Spinner } from '../../shared/ui';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  loading,
  onFocus,
  onBlur,
  placeholder = 'Поиск города...',
}: SearchInputProps) {
  return (
    <div className={styles.wrapper}>
      <Input
        icon="/images/icon-search.svg"
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete="off"
      />
      {loading && (
        <span className={styles.spinner}>
          <Spinner size={18} />
        </span>
      )}
    </div>
  );
}
