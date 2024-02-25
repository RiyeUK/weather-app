import { Weather, Temp } from "./Weather";

interface Forecast {
  hourly: HourForecast[];
  max_temp: Temp;
  min_temp: Temp;
  avg_temp: Temp;
  date: string;
  uv_index: number;
}

export interface HourForecast extends Weather {
  chance_of_rain: number;
  chance_of_snow: number;
}

export default Forecast;
