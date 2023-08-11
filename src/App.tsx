import "./App.css";
import Notes from "./scenes/notes/Notes";
import { Navigate, Route, Routes } from "react-router-dom";
import EditNote from "./scenes/editNote/EditNote";
import NoteDetails from "./scenes/noteDetails/NoteDetails";
import CreateNote from "./scenes/createNote/CreateNote";
import { useAppContext } from "./context/appContext";

import {
  Alert,
  AlertColor,
  ThemeProvider,
  Theme,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useMode, ColorModeContext, tokens } from "./theme/muiTheme";

function App() {
  const { alert } = useAppContext();

  const [theme, colorMode] = useMode();
  const themeD = useTheme();
  const themeType = theme as Theme;
  const colors = tokens(themeD.palette.mode);
  const mobile = useMediaQuery("(max-width:850px)");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themeType}>
        <Stack
          sx={{
            position: "relative",
            background:
              themeType.palette.mode === "light"
                ? colors.white[100]
                : colors.white[900],
            display: "grid",
            padding: mobile ? "1rem" : "4rem",
            alignItems: "start",
            overflow: "hidden",
            justifyItems: "center",
            minHeight: "100vh",
            width: "100vw",
          }}
        >
          {alert.isAlertOn && (
            <Alert
              sx={{ top: "2vh", position: "absolute", zIndex: 333 }}
              severity={alert.type as AlertColor}
            >
              {" "}
              {alert.message}{" "}
            </Alert>
          )}

          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/new" element={<CreateNote />} />

            <Route path="/:id">
              <Route index element={<NoteDetails />} />
              <Route path="edit" element={<EditNote />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </Stack>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
