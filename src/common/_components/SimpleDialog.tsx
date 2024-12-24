import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useSimpleDialog from "../_stores/useSimpleDialog";
import { useShallow } from "zustand/shallow";

const SimpleDialog: React.FC = () => {
  const { isOpen, title, message, onClose } = useSimpleDialog(
    useShallow((state) => ({
      isOpen: state.isOpen,
      title: state.title,
      message: state.message,
      onClose: state.onClose,
    }))
  );

  const handleClose = () => {
    onClose();
    useSimpleDialog.setState(
      useSimpleDialog.getInitialState()
    );
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
