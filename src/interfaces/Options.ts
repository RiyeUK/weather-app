// The structure of global options that will be stored using local storage
interface Options {
  tempUnit: TempratureUnit;
  windUnit: SpeedUnit;
  distUnit: DistanceUnit;
  // citys: City[];
}

export interface City {
  name: string;
  favorite: boolean;
}

export enum TempratureUnit {
  Celsius,
  Fahrenheit,
}

export enum SpeedUnit {
  Mph,
  Kmph,
}

export enum DistanceUnit {
  Millimeters,
  Inches,
}

export default Options;
