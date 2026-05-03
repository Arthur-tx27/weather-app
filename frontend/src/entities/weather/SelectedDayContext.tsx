import { createContext, useContext, useState, type ReactNode } from 'react';

interface SelectedDayContextType {
  selectedDay: number;
  selectDay: (index: number) => void;
}

const SelectedDayContext = createContext<SelectedDayContextType | null>(null);

export function SelectedDayProvider({ children }: { children: ReactNode }) {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <SelectedDayContext.Provider value={{ selectedDay, selectDay: setSelectedDay }}>
      {children}
    </SelectedDayContext.Provider>
  );
}

export function useSelectedDay(): SelectedDayContextType {
  const ctx = useContext(SelectedDayContext);
  if (!ctx) throw new Error('useSelectedDay must be used within SelectedDayProvider');
  return ctx;
}
