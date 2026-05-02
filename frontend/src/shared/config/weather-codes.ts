interface WeatherCodeEntry {
  icon: string;
  description: string;
}

const WEATHER_CODES: Record<number, WeatherCodeEntry> = {
  0: { icon: '/images/icon-sunny.webp', description: 'Ясно' },
  1: { icon: '/images/icon-sunny.webp', description: 'Преимущественно ясно' },
  2: { icon: '/images/icon-partly-cloudy.webp', description: 'Переменная облачность' },
  3: { icon: '/images/icon-overcast.webp', description: 'Пасмурно' },
  45: { icon: '/images/icon-fog.webp', description: 'Туман' },
  48: { icon: '/images/icon-fog.webp', description: 'Изморозь' },
  51: { icon: '/images/icon-drizzle.webp', description: 'Лёгкая морось' },
  53: { icon: '/images/icon-drizzle.webp', description: 'Морось' },
  55: { icon: '/images/icon-drizzle.webp', description: 'Сильная морось' },
  61: { icon: '/images/icon-rain.webp', description: 'Небольшой дождь' },
  63: { icon: '/images/icon-rain.webp', description: 'Дождь' },
  65: { icon: '/images/icon-rain.webp', description: 'Сильный дождь' },
  71: { icon: '/images/icon-snow.webp', description: 'Небольшой снег' },
  73: { icon: '/images/icon-snow.webp', description: 'Снег' },
  75: { icon: '/images/icon-snow.webp', description: 'Сильный снег' },
  80: { icon: '/images/icon-rain.webp', description: 'Ливень' },
  81: { icon: '/images/icon-rain.webp', description: 'Сильный ливень' },
  82: { icon: '/images/icon-rain.webp', description: 'Очень сильный ливень' },
  95: { icon: '/images/icon-storm.webp', description: 'Гроза' },
  96: { icon: '/images/icon-storm.webp', description: 'Гроза с градом' },
  99: { icon: '/images/icon-storm.webp', description: 'Сильная гроза с градом' },
};

export function getWeatherInfo(code: number): WeatherCodeEntry {
  return WEATHER_CODES[code] ?? { icon: '/images/icon-overcast.webp', description: 'Пасмурно' };
}
