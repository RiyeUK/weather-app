import { Rain } from '../interfaces/Weather';
import { DistanceUnit } from '../interfaces/Options';
import { useOptions } from '../context/OptionsProvider';

interface MeasuredRainProps {
  data: Rain | null;
}

function MeasuredRain({ data }: MeasuredRainProps ){

  const { options } = useOptions();

  if (options.distUnit == DistanceUnit.Millimeters) {
    return (
      <>{data?.mm} mm</>
    )
  } else if (options.distUnit == DistanceUnit.Inches) {
    return (
      <>{data?.inches} "</>
    )
  }
}

export default MeasuredRain
