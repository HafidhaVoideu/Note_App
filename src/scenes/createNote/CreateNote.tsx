import { Stack, Typography } from "@mui/material";

import Form from "../../components/Form";
import Title from "../../components/Title";

const CreateNote = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="flex-start"
      gap={4}
      sx={{
        width: "100%",
      }}
    >
      <Title title="New Note"></Title>
      <Form form="new" />
    </Stack>
  );
};

export default CreateNote;
