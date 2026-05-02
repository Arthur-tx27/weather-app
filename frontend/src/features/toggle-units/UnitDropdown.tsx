import { useUnits } from './UnitContext';
import { UNIT_LABELS } from '../../shared/config/units';
import type { UnitSystem } from '../../shared/config/units';
import styles from './UnitDropdown.module.css';

export function UnitDropdown() {
  const { units, setUnits } = useUnits();

  return (
    <div className={styles.wrapper}>
      <img src="/images/icon-units.svg" alt="" className={styles.icon} />
      <select
        className={styles.select}
        value={units}
        onChange={(e) => setUnits(e.target.value as UnitSystem)}
      >
        <option value="metric">{UNIT_LABELS.metric}</option>
        <option value="imperial">{UNIT_LABELS.imperial}</option>
      </select>
      <img src="/images/icon-dropdown.svg" alt="" className={styles.arrow} />
    </div>
  );
}
