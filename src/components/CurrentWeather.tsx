import { Card, Stack, Typography } from '@mui/joy';
import Weather from '../interfaces/Weather';
import Temprature from './Temprature';
import MeasuredRain from './MeasuredRain';
import WindSpeed from './WindSpeed';
import { AirOutlined, DeviceThermostatOutlined, WaterDropOutlined } from '@mui/icons-material';

interface CurrentWeatherProps {
  data: Weather | null;
}

function CurrentWeather({ data }: CurrentWeatherProps) {

  console.log(data);
  return (
    <>
      {data ? (
        <>
          <Card>
            <Typography level="h1" textAlign={"center"}>{data.location.city}</Typography>
            <Typography level="h2" textAlign={"center"}>{data.description}</Typography>

            <Stack direction="row" alignItems="center" alignSelf={"center"} spacing={2} >
              <DeviceThermostatOutlined />
            <Typography level="body-lg">
              <Temprature temp={data.temp} feels_like={data.feels_temp} />
            </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" alignSelf={"center"} spacing={2} >
              <WaterDropOutlined />
              <Typography level="body-lg">
                <MeasuredRain data={data.rain} />
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" alignSelf={"center"} spacing={2} >
              <AirOutlined />
              <Typography level="body-lg">
                <WindSpeed data={data.wind} />
              </Typography>
            </Stack>
          </Card>
        </>
      ) : (
        /* @TODO: Use Joy/Skelington here */
        <p>Loading data...</p>
      )}
    </>
  );
}

export default CurrentWeather;
