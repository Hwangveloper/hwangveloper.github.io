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
import SelectInputField from "../../../../common/_components/fields/SelectInputField";
import useWowTierTransmogModalStore from "../_stores/useWowTierTransmogModalStore";
import { collectionStatusOptions, EWowCollectionStatus, EWowTierTransmogUpdateRequestFields, EWowTransmogPartType, itemTransPartTypeOptions } from "../_constants/wowTierTransmog";
import { IWowTierTransmogUpdateRequest } from "../_apis/_models/wowTierTransmog";

const UpdateCharTierTransmogModal: React.FC = () => {

  const defaultValues = {
    transmogs: undefined,
    part: EWowTransmogPartType.HEAD,
    collectionStatus: EWowCollectionStatus.NOT_FIND,
  };

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IWowTierTransmogUpdateRequest>({
    defaultValues, 
  });

  const { isOpen, transmogs, partType, onConfirm } = useWowTierTransmogModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      transmogs: state.transmogs,
      partType: state.partType,
      onConfirm: state.onConfirm,
    }))
  );
  
  const { part, collectionStatus } = getValues();

  // 모달 닫기
  const handleCloseModal = () => {
    useWowTierTransmogModalStore.setState(
      useWowTierTransmogModalStore.getInitialState()
    );
  };

  // 항목 추가
  const onSubmit = () => {

    const { part, collectionStatus } = getValues();

    onConfirm({
      transmogs,
      part,
      collectionStatus,
    });

    handleCloseModal();
  };

  useEffect(() => {
      if (transmogs) {
        const transmog = transmogs?.[partType];
        reset({
          transmogs,
          part: partType,
          collectionStatus: transmog,
        });
      }
    }, [transmogs, partType, reset]);

  const getTierTransmogTypeName = (partType: EWowTransmogPartType) => {
    return itemTransPartTypeOptions.find((part) => partType === part.value)?.label;
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle>{getTierTransmogTypeName(part)}</DialogTitle>
      <DialogContent>
        <form name="updateCharTierTransmogForm" onSubmit={handleSubmit(onSubmit)}>
          {/* 입력 필드 */}
          <SelectInputField
            label="수집 상태"
            name={EWowTierTransmogUpdateRequestFields.collectionStatus}
            options={collectionStatusOptions}
            control={control}
            defaultValue={collectionStatus}
            error={!!errors.collectionStatus}
            helperText={errors.collectionStatus?.message}
            onChange={(value) => setValue(EWowTierTransmogUpdateRequestFields.collectionStatus, value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
          취소
        </Button>
        <Button type="submit" form="updateCharTierTransmogForm" onClick={onSubmit} color="primary" variant="contained">
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCharTierTransmogModal;