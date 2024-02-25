import { HourForecast } from "../interfaces/Forcast";
import {  Stack, Typography } from "@mui/joy";
import Temprature from "./Temprature";
import { AcUnitOutlined, AirOutlined, DeviceThermostatOutlined, WaterDropOutlined } from "@mui/icons-material";

interface HourlyForcastProps {
  data: HourForecast;
}

function HourlyForecast({ data }: HourlyForcastProps) {
  return (
    <>
        <Typography level="body-md">
          {data.time}
        </Typography>
        <Stack direction="row" alignItems="center" alignSelf={"left"} spacing={2} >
              <DeviceThermostatOutlined />
        <Typography level="body-md">
          <Temprature temp={data.temp} feels_like={data.feels_temp} />
        </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" alignSelf={"left"} spacing={2} >
              <WaterDropOutlined />
          <Typography level="body-md">
            {data.chance_of_rain}%
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" alignSelf={"left"} spacing={2} >
              <AirOutlined />
          <Typography level="body-md">
            {data.wind.speed_kmph} Kmph
          </Typography>
        </Stack>
        {data.chance_of_snow > 0 && (
          <>
            <AcUnitOutlined />
            <Typography level="body-md">
              {data.chance_of_rain}%
            </Typography>
          </>
        )}
    </>
  )
}

export default HourlyForecast
