import { Wind } from '../interfaces/Weather';
import { SpeedUnit } from '../interfaces/Options';
import { useOptions } from '../context/OptionsProvider';

interface WindSpeedProps {
  data: Wind | null;
}

function WindSpeed({ data }: WindSpeedProps ){

  const { options } = useOptions();

  if (options.windUnit == SpeedUnit.Kmph) {
    return (
      <>{data?.speed_kmph} Kmph</>
    )
  } else if (options.windUnit == SpeedUnit.Mph) {
    return (
      <>{data?.speed_mph} Mph</>
    )
  }
}

export default WindSpeed
