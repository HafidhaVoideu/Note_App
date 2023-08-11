import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { Note, useAppContext } from "../../context/appContext";
import Form from "../../components/Form";
import Title from "../../components/Title";
const EditNote = () => {
  const { notes } = useAppContext();
  const { id } = useParams();
  const editNote = notes?.find((note: Note) => note.id === id);
  if (!editNote) return <section>Note unfound</section>;
  else
    return (
      <Stack
        alignItems="center"
        justifyContent="flex-start"
        gap={4}
        sx={{
          width: "100%",
        }}
      >
        <Title title="Edit Note"></Title>
        <Form form="edit" editNote={editNote} />
      </Stack>
    );
};

export default EditNote;
