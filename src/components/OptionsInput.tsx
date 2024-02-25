import { SettingsOutlined } from "@mui/icons-material";
import { DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Modal, ModalClose, ModalDialog, Stack, Switch, Typography } from "@mui/joy";
import React from "react";
import { useState } from "react"
import { useOptions } from "../context/OptionsProvider";
import { DistanceUnit, SpeedUnit, TempratureUnit } from "../interfaces/Options";

function OptionsInput() {
  const [open, setOpen] = useState<boolean>(false);
  const { options, updateOptions } = useOptions();

  const handleTemperatureChange = () => {
    const newOptions = {
      ...options,
      tempUnit: options.tempUnit === TempratureUnit.Celsius ? TempratureUnit.Fahrenheit : TempratureUnit.Celsius,
    };
    updateOptions(newOptions);
  };

  const handleWindSpeedChange = () => {
    const newOptions = {
      ...options,
      windUnit: options.windUnit === SpeedUnit.Mph ? SpeedUnit.Kmph : SpeedUnit.Mph,
    };
    updateOptions(newOptions);
  };

  const handleWaterLevelChange = () => {
    const newOptions = {
      ...options,
      distUnit: options.distUnit === DistanceUnit.Millimeters ? DistanceUnit.Inches : DistanceUnit.Millimeters,
    };
    updateOptions(newOptions);
  };
  return (
    <>
      <React.Fragment>
        <IconButton onClick={() => setOpen(true)}>
          <SettingsOutlined />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <ModalClose />
            <DialogTitle>Update Settings</DialogTitle>
            <DialogContent>Choose which units to use</DialogContent>
            <form>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Temperature</FormLabel>
                  <Typography>{options.tempUnit === TempratureUnit.Celsius ? "C" : "F"}°</Typography>
                  <Switch
                    checked={options.tempUnit === TempratureUnit.Fahrenheit}
                    onChange={handleTemperatureChange}
                    color="primary"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Wind Speed</FormLabel>
                  <Typography>{options.windUnit === SpeedUnit.Mph ? "M" : "Km"}ph</Typography>
                  <Switch
                    checked={options.windUnit === SpeedUnit.Kmph}
                    onChange={handleWindSpeedChange}
                    color="primary"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Water Levels</FormLabel>
                  <Typography>{options.distUnit === DistanceUnit.Millimeters ? "mm" : "Inches"}</Typography>
                  <Switch
                    checked={options.distUnit === DistanceUnit.Inches}
                    onChange={handleWaterLevelChange}
                    color="primary"
                  />
                </FormControl>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </>
  )
}


export default OptionsInput
