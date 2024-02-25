import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Options, { DistanceUnit, SpeedUnit, TempratureUnit } from "../interfaces/Options";

interface OptionsContextProps {
  options: Options,
  updateOptions: (newOptions: Options) => void;
}

const OptionsContext = createContext<OptionsContextProps | undefined>(undefined);

export function OptionsProvider({ children }: { children: ReactNode }) {
    const [options, setOptions] = useState<Options>(() => {
    const storedOptions = localStorage.getItem('options');
    return storedOptions ? JSON.parse(storedOptions) : getDefaultOptions();
  });

  useEffect(() => {
    localStorage.setItem('options', JSON.stringify(options));
  }, [options]);

  const updateOptions = (newOptions: Options) => {
    setOptions(newOptions);
  };

  return (
    <OptionsContext.Provider value={{ options, updateOptions }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error('useOptions must be used within an OptionsProvider');
  }
  return context;
};

function getDefaultOptions(): Options {
  return {
    tempUnit: TempratureUnit.Celsius,
    windUnit: SpeedUnit.Mph,
    distUnit: DistanceUnit.Millimeters,
  };
}

export default OptionsContext
