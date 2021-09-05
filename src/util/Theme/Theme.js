import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#fff",
    },
    error: {
      main: "#dd2c00",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: "500",
    },
    h2: {
      fontSize: "1.6rem",
      fontWeight: "500",
    },
    h3: {
      fontSize: "1.4rem",
      fontWeight: "500",
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "700",
    },
  },
});

export default theme;
