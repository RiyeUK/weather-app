import { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import { City } from './interfaces/Options';
import TopBar from './components/TopBar';
import { CssBaseline, CssVarsProvider, Stack } from '@mui/joy';
import { OptionsProvider } from './context/OptionsProvider';


function App() {

  const [cities, setCities] = useState<City[]>(() => {
      // Initialize state from local storage or with an empty array
      const storedItems = localStorage.getItem('cities');
      return storedItems ? JSON.parse(storedItems) : [];
    });

    useEffect(() => {
      localStorage.setItem('cities', JSON.stringify(cities));
    }, [cities]);

    const addCity = (cityName: string) => {
      if (cityName.trim() !== '') {
        const newCity: City = { name: cityName.trim().toLowerCase(), favorite: false };
        setCities(prevCities => [...prevCities, newCity]);
      }
    };

    const editCity = (prevCityName: string, newCityName: string) => {
      const updatedCities = cities.map(city => city.name === prevCityName ? { ...city, name: newCityName } : city);
      setCities(updatedCities);
    };

    const removeCity = (cityName: string) => {
      setCities(prevCities => prevCities.filter(city => city.name !== cityName));
    };

    const toggleFavorite = (cityName: string) => {
      console.log("Toggling");
      const updatedCities = cities.map(city => city.name === cityName ? { ...city, favorite: !city.favorite } : city);
      setCities(updatedCities);
    };


  // Sort cities so that favorite cities come first
  const sortedCities = [...cities].sort((a, b) => {
    if (a.favorite === b.favorite) {
      return 0;
    }
    return a.favorite ? -1 : 1;
  });

  return (
    <CssVarsProvider
      // Use dark mode
      defaultMode="dark"
      disableNestedContext
    >
      <CssBaseline />
      <OptionsProvider>
    <div>
      <TopBar addCity={addCity} />
      <Stack spacing={2}>
        {
          sortedCities.map((city: City, index) => (
            // Draw a card for each City
            <WeatherCard
              favorite={city.favorite}
              removeCity={removeCity}
              editCity={editCity}
              toggleFavorite={toggleFavorite}
              city={city.name} key={index}
            />
          ))
        }
      </Stack>
    </div>
    </OptionsProvider>
    </CssVarsProvider>
  )
}

export default App
