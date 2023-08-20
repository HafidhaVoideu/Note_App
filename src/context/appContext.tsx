import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { useTheme } from "@mui/material";
import { useMode, ColorModeContext, tokens } from "../theme/muiTheme";

// ***************************** Types*********************

export type Tag = {
  id: string;
  tag: string;
};

export type Note = {
  id: string;
  title: string;
  tags: Tag[];
  body: string;
  date: string;
  color: string;
  lang: string;
};

export type AlertType = {
  isAlertOn: boolean;
  type: string;
  message: string;
};

type AppContextType = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  alert: AlertType;
  setAlert: React.Dispatch<React.SetStateAction<AlertType>>;
};

type AppContextProviderProps = {
  children: JSX.Element;
};

export const COLORS = [
  "#ffdddd",
  "#ffedc7",
  "#fffcb9",
  "#d7ffc1",
  "#dcfaf0",
  "#cde9fc",
  "#e8eaff",
  "#ffdceb",
];

// ***************************** Context *********************

export const appContext = createContext<AppContextType>({} as AppContextType);
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  // *********************** States ****************************

  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [isModal, setIsModal] = useState(false);

  const [alert, setAlert] = useState<AlertType>({
    isAlertOn: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const time = setTimeout(() => {
      setAlert({ ...alert, isAlertOn: false });
    }, 3000);
    return () => clearTimeout(time);
  }, [alert.isAlertOn]);

  // useEffect(() => {
  //   console.log("tags:", tags);
  // }, [tags]);

  useEffect(() => {
    console.log("notes:", notes);
  }, [notes]);

  return (
    <appContext.Provider
      value={{
        tags,
        notes,
        setTags,
        setNotes,
        isModal,
        setIsModal,
        alert,
        setAlert,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};

export { AppContextProvider };
