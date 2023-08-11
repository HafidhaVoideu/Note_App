import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  TextareaAutosize,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  useTheme,
  SelectChangeEvent,
  useMediaQuery,
} from "@mui/material";

import { COLORS } from "../context/appContext";
import { useNavigate } from "react-router";
import { v4 as uuidV4 } from "uuid";
import { Tag, Note, useAppContext } from "../context/appContext";

import Tags from "./Tags";
type FormType = {
  form: "edit" | "new";
  editNote?: Note;
};

const Form = ({ form, editNote }: FormType) => {
  const [body, setBody] = useState(editNote?.body || "");
  const [title, setTitle] = useState(editNote?.title || "");
  const [color, setColor] = useState(editNote?.color || "#fffcb9");
  const [language, setLanguage] = useState(editNote?.lang || "EN");
  const [activeTags, setActiveTags] = useState<Tag[]>(editNote?.tags || []);

  const [canSave, setCanSave] = useState(false);

  const navigate = useNavigate();
  const { setNotes, notes, setAlert } = useAppContext();

  const mobile = useMediaQuery("(max-width:950px)");

  // ************************* Handlers***************************

  const handleColorChange = (event: SelectChangeEvent<string>) => {
    setColor(event.target.value);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  const handleFormSubmit = (note: Note, e: React.SyntheticEvent) => {
    e.preventDefault();
    if (form === "edit") {
      const filteredNotes = notes.filter((n: Note) => n.id !== note.id);

      setNotes([note, ...filteredNotes]);

      navigate(-1);
      setAlert({
        isAlertOn: true,
        type: "info",
        message: "Your Note Has Been Edited",
      });
    } else if (form === "new") {
      setNotes([note, ...notes]);

      navigate("/");
      setAlert({
        isAlertOn: true,
        type: "success",
        message: "A New Note Has been Added",
      });
    }
  };

  // ************************* useEffect **************************

  useEffect(() => {
    if (
      title !== editNote?.title ||
      body !== editNote.body ||
      color !== editNote.color ||
      language !== editNote.lang ||
      JSON.stringify(activeTags) !== JSON.stringify(editNote.tags)
    )
      setCanSave([body].every(Boolean));
    else setCanSave(false);
  }, [title, body, color, language, activeTags.length]);
  return (
    <form
      id="form"
      style={{ width: "100%", minHeight: "85vh" }}
      onSubmit={(e) =>
        handleFormSubmit(
          {
            id: form === "new" ? `${uuidV4()}-note}` : (editNote?.id as string),
            title: title ? title.trim() : "Untitled",
            body,
            tags: activeTags,
            date: new Date().toISOString(),
            color,
            lang: language,
          },
          e
        )
      }
    >
      <Stack justifyContent="center" p={2} gap={3} height="100%" width="100%">
        <Box
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          sx={{
            flexDirection: {
              xs: "column",
              lg: "row",
            },
          }}
          display="flex"
          gap={3.5}
        >
          <Box width="100%" flex={mobile ? "auto" : 2}>
            <Typography color="primary" mb={1}>
              Title
            </Typography>
            <TextField
              dir={language === "AR" ? "rtl" : "ltr"}
              sx={{ flex: 1 }}
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="outlined"
            ></TextField>
          </Box>
          <Box width="100%" flex={mobile ? "auto" : 2}>
            <Typography color="primary" mb={1}>
              {" "}
              Tags{" "}
            </Typography>
            <Tags
              language={language}
              tagType="create"
              activeTags={activeTags}
              setActiveTags={setActiveTags}
            />
          </Box>
          <Box
            width="100%"
            flex={mobile ? "auto" : 0.5}
            sx={{
              alignSelf: "flex-end",
            }}
          >
            <Typography color="primary" mb={1}>
              Colors
            </Typography>
            <Select
              fullWidth
              id="color-select"
              value={color}
              defaultValue="#ffff"
              onChange={(e) => handleColorChange(e)}
              sx={{
                height: "40px",
                color: "black",
                paddingRight: ".8rem",
              }}
            >
              {COLORS.map((color, index) => (
                <MenuItem key={index} value={color}>
                  <Typography
                    textAlign="center"
                    sx={{
                      width: "100%",
                      height: "5.5px",
                      bgcolor: color,
                      padding: ".5rem",
                      boxShadow: " 1px 2px 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                    color="transparent"
                  >
                    {color}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box
            width="100%"
            flex={mobile ? "auto" : 0.5}
            sx={{
              alignSelf: "flex-end",
            }}
          >
            <Stack alignItems="left">
              <Typography color="primary" mb={1}>
                Language
              </Typography>

              <Select
                fullWidth
                id="color-select"
                value={language}
                onChange={(e) => handleLanguageChange(e)}
                sx={{
                  height: "40px",
                  paddingRight: ".8rem",
                }}
              >
                <MenuItem value="AR"> AR </MenuItem>
                <MenuItem value="EN"> EN </MenuItem>
                <MenuItem value="FR"> FR </MenuItem>
              </Select>
            </Stack>
          </Box>
        </Box>

        <Box width="100%" height="100%" mt={2}>
          <Typography color="primary" mb={1} sx={{ width: "100%" }}>
            Body
          </Typography>
          <TextareaAutosize
            value={body}
            dir={language === "AR" ? "rtl" : "ltr"}
            onChange={(e) => setBody(e.target.value)}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "60vh",
              padding: ".5rem",
              fontSize: "1.2rem",
            }}
          ></TextareaAutosize>
        </Box>

        <Box
          display="flex"
          mt={4}
          width="100%"
          gap={2}
          justifyContent="flex-end"
        >
          <Button variant="contained" disabled={!canSave} type="submit">
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default Form;
