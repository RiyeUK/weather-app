export interface Weather {
  description: string;
  weatherCode: string;
  time: string;
  location: Location;
  wind: Wind;
  temp: Temp;
  feels_temp: Temp;
  rain: Rain;
  uv_index: number;
}

export type Wind = {
  dir_16pt: string;
  dir_deg: number;
  speed_kmph: number;
  speed_mph: number;
};

export type Temp = {
  celsius: number;
  fahrenheit: number;
};

export type Rain = {
  inches: number;
  mm: number;
};

export interface Location {
  city: string;
  lat: number;
  long: number;
  county: string;
}

export default Weather;
