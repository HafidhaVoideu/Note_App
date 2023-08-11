import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Theme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AppContextProvider } from "./context/appContext";
import { ColorModeContext, useMode } from "./theme/muiTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <CssBaseline />
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
