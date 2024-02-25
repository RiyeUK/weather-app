import moment from "moment";
import Forecast, { HourForecast } from "./interfaces/Forcast";
import Weather from "./interfaces/Weather";

// Fetch the weather using the city from wttr.in
export async function fetchWeatherData(
  city: string,
): Promise<{ currentWeather: Weather; forecast: Forecast[] }> {
  const cacheKey = `weather_${city}`.toLowerCase();
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    try {
      const parsedData = JSON.parse(cachedData);
      const timestamp = parsedData.timestamp;
      const now = Date.now();
      const expirationTime = 1000 * 60 * 5; // 5 minutes expiration time

      if (now - timestamp < expirationTime) {
        // Data is still fresh, return cached data
        return parsedData.data;
      }
    } catch (error) {
      console.error("Error parsing cached data:", error);
      // If there's an error parsing cached data, proceed to fetch from API
    }
  }

  const url = `https://wttr.in/${city}?format=j1`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    const currentWeather: Weather = parseWeatherData(
      data.current_condition[0],
      data.nearest_area[0],
      true,
    );
    const forecast: Forecast[] = data.weather.map((weatherData: any) =>
      parseForecastData(weatherData, data.nearest_area[0]),
    );
    console.log(forecast);
    const weatherData = { currentWeather, forecast };
    localStorage.setItem(cacheKey, JSON.stringify(weatherData));
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Prase the generic weather data
function parseWeatherData(
  data: any,
  // This isn't included in the hourly so we need to pass it here
  nearest_area: any,
  // Some things are different depending if we're getting the current weather or not
  isCurrent: boolean,
): Weather {
  return {
    description: data.weatherDesc[0].value,
    weatherCode: data.weatherCode,
    // for hourly time is displayed as non-padded HHmm
    time: isCurrent
      ? data.observation_time
      : moment(data.time.padStart(4, "0"), "HHmm").format("HH:mm"),
    location: {
      city: nearest_area.areaName[0].value,
      lat: Number(nearest_area.latitude),
      long: Number(nearest_area.longitude),
      county: nearest_area.region[0].value,
    },
    wind: {
      dir_16pt: data.winddir16Point,
      dir_deg: Number(data.winddirDegree),
      speed_kmph: Number(data.windspeedKmph),
      speed_mph: Number(data.windspeedMiles),
    },
    temp: {
      celsius: Number(isCurrent ? data.temp_C : data.tempC),
      fahrenheit: Number(isCurrent ? data.temp_F : data.tempF),
    },
    feels_temp: {
      celsius: Number(data.FeelsLikeC),
      fahrenheit: Number(data.FeelsLikeF),
    },
    rain: {
      inches: Number(data.precipInches),
      mm: Number(data.precipMM),
    },
    uv_index: Number(data.UVIndex),
  };
}

function parseForecastData(data: any, nearest_area: any): Forecast {
  return {
    hourly: data.hourly.map(
      (hour: any): HourForecast => ({
        ...parseWeatherData(hour, nearest_area, false),
        chance_of_rain: hour.chanceofrain,
        chance_of_snow: hour.chanceofsnow,
      }),
    ),
    max_temp: {
      celsius: Number(data.maxtempC),
      fahrenheit: Number(data.maxtempF),
    },
    min_temp: {
      celsius: Number(data.mintempC),
      fahrenheit: Number(data.mintempF),
    },
    avg_temp: {
      celsius: Number(data.avgtempC),
      fahrenheit: Number(data.avgtempF),
    },
    date: data.date,
    uv_index: Number(data.uvIndex),
  };
}
