import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { IWowCharItemUpdateRequest } from "../_apis/_models/wowCharacterItem";
import { EWowItemPartType, EWowItemType, itemPartTypeOptions, itemTypeOptions, EWowCharItemUpdateRequestFields } from "../_constants/wowCharacterItem";
import useWowCharItemModalStore from "../_stores/useWowCharItemModalStore";
import SelectInputField from "../../../../common/_components/fields/SelectInputField";
import { ICommonOption } from "../../../../common/_models/common";
import useWowStore from "../../_stores/useWowStore";
import TextInputField from "../../../../common/_components/fields/TextInputField";

const UpdateCharItemModal: React.FC = () => {

  const defaultValues = {
    items: undefined,
    part: EWowItemPartType.UNDEFINED,
    level: '0',
    type: EWowItemType.ETC,
  };

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IWowCharItemUpdateRequest>({
    defaultValues, 
  });

  const { isOpen, items, itemPartType, onConfirm } = useWowCharItemModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      items: state.items,
      itemPartType: state.itemPartType,
      onConfirm: state.onConfirm,
    }))
  );

  const { itemLevelList, getItemLevelsOfType } = useWowStore(
    useShallow((state) => ({
      itemLevelList: state.itemLevelList,
      getItemLevelsOfType: state.getItemLevelsOfType,
    }))
  );

  const [itemLevelOptions, setItemLevelOptions] = useState<ICommonOption[]>([]);

  const { part, level } = getValues();
  const { type } = watch();

  // 모달 닫기
  const handleCloseModal = () => {
    useWowCharItemModalStore.setState(
      useWowCharItemModalStore.getInitialState()
    );
  };

  // 항목 추가
  const onSubmit = () => {

    const { part, level, type } = getValues();

    onConfirm({
      items,
      part,
      level,
      type,
    });

    handleCloseModal();
  };

  useEffect(() => {
      if (items) {
        const item = items?.[itemPartType as Exclude<EWowItemPartType, EWowItemPartType.UNDEFINED>];
        reset({
          ...item,
          part: itemPartType,
        });
      }
    }, [items, itemPartType, reset]);

  useEffect(() => {
    if (type) {
      if (type === EWowItemType.ETC) {
        setItemLevelOptions(
          itemLevelList.map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          }))
        );
      }
      else {
        setItemLevelOptions(
          getItemLevelsOfType(type).map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          })),
        );
      }
    }
  }, [getItemLevelsOfType, itemLevelList, type]);

  const getItemPartTypeName = (partType: EWowItemPartType) => {
    if (partType === EWowItemPartType.UNDEFINED) {
      return '';
    }
    return itemPartTypeOptions.find((part) => partType === part.value)?.label;
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle>{getItemPartTypeName(part)}</DialogTitle>
      <DialogContent>
        <form name="updateCharItemForm" onSubmit={handleSubmit(onSubmit)}>
          {/* 입력 필드 */}
          {type !== EWowItemType.ETC ? (
            <SelectInputField
              label="아이템 레벨"
              name={EWowCharItemUpdateRequestFields.level}
              options={itemLevelOptions}
              control={control}
              defaultValue={level}
              error={!!errors.level}
              helperText={errors.level?.message}
              onChange={(value) => setValue(EWowCharItemUpdateRequestFields.level, value)}
            />
          ) : (
            <TextInputField
              label="아이템 레벨"
              name={EWowCharItemUpdateRequestFields.level}
              control={control}
              defaultValue={level}
              minLength={1}
              error={!!errors.level}
              helperText={errors.level?.message}
              onChange={(value) => setValue(EWowCharItemUpdateRequestFields.level, value)}
            />
          )}
          <SelectInputField
            label="아이템 타입"
            name={EWowCharItemUpdateRequestFields.type}
            options={itemTypeOptions}
            control={control}
            defaultValue={type}
            error={!!errors.type}
            helperText={errors.type?.message}
            onChange={(value) => setValue(EWowCharItemUpdateRequestFields.type, value as EWowItemType)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
          취소
        </Button>
        <Button type="submit" form="updateCharItemForm" onClick={onSubmit} color="primary" variant="contained">
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCharItemModal;