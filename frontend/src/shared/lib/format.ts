import { UNITS, type UnitSystem } from '../config/units';

export function formatTemp(celsius: number, units: UnitSystem): string {
  const cfg = UNITS[units].temp;
  return `${cfg.convert(celsius)}${cfg.unit}`;
}

export function formatWind(kmh: number, units: UnitSystem): string {
  const cfg = UNITS[units].wind;
  return `${cfg.convert(kmh)} ${cfg.unit}`;
}

export function formatPrecip(mm: number, units: UnitSystem): string {
  const cfg = UNITS[units].precip;
  return `${cfg.convert(mm)} ${cfg.unit}`;
}

export function formatTempValue(celsius: number, units: UnitSystem): number {
  return UNITS[units].temp.convert(celsius);
}
