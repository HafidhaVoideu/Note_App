import React, { useState } from "react";

import {
  Button,
  Stack,
  Box,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useAppContext, Note, Tag } from "../../context/appContext";
import { generateRandomColor } from "../../utils/utils";
import Confirmation from "../../components/Confirmation";

import { useMode, ColorModeContext, tokens } from "../../theme/muiTheme";

const NoteDetails = () => {
  const { notes, setNotes, tags, alert, setAlert } = useAppContext();
  const { id } = useParams();
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const note = notes?.find((note: Note) => note.id === id);

  const themeD = useTheme();
  const mobile = useMediaQuery("(max-width:1000px)");

  const colors = tokens(themeD.palette.mode);

  // **************************** Handlers **********************

  const handleDelete = (id: string) => {
    const deletedNotes = notes?.filter(
      (note: Note) => note.id !== id
    ) as Note[];
    setNotes([...deletedNotes]);
    navigate("/");

    setAlert({
      isAlertOn: true,
      type: "error",
      message: "Your Note Has Been Deleted",
    });
  };

  // *****************************************************************

  return (
    <Stack
      p={1}
      width="100%"
      sx={{
        color: colors.white[900],
        flexDirection: {
          sm: "column",
          md: "row",
        },
      }}
      gap={4}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Confirmation
        isConfirmDelete={isConfirmDelete}
        setIsConfirmDelete={setIsConfirmDelete}
        handleConfirm={handleDelete}
        id={id as string}
      />

      <Box
        order={note?.lang === "AR" || mobile ? -4 : 5}
        flex={1}
        display="flex"
        gap={1}
      >
        <Button
          onClick={() => {
            navigate(`edit`);
          }}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>

        <Button
          onClick={() => {
            setIsConfirmDelete(true);
          }}
          variant="outlined"
          color="error"
        >
          Delete
        </Button>

        <Button onClick={() => navigate("/")} variant="outlined" color="info">
          Back
        </Button>
      </Box>
      <Stack ml={4} flex={4} gap={3}>
        <Typography
          sx={{ textTransform: "capitalize" }}
          variant="h3"
          fontWeight="700"
          dir={note?.lang === "AR" ? "rtl" : "ltr"}
        >
          {note?.title}{" "}
        </Typography>
        <Box
          justifyContent={note?.lang === "AR" ? "flex-end" : "flex-start"}
          display="flex"
          gap={1}
        >
          {note?.tags.map((t: Tag) => {
            return (
              <Chip
                sx={{
                  color: "grey",
                  fontWeight: "700",
                  background: "#efecf3fa",
                }}
                label={t.tag}
                key={t.id}
              />
            );
          })}
        </Box>
        <Typography fontSize={18} dir={note?.lang === "AR" ? "rtl" : "ltr"}>
          {note?.body}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NoteDetails;
