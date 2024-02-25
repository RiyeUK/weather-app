import { createContext } from "react";
import Options, { DistanceUnit, SpeedUnit, TempratureUnit } from "../interfaces/Options";

const OptionsContext = createContext<Options>({
  tempUnit:TempratureUnit.Celsius,
  windUnit:SpeedUnit.Mph,
  distUnit:DistanceUnit.Millimeters,
});

export default OptionsContext
