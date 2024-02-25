import { Card, Divider, Stack, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import Forcast from '../interfaces/Forcast';
import HourlyForecast from './HourlyForecast';
import React from 'react';



interface DailyForecastProps {
  data: Forcast[];
}

function DailyForecast({ data }: DailyForecastProps) {

  return (
    <Tabs aria-label="Basic tabs" defaultValue={0}>
      <TabList>
      {data.map((day) => (
        <Tab>{day.date}</Tab>
      ))}
      </TabList>
      {data.map((day, index) => (
      <TabPanel value={index}>
        <Stack direction="row">
        {day.hourly.map((hour, index) => (
          <React.Fragment key={index}>
            <Card sx={{ width: "300px" }} variant='plain'>
              <HourlyForecast data={hour} />
            </Card>
          {day.hourly.length > index + 1 && <Divider orientation='vertical' />}
          </React.Fragment>
        ))}
        </Stack>
      </TabPanel>
      ))}
    </Tabs>
  )
};


export default DailyForecast

