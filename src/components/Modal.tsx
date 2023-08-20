import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { Tag, useAppContext } from "../context/appContext";
import TagEdit from "./TagEdit";

import CloseIcon from "@mui/icons-material/Close";

import useMediaQuery from "@mui/material/useMediaQuery";
const Modal = () => {
  const { tags, setIsModal, isModal } = useAppContext();

  const fullScreen = useMediaQuery("(max-width:900px)");

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isModal}
      onClose={() => setIsModal(false)}
      sx={{
        position: "absolute",
        bottom: "20vh",
        overFlowY: "scroll",
        height: "600px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <DialogTitle id="tags-id"> Tags</DialogTitle>

        <CloseIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setIsModal(false)}
        />
      </Box>
      <DialogContent
        sx={{
          width: {
            md: "500px",
          },
        }}
      >
        {tags.map((t: Tag) => {
          return <TagEdit key={t.id} {...t} />;
        })}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
