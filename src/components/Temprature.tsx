import { Tooltip } from '@mui/joy';
import { Temp } from '../interfaces/Weather';
import { TempratureUnit } from '../interfaces/Options';
import { useOptions } from '../context/OptionsProvider';

interface TemperatureProps {
  temp: Temp | null;
  feels_like?: Temp | null;
}

function Temprature({temp, feels_like }: TemperatureProps){

  const { options } = useOptions();

  if (options.tempUnit == TempratureUnit.Celsius) {
        return (
      <>
        {feels_like != null ? (
          <Tooltip arrow title={`Feels Like: ${feels_like.celsius} °C`}>
            <span>{temp?.celsius} °C</span>
          </Tooltip>
        ) : (
          <>{temp?.celsius} °C</>
        )}
      </>
    );

  } else if (options.tempUnit == TempratureUnit.Fahrenheit) {

    return (
      <>
        {feels_like ? (
          <Tooltip title={`Feels Like: ${feels_like.fahrenheit} °F`}>
            <>{temp?.fahrenheit} °F</>
          </Tooltip>
        ) : (
          <>{temp?.fahrenheit} °F</>
        )}
      </>
    );
  }
}

export default Temprature
