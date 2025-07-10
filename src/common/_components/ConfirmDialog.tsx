import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import useConfirmDialog from "../_stores/useConfirmDialog";

const ConfirmDialog: React.FC = () => {
  const { isOpen, title, message, onConfirm, onClose } = useConfirmDialog(
    useShallow((state) => ({
      isOpen: state.isOpen,
      title: state.title,
      message: state.message,
      onConfirm: state.onConfirm,
      onClose: state.onClose,
    }))
  );

  const handleConfirm = () => {
    onConfirm();
    useConfirmDialog.setState(
      useConfirmDialog.getInitialState()
    );
  };

  const handleClose = () => {
    onClose();
    useConfirmDialog.setState(
      useConfirmDialog.getInitialState()
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
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleConfirm}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
