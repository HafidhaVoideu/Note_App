import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

export const tokens = (mode: string) => ({
  ...(mode === "light"
    ? {
        white: {
          100: "#f9f9f9",
          200: "#f3f3f3",
          300: "#e6e6e6",
          400: "#e6e6e6",
          600: "#b3b3b3",
          500: "#e0e0e0",
          700: "#868686",
          800: "#5a5a5a",
          900: "#262627",
        },

        blue: {
          100: "#d9e7fcfc",
          200: "#b1cff9f9",
          300: "#87b5f5f6",
          400: "#5b9af2f3",
          500: "#2d7deef0",
          600: "#2362baf3",
          700: "#1a4788f6",
          800: "#112f59f9",
          900: "#08172bfc",
        },

        red: {
          100: "#fbdbd8f9",
          200: "#f6b4adf3",
          300: "#f1897eed",
          400: "#ec5a4ae7",
          500: "#e62611e1",
          600: "#af1d0de7",
          700: "#7d1509ed",
          800: "#4f0d06f3",
          900: "#260603f9",
        },
      }
    : {
        white: {
          100: "#262627",
          200: "#5a5a5a",
          300: "#868686",
          400: "#e0e0e0",
          600: "#b3b3b3",
          500: "#e6e6e6",
          700: "#ececec",
          800: "#f3f3f3",
          900: "#f9f9f9",
        },

        blue: {
          100: "#08172bfc",
          200: "#112f59f9",
          300: "#1a4788f6",
          400: "#2362baf3",
          500: "#2d7deef0",
          600: "#5b9af2f3",
          700: "#87b5f5f6",
          800: "#b1cff9f9",
          900: "#d9e7fcfc",
        },

        red: {
          100: "#260603f9",
          200: "#4f0d06f3",
          300: "#7d1509ed",
          400: "#af1d0de7",
          500: "#e62611e1",
          600: "#ec5a4ae7",
          700: "#f1897eed",
          800: "#f6b4adf3",
          900: "#fbdbd8f9",
        },
      }),
});

export const themeSettings = (mode: string) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode as PaletteMode,
      ...(mode === "light"
        ? {
            primary: {
              main: colors.blue[500],
            },

            secondary: {
              main: colors.red[200],
            },

            background: {
              default: colors.red[100],
            },
          }
        : {
            primary: {
              main: colors.white[900],
            },

            secondary: {
              main: colors.red[500],
            },
          }),
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 13,
      h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 48,
        fontWeight: "bold",
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 38,
        fontWeight: "bold",
      },
      h3: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: "bold",
      },
      h4: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext<any>({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
