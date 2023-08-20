import { useState, useEffect, useContext, useRef } from "react";
import {
  Stack,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

import Tags from "../../components/Tags";
import { Note, Tag, useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router";
import { sortByDate, sortByAlphabets, sortByArabic } from "../../utils/utils";
import NoteCom from "../../components/NoteCom";
import Modal from "../../components/Modal";
import { COLORS } from "../../context/appContext";
import { tokens, ColorModeContext } from "../../theme/muiTheme";

const Notes = () => {
  // **************************** State **********************

  const { notes, setIsModal } = useAppContext();
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("new");
  const [colorSort, setColorSort] = useState("all");
  const [isNoTag, setIsNoTag] = useState(false);

  const [notesList, setNotesList] = useState(notes);
  const navigate = useNavigate();

  // **************************** Theme**********************

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const mobile = useMediaQuery("(max-width:950px)");
  const tablette = useMediaQuery("(max-width:1024px)");

  var isThereLatinNotes = notesList.filter((notes) => notes.lang !== "AR")
    .length!;

  // **************************** Handlers *********************

  //?  Search Notes By Name

  const handleSearch = () => {
    if (!search) setNotesList(notes);
    else {
      const searchFilter = notes?.filter((note: Note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
      );
      setNotesList(searchFilter as Note[]);
    }
  };

  //?  Filter Notes By Tag Label

  //? sorting notes by prefered order
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
  };

  const sortFun = () => {
    switch (sortOption) {
      case "old": {
        setNotesList([...sortByDate("ascn", notesList)]);
        break;
      }
      case "new": {
        setNotesList([...sortByDate("desc", notesList)]);
        break;
      }
      case "alpha": {
        setNotesList([...sortByAlphabets("desc", notesList)]);
        break;
      }
      case "alphaR": {
        setNotesList([...sortByAlphabets("ascn", notesList)]);
        break;
      }
      case "arabic": {
        const arab = sortByArabic("ascn", notesList);

        break;
      }

      case "arabicR": {
        const arab = sortByArabic("desc", notesList);

        break;
      }
      default:
        break;
    }
  };

  //? sorting notes by color

  const handleColorSort = (event: SelectChangeEvent<string>) => {
    setColorSort(event.target.value);
  };

  //? display notes wilthout tag

  // **************************** UseEffects **********************

  useEffect(() => {
    handleSearch();
  }, [search]);

  useEffect(() => {
    sortFun();
  }, [sortOption]);

  useEffect(() => {
    let filteredNotes;

    // ! All  Notes
    if (!isNoTag && colorSort === "all" && !activeTags.length)
      filteredNotes = notes;

    // ! Tagless Notes
    if (isNoTag) {
      let taglessNotes = notes.filter((note: Note) => !note.tags.length);
      setNotesList([...taglessNotes]);
      if (colorSort !== "all")
        filteredNotes = notes.filter(
          (note: Note) => note.color === colorSort && !note.tags.length
        );
      else filteredNotes = taglessNotes;

      // ! Active Notes
    } else if (activeTags.length) {
      let activeNotes = notes.filter(
        (note: Note) =>
          note.tags.filter((t: Tag) =>
            activeTags.map((tagObj) => tagObj.tag).includes(t.tag)
          ).length
      );

      setNotesList(activeNotes);

      if (colorSort !== "all")
        filteredNotes = notes.filter(
          (note: Note) =>
            note.tags.filter((t: Tag) =>
              activeTags.map((tagObj) => tagObj.tag).includes(t.tag)
            ).length && note.color === colorSort
        );
      else filteredNotes = activeNotes;
    }
    // ! color Notes
    else if (colorSort !== "all") {
      filteredNotes = notes.filter((note: Note) => note.color === colorSort);
    } else filteredNotes = notes;

    setNotesList([...filteredNotes]);
  }, [colorSort, isNoTag, activeTags.length]);

  useEffect(() => {
    setNotesList([...notes]);
  }, [notes]);

  // ***************************************************************

  return (
    <Stack
      alignItems="center"
      minHeight="100vh"
      width="100%"
      sx={{
        color: colors.white[900],
        background: colors.white[100],
      }}
      gap={1}
      p={1}
    >
      <Modal />
      <Stack
        flexDirection="row"
        width="100%"
        sx={{
          flexDirection: {
            sm: "column",
            lg: "row",
          },
        }}
        mb={7}
        justifyContent="space-between"
      >
        <Stack
          width="100%"
          flexWrap="wrap"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: {
              sm: "column",
              lg: "row",
            },
          }}
        >
          {/*  Navbar*/}

          <Typography sx={{ lineHeight: "60px" }} fontWeight="700" variant="h1">
            Notes
          </Typography>

          <IconButton
            sx={{ marginLeft: mobile || tablette ? "0rem" : "auto" }}
            onClick={colorMode?.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{ fontSize: "1.5rem" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "1.5rem" }} />
            )}
          </IconButton>
          <Box display="flex" gap={2}>
            <Button onClick={() => navigate("/new")} variant="contained">
              Create
            </Button>
            <Button onClick={() => setIsModal(true)} variant="outlined">
              Edit Tags
            </Button>
          </Box>
        </Stack>
      </Stack>

      {/*  Search Box */}

      <Box
        display="flex"
        alignItems="center"
        flexDirection={mobile ? "column" : "row"}
        width="100%"
        gap={4}
      >
        {/*  Sort */}
        <Select
          value={sortOption}
          fullWidth
          onChange={(e) => handleSortChange(e)}
          sx={{
            flex: mobile ? "auto" : 0.2,

            height: "40px",
            paddingRight: ".8rem",
          }}
        >
          <MenuItem
            value="alpha"
            sx={{
              opacity: !isThereLatinNotes ? 0.4 : 1,
              pointerEvents: !isThereLatinNotes ? "none" : "initial",
            }}
          >
            A-Z
          </MenuItem>
          <MenuItem
            value="alphaR"
            sx={{
              opacity: !isThereLatinNotes ? 0.4 : 1,
              pointerEvents: !isThereLatinNotes ? "none" : "initial",
            }}
          >
            Z-A
          </MenuItem>
          <MenuItem
            value="arabic"
            sx={{
              opacity: isThereLatinNotes ? 0.4 : 1,
              pointerEvents: isThereLatinNotes ? "none" : "initial",
            }}
          >
            {" "}
            Arabic (A-Z){" "}
          </MenuItem>
          <MenuItem
            value="arabicR"
            sx={{
              opacity: isThereLatinNotes ? 0.4 : 1,
              pointerEvents: isThereLatinNotes ? "none" : "initial",
            }}
          >
            {" "}
            Arabic (Z-A )
          </MenuItem>
          <MenuItem value="new"> Newest </MenuItem>
          <MenuItem value="old"> Oldest </MenuItem>
        </Select>
        {/*  color Sort*/}
        <Select
          id="color-select"
          value={colorSort}
          fullWidth
          onChange={(e) => handleColorSort(e)}
          sx={{
            flex: mobile ? "auto" : 0.2,

            height: "40px",
            paddingRight: ".8rem",
          }}
        >
          <MenuItem key="all-col" value="all">
            {" "}
            All
          </MenuItem>

          {COLORS.map((color, index) => (
            <MenuItem key={index} value={color}>
              <Typography
                textAlign="center"
                sx={{
                  bgcolor: color,
                  minWidth: "100%",
                  minHeight: "22.5px",
                  color: "transparent",
                  boxShadow: " 1px 2px 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              ></Typography>
            </MenuItem>
          ))}
        </Select>
        <TextField
          sx={{ flex: 1 }}
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Title"
          fullWidth
          variant="outlined"
        ></TextField>
        {/* No tag */}

        <Box
          width="100%"
          sx={{
            flex: 1,
            opacity: isNoTag ? 0.4 : 1,
            pointerEvents: isNoTag ? "none" : "initial",
          }}
        >
          <Tags
            tagType="search"
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
        </Box>

        <Button
          sx={{
            flex: mobile ? "auto" : 0.2,

            padding: ".5rem  1.2rem",
          }}
          variant="contained"
          onClick={() => {
            setIsNoTag((prev) => (prev = !prev));
          }}
        >
          {isNoTag! ? "all" : "unlablled"}
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection={sortOption.includes("arabic") ? "row-reverse" : "row"}
        flexWrap="wrap"
        width="100%"
        minHeight="40vh"
        alignItems="stretch"
        justifyContent="space-between"
        gap={4}
        mt={8}
      >
        {/*  Notes list */}

        {!notesList.length ? (
          <Typography
            textAlign="center"
            alignSelf="center"
            sx={{ lineHeight: "4rem", color: "#d6cfcf6b", margin: "0 auto" }}
            variant="h2"
          >
            {" "}
            No Notes Available
          </Typography>
        ) : (
          notesList.map(
            ({ title, tags, body, id, date, color, lang }: Note) => {
              return (
                <NoteCom
                  key={id}
                  title={title}
                  tags={tags}
                  id={id}
                  date={date}
                  color={color}
                  lang={lang}
                >
                  {body.substring(0, 500)}
                </NoteCom>
              );
            }
          )
        )}
      </Box>
    </Stack>
  );
};

export default Notes;
