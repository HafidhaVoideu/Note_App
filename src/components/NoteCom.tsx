import React, { useContext } from "react";
import { Stack, Typography, Chip, Box, useTheme } from "@mui/material";
import { Tag, useAppContext } from "../context/appContext";
import { useNavigate } from "react-router";

import Time from "./Time";

type NoteProps = {
  id: string;
  title: string;
  date: string;
  color: string;
  lang: string;
  tags: Tag[];
  children?: React.ReactNode;
};

const NoteCom = ({
  id,
  title,
  tags,
  date,
  children,
  color,
  lang,
}: NoteProps) => {
  const navigate = useNavigate();

  const theme = useTheme();

  // console.log("tags in note:", tags);

  return (
    <Stack
      onClick={() => navigate(`/${id}`)}
      gap={2}
      justifyContent="space-between"
      flexDirection="row"
      sx={{
        color: "black",

        background: theme.palette.mode === "dark" ? color : "white",

        width: {
          lg: "47%",
          xs: "100%",
        },
        minHeight: "30vh",
        border: " #b0b0b0 solid 1px",
        cursor: "pointer",

        "&:hover": {
          color: "#2701bedd",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          transform: "translateY(-5px)",
          transition: ".2s all ease",
        },
      }}
    >
      <Stack flex={4} gap={2} p={3}>
        <Typography
          sx={{ fontFamily: lang === "AR" ? "Cairo" : "Roboto" }}
          dir={lang === "AR" ? "rtl" : "ltr"}
          textTransform="capitalize"
          variant="h3"
          component="h3"
        >
          {title}
        </Typography>
        <Box
          justifyContent={lang === "AR" ? "flex-end" : "flex-start"}
          display="flex"
          gap={1}
        >
          {tags?.map((t) => {
            return (
              <Chip
                sx={{
                  padding: "0",
                  color: "#454543",
                  fontWeight: "700",
                  textTransform: "capitalize",
                  background: "#efecf3fa",
                  fontFamily: lang === "AR" ? "Cairo" : "Roboto",
                }}
                label={t.tag}
                key={t.id}
              />
            );
          })}
        </Box>

        <Typography
          sx={{ fontFamily: lang === "AR" ? "Cairo" : "Roboto" }}
          dir={lang === "AR" ? "rtl" : "ltr"}
        >
          {children}
        </Typography>
        <Time lang={lang} timestamp={date} />
      </Stack>

      <Box flex={0.05} bgcolor={color} minHeight="100%"></Box>
    </Stack>
  );
};

export default NoteCom;
