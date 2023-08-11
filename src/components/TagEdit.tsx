import { Box, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Tag, useAppContext } from "../context/appContext";

const TagEdit = ({ id, tag }: Tag) => {
  const [value, setValue] = useState(tag);
  const { tags, notes, setNotes, setTags } = useAppContext();

  const handleDeleteTag = (id: string) => {
    const deletedTags = tags.filter((t: Tag) => t.id !== id);
    setTags([...deletedTags]);

    const updatedNotes = notes.map((note) => {
      const foundTag = note.tags.filter((t: Tag) => t.id !== id);
      return { ...note, tags: foundTag };
    });
    setNotes([...updatedNotes]);
  };

  const handleEditTagName = (id: string, tagE: string) => {
    const filteredTags = tags.map((t: Tag) => {
      if (t.id === id) return { id, tag: tagE.trim() };
      return t;
    });

    setTags([...filteredTags]);

    const editedTags = notes.map((note) => {
      return note.tags.map((tag) => {
        const foundTag = filteredTags.find((t: Tag) => t.id === tag.id);

        if (foundTag) return { id: foundTag.id, tag: foundTag.tag };
        else return tag;
      });
    });

    const editedNotes = notes.map((n, index) => {
      return { ...n, tags: [...editedTags[index]] };
    });

    setNotes([...editedNotes]);
  };

  return (
    <Box justifyContent="space-between" display="flex" gap={2} mt={2}>
      <TextField
        size="small"
        sx={{ paddding: ".1rem" }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleEditTagName(id, e.target.value);
        }}
        fullWidth
      ></TextField>

      <IconButton
        size="small"
        sx={{
          borderRadius: " 0px",
          border: ".6px red solippd",
          color: "red",
        }}
        onClick={() => handleDeleteTag(id)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default TagEdit;
