import { useState, useEffect, useRef } from "react";

import {
  Chip,
  Box,
  InputBase,
  Typography,
  Divider,
  IconButton,
  useTheme,
  ClickAwayListener,
} from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import { Tag, useAppContext } from "../context/appContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidV4 } from "uuid";
import { tokens } from "../theme/muiTheme";

// **************************** TYpes**********************

type TagsProps = {
  tagType: "create" | "search";
  activeTags: Tag[];
  setActiveTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  language?: string;
};

const Tags = ({ tagType, activeTags, setActiveTags, language }: TagsProps) => {
  const { tags, setTags } = useAppContext();
  const [tagsList, setTagsList] = useState<Tag[]>(tags);
  const [isDropdown, setIsDropdown] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [index, setIndex] = useState(0);
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const [isFocus, setIsFocus] = useState(false);
  const menuRef = useRef<HTMLDivElement>();

  // **************************** Theme**********************

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSelectedTag = (tag: Tag) => {
    const activeTagsMapped = activeTags.map((tagObj: Tag) => tagObj.tag);

    if (!activeTagsMapped.includes(tag.tag)) {
      setActiveTags([...activeTags, tag]);
      setTagSearch("");
      setIsDropdown(false);
    }
  };

  const handleDeleteActiveTag = (tag: Tag) => {
    setActiveTags(activeTags.filter((t: Tag) => t.tag !== tag.tag));
  };

  const handleTagSearch = () => {
    if (!tagSearch) {
      setTagsList([...tags]);
    } else {
      setIsDropdown(true);

      const searchTagFilter = tags?.filter((t: Tag) =>
        t.tag.toLowerCase().includes(tagSearch.toLowerCase())
      );
      setTagsList([...searchTagFilter]);
    }
  };

  const handleCreateTag = (tag: Tag) => {
    if (tag.tag) {
      localStorage.setItem("tags", JSON.stringify([...tags, tag]));
      setTags([...tags, tag]);
      setActiveTags([...activeTags, tag]);
      setIsDropdown(false);
      setTagSearch("");
    }
  };

  document.onkeydown = function (event) {
    if (isDropdown)
      switch (event.keyCode) {
        case 40:
          if (index < tagsList.length - 1) {
            setIndex((prev) => prev + 1);

            if (menuRef.current) {
              menuRef.current.scrollTop += 25;
            }
          }

          break;

        case 38:
          if (index > 0) {
            setIndex((prev) => prev - 1);
            if (menuRef.current) {
              menuRef.current.scrollTop -= 25;
            }
          }

          break;
        case 13:
          if (selectedTag) handleSelectedTag(selectedTag);

          break;
      }
  };

  useEffect(() => {
    handleTagSearch();
  }, [tagSearch]);

  useEffect(() => {
    setTagsList(tags);
  }, [tags]);

  useEffect(() => {
    setSelectedTag(tagsList[index]);
  }, [index]);

  useEffect(() => {
    const handleScroll = (event: KeyboardEvent) => {
      if (
        isDropdown &&
        (event.key === "ArrowDown" || event.key === "ArrowUp")
      ) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleScroll);
    window.addEventListener("keyup", handleScroll);

    if (!isDropdown) {
      setIndex(-1);
    }
    return () => {
      window.removeEventListener("keydown", handleScroll);
      window.removeEventListener("keyup", handleScroll);
    };
  }, [isDropdown]);

  const handleClickAway = () => {
    setIsFocus(false);
    setIsDropdown(false);
  };

  const create = (
    <Typography
      onClick={() =>
        handleCreateTag({ id: `${uuidV4()}-tag`, tag: tagSearch.trim() })
      }
      p={1}
      sx={{
        color: colors.white[900],
        "&:hover": { bgcolor: colors.white[300], cursor: "pointer" },
      }}
    >
      create "{tagSearch}"
    </Typography>
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box flex={1} position="relative" width="100%">
        <FormControl
          sx={{
            height: "100%",
          }}
          fullWidth
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={0.8}
            height="100%"
            p={0.3}
            onClick={() => setIsFocus(true)}
            sx={{
              border: "2px solid",
              borderWidth: isFocus ? "2px" : "1px",
              borderRadius: "4px",
              borderColor:
                theme.palette.mode === "light"
                  ? isFocus
                    ? colors.blue[500]
                    : "#aeababeb"
                  : isFocus
                  ? "#fff"
                  : "#686767eb",
            }}
          >
            <Box
              display={activeTags.length ? "flex" : "none"}
              alignItems="center"
              gap=".1rem"
            >
              {activeTags.map((st: Tag, index: number) => {
                return (
                  <Chip
                    sx={{ padding: 0 }}
                    key={index}
                    onDelete={() => handleDeleteActiveTag(st)}
                    label={st.tag}
                  />
                );
              })}
            </Box>
            <InputBase
              dir={language === "AR" ? "rtl" : "ltr"}
              placeholder="Tags"
              value={tagSearch}
              fullWidth
              onChange={(e) => setTagSearch(e.target.value.trimStart())}
              sx={{
                margin: 0,
                paddingLeft: ".2rem",
              }}
            ></InputBase>

            <Box display="flex" gap={1}>
              <IconButton onClick={() => setActiveTags([])} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
              <Divider orientation="vertical" flexItem></Divider>

              <IconButton
                onClick={() => {
                  setIsDropdown((prev: boolean) => (prev = !prev));
                }}
                size="small"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          </Box>
        </FormControl>

        {isDropdown && (
          <Box
            ref={menuRef}
            component="div"
            sx={{
              scrollBehavior: "smooth",
              position: "absolute",
              bgcolor: colors.white[100],
              width: "inherit",
              zIndex: 33,
              height: tagsList?.length
                ? `${25 * (tagsList.length + 1) + 32}px`
                : "85px",
              padding: "1rem",
              overflowY: "scroll",
              marginTop: "1rem",
              boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              border: ".1px  solid",
              borderColor: colors.white[100],
              borderRadius: "10px",
            }}
          >
            {tagsList?.map((t: Tag) => {
              return (
                <Typography
                  color={colors.white[900]}
                  onClick={() => handleSelectedTag(t)}
                  key={t.id}
                  p={1}
                  className={`${
                    t.id === selectedTag?.id
                      ? theme.palette.mode === "light"
                        ? "hoverLight"
                        : "hoverDark"
                      : ""
                  }  `}
                  sx={{
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "light"
                          ? colors.white[200]
                          : "#575755",
                      cursor: "pointer",
                    },
                  }}
                >
                  {t.tag}
                </Typography>
              );
            })}

            {!tagsList.length &&
              (tagType === "search" ? (
                <Typography mt={2} align="center">
                  No Options
                </Typography>
              ) : (
                create
              ))}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default Tags;
