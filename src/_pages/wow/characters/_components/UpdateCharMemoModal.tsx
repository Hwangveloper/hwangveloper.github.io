import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import useWowCharMemoModalStore from "../_stores/useWowCharMemoModalStore";
import { EWowCharMemoUpdateRequestFields } from "../_constants/wowCharacter";
import { IWowCharacterMemoUpdateRequest } from "../_apis/_models/wowCharacter";
import TextInputField from "../../../../common/_components/fields/TextInputField";

const UpdateCharMemoModal: React.FC = () => {

  const defaultValues = {
    id: '',
    memo: '',
  };

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IWowCharacterMemoUpdateRequest>({
    defaultValues, 
  });

  const { isOpen, char, onConfirm } = useWowCharMemoModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      char: state.char,
      onConfirm: state.onConfirm,
    }))
  );
  
  const { memo } = getValues();

  // 모달 닫기
  const handleCloseModal = () => {
    useWowCharMemoModalStore.setState(
      useWowCharMemoModalStore.getInitialState()
    );
  };

  // 항목 추가
  const onSubmit = () => {

    const { memo } = getValues();

    onConfirm({
      rowIndex: char?.rowIndex ?? -1,
      id: char?.id,
      memo,
    });

    handleCloseModal();
  };

  useEffect(() => {
      if (char) {
        reset({
          id: char.id,
          memo: char.modifiedMemo,
        });
      }
    }, [char, reset]);

  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle>{char?.name}</DialogTitle>
      <DialogContent>
        <form name="updateCharMemoForm" onSubmit={handleSubmit(onSubmit)}>
          {/* 입력 필드 */}
          <TextInputField
            label="캐릭터 메모"
            name={EWowCharMemoUpdateRequestFields.memo}
            control={control}
            defaultValue={memo}
            error={!!errors.memo}
            helperText={errors.memo?.message}
            onChange={(value) => setValue(EWowCharMemoUpdateRequestFields.memo, value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
          취소
        </Button>
        <Button type="submit" form="updateCharMemoForm" onClick={onSubmit} color="primary" variant="contained">
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCharMemoModal;