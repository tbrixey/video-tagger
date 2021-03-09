import React from "react";
import { render } from "react-dom";
import Root from "./components/Root";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./global.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#334a69",
    },
    secondary: {
      main: "#f5b300",
    },
    type: "dark",
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

const mainElement = document.createElement("div");
mainElement.setAttribute("id", "root");
document.body.appendChild(mainElement);

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Root />
  </ThemeProvider>
);

render(<App />, mainElement);
