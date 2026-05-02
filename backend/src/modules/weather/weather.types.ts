export interface CityResult {
  name: string;
  country: string;
  admin1: string;
  latitude: number;
  longitude: number;
}

export interface WeatherHourly {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  relativehumidity_2m: number[];
  precipitation: number[];
  wind_speed_10m: number[];
  weathercode: number[];
}

export interface WeatherCurrent {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

export interface WeatherDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  precipitation_sum: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  current_weather: WeatherCurrent;
  hourly: WeatherHourly;
  daily: WeatherDaily;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  weathercode: number;
}

export interface WeatherForecast {
  city: string;
  latitude: number;
  longitude: number;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    precipitation: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  hourly: HourlyForecast[];
  daily: Array<{
    date: string;
    tempMax: number;
    tempMin: number;
    weathercode: number;
    precipitationSum: number;
  }>;
}
