import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UnitSystem } from '../../shared/config/units';

interface UnitContextValue {
  units: UnitSystem;
  setUnits: (u: UnitSystem) => void;
  toggleUnits: () => void;
}

const UnitContext = createContext<UnitContextValue | null>(null);

export function UnitProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<UnitSystem>('metric');

  const toggleUnits = useCallback(() => {
    setUnits((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  }, []);

  return (
    <UnitContext.Provider value={{ units, setUnits, toggleUnits }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnits(): UnitContextValue {
  const ctx = useContext(UnitContext);
  if (!ctx) {
    throw new Error('useUnits must be used within UnitProvider');
  }
  return ctx;
}
