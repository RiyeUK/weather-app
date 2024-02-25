import { Button, FormControl, Input, Stack, Typography } from "@mui/joy";
import OptionsInput from "./OptionsInput";

interface TopBarProps {
  addCity: (city: string) => void;
}

function TopBar({addCity} : TopBarProps) {

  return (
    <>
        <Stack
          direction="row"
          spacing={2} sx={{ p: 2, alignItems: 'center' }}>
          <Typography level="h2" sx={{ flexGrow: 1 }}>
          Weather App
        </Typography>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            addCity(formJson["city"])
          }}
        >
          <FormControl>
            <Input
              name="city"
              size="lg"
              placeholder="London"
              endDecorator={
                <Button type="submit">+</Button>
              }
            />
          </FormControl>
        </form>
        <OptionsInput />
        </Stack>
    </>
  );
}

export default TopBar;
