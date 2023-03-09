import { createTheme } from "@mui/material";

export class Color {
  static theme = createTheme({
    palette: {
      stronger: {
        main: "#b94759",
        contrastText: "#000000",
      },
      strong: {
        main: "#f4a582",
        contrastText: "#000000",
      },
      neutral: {
        main: "#b2b2b2",
        contrastText: "#000000",
      },
      weak: {
        main: "#92c5de",
        contrastText: "#000000",
      },
      weaker: {
        main: "#0f73ad",
        contrastText: "#000000",
      },
    },
  });
}
