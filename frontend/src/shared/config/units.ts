export type UnitSystem = 'metric' | 'imperial';

export interface UnitConfig {
  temp: { unit: string; convert: (celsius: number) => number };
  wind: { unit: string; convert: (kmh: number) => number };
  precip: { unit: string; convert: (mm: number) => number };
}

export const UNITS: Record<UnitSystem, UnitConfig> = {
  metric: {
    temp: { unit: '°C', convert: (c) => c },
    wind: { unit: 'км/ч', convert: (w) => w },
    precip: { unit: 'мм', convert: (p) => p },
  },
  imperial: {
    temp: { unit: '°F', convert: (c) => Math.round((c * 9) / 5 + 32) },
    wind: { unit: 'миль/ч', convert: (w) => Math.round((w / 1.60934) * 10) / 10 },
    precip: { unit: 'мм', convert: (p) => p },
  },
};

export const UNIT_LABELS: Record<UnitSystem, string> = {
  metric: 'Метрические (°C, км/ч)',
  imperial: 'Имперские (°F, миль/ч)',
};
