import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type ConfirmationProps = {
  isConfirmDelete: boolean;
  setIsConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: (id: string) => void;
  id: string;
};

const Confirmation = ({
  isConfirmDelete,
  setIsConfirmDelete,
  handleConfirm,
  id,
}: ConfirmationProps) => {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isConfirmDelete}
        onClose={() => setIsConfirmDelete(false)}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setIsConfirmDelete(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsConfirmDelete(false);
              handleConfirm(id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirmation;
