import { useEffect, useState } from "react";
import Forecast from "../interfaces/Forcast";
import Weather from "../interfaces/Weather";

import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import { fetchWeatherData } from "../weatherApi";

import { ButtonGroup, Card, IconButton } from "@mui/joy";
import { ClearOutlined, EditOutlined, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";

interface WeatherProps {
  city: string;
  removeCity: (city: string) => void;
  editCity: (prevCity: string, newCity: string) => void;
  toggleFavorite: (city: string) => void;
  favorite: boolean;
}

function WeatherCard({ city, removeCity, editCity, toggleFavorite, favorite}: WeatherProps) {

  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast[]>([])

  // Get the weather data

  useEffect(() => {
    async function fetchData() {
      try {
        const { currentWeather, forecast } = await fetchWeatherData(city);
        setCurrentWeather(currentWeather);
        setForecast(forecast);
      } catch (error) {
        // Handle error
      }
    }
    fetchData();
  }, [city]);

  // Buton Actions

  const handleEditCity = () => {
      const newCity = prompt("Enter new City:");
      if (newCity) {
        editCity(city, newCity);
      }
    }

    const handleRemoveCity = () => {
      removeCity(city);
    }

    const handleToggleFavorite = () => {
      toggleFavorite(city);
    }


  return (
    <Card>
      <ButtonGroup sx={{ align: "right" }}>
        <IconButton onClick={handleEditCity}>
          <EditOutlined />
        </IconButton>
        <IconButton 
          variant={favorite ? "solid" : "outlined"}
          color={favorite ? "danger" : "neutral"}
          onClick={handleToggleFavorite}>
          {favorite ? (
            <FavoriteOutlined />
          ) : (
            <FavoriteBorderOutlined />
          )}
        </IconButton>
        <IconButton color="danger" onClick={handleRemoveCity}>
          <ClearOutlined />
        </IconButton>
      </ButtonGroup>
      <CurrentWeather data={currentWeather} />
      <DailyForecast data={forecast} />
    </Card>
  )
}

export default WeatherCard;
