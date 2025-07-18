import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { ISimpleTextInputRequest } from "../_apis/_models/modals";
import useSimpleTextInputDialog from "../_stores/useSimpleTextInputDialog";
import TextInputField from "./fields/TextInputField";
import { ESimpleTextInputRequestFields } from "../_constants/simpleTextInput";

const SimpleTextInputModal: React.FC = () => {

  const defaultValues = {
    text: '',
  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ISimpleTextInputRequest>({
    defaultValues, 
  });

  const { isOpen, title, name, onConfirm } = useSimpleTextInputDialog(
    useShallow((state) => ({
      isOpen: state.isOpen,
      title: state.title,
      name: state.name,
      onConfirm: state.onConfirm,
    }))
  );
  
  // 모달 닫기
  const handleCloseModal = () => {
    useSimpleTextInputDialog.setState(
      useSimpleTextInputDialog.getInitialState()
    );
  };

  // 항목 추가
  const onSubmit = () => {

    const { text } = getValues();

    onConfirm(text);

    handleCloseModal();
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form name="simpleTextForm" onSubmit={handleSubmit(onSubmit)}>
          {/* 입력 필드 */}
          <TextInputField
            label="이름"
            name={ESimpleTextInputRequestFields.text}
            control={control}
            defaultValue={name}
            minLength={3}
            error={!!errors.text}
            helperText={errors.text?.message}
            onChange={(value) => setValue(ESimpleTextInputRequestFields.text, value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
          취소
        </Button>
        <Button type="submit" form="simpleTextForm" onClick={onSubmit} color="primary" variant="contained">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleTextInputModal;