import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { IWowCharItem, IWowCharWeaponUpdateRequest } from "../_apis/_models/wowCharacterItem";
import { EWowItemPartType, EWowItemType, itemPartTypeOptions, itemTypeOptions, EWowCharWeaponUpdateRequestFields } from "../_constants/wowCharacterItem";
import SelectInputField from "../../../../common/_components/fields/SelectInputField";
import { ICommonOption } from "../../../../common/_models/common";
import useWowStore from "../../_stores/useWowStore";
import useWowCharWeaponModalStore from "../_stores/useWowCharWeaponModalStore";
import TextInputField from "../../../../common/_components/fields/TextInputField";

const UpdateCharWeaponModal: React.FC = () => {

  const defaultValues = {
    thWeapon1Level: '0',
    thWeapon1Type: EWowItemType.ETC,
    thWeapon2Level: '0',
    thWeapon2Type: EWowItemType.ETC,
    ohWeapon1Level: '0',
    ohWeapon1Type: EWowItemType.ETC,
    ohWeapon2Level: '0',
    ohWeapon2Type: EWowItemType.ETC,
    ohWeapon3Level: '0',
    ohWeapon3Type: EWowItemType.ETC,
    ohWeapon4Level: '0',
    ohWeapon4Type: EWowItemType.ETC,
  };

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IWowCharWeaponUpdateRequest>({
    defaultValues,
  });

  const { isOpen, items, onConfirm } = useWowCharWeaponModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      items: state.items,
      onConfirm: state.onConfirm,
    }))
  );

  const { itemLevelList, getItemLevelsOfType } = useWowStore(
    useShallow((state) => ({
      itemLevelList: state.itemLevelList,
      getItemLevelsOfType: state.getItemLevelsOfType,
    }))
  );

  const [thWeapon1LevelOptions, setThWeapon1LevelOptions] = useState<ICommonOption[]>([]);
  const [thWeapon2LevelOptions, setThWeapon2LevelOptions] = useState<ICommonOption[]>([]);
  const [ohWeapon1LevelOptions, setOhWeapon1LevelOptions] = useState<ICommonOption[]>([]);
  const [ohWeapon2LevelOptions, setOhWeapon2LevelOptions] = useState<ICommonOption[]>([]);
  const [ohWeapon3LevelOptions, setOhWeapon3LevelOptions] = useState<ICommonOption[]>([]);
  const [ohWeapon4LevelOptions, setOhWeapon4LevelOptions] = useState<ICommonOption[]>([]);

  const { thWeapon1Level, thWeapon2Level, ohWeapon1Level, ohWeapon2Level, ohWeapon3Level, ohWeapon4Level } = getValues();
  const { thWeapon1Type, thWeapon2Type, ohWeapon1Type, ohWeapon2Type, ohWeapon3Type, ohWeapon4Type } = watch();

  // 모달 닫기
  const handleCloseModal = () => {
    useWowCharWeaponModalStore.setState(
      useWowCharWeaponModalStore.getInitialState()
    );
  };

  // 항목 추가
  const onSubmit = () => {

    const {
      thWeapon1Level, thWeapon1Type,
      thWeapon2Level, thWeapon2Type,
      ohWeapon1Level, ohWeapon1Type,
      ohWeapon2Level, ohWeapon2Type,
      ohWeapon3Level, ohWeapon3Type,
      ohWeapon4Level, ohWeapon4Type,
    } = getValues();

    onConfirm({
      items,
      thWeapon1Level, thWeapon1Type,
      thWeapon2Level, thWeapon2Type,
      ohWeapon1Level, ohWeapon1Type,
      ohWeapon2Level, ohWeapon2Type,
      ohWeapon3Level, ohWeapon3Type,
      ohWeapon4Level, ohWeapon4Type,
    });

    handleCloseModal();
  };

  useEffect(() => {
      if (items) {
        reset({
          thWeapon1Level: items.thWeapon1.level,
          thWeapon1Type: items.thWeapon1.type,
          thWeapon2Level: items.thWeapon2.level,
          thWeapon2Type: items.thWeapon2.type,
          ohWeapon1Level: items.ohWeapon1.level,
          ohWeapon1Type: items.ohWeapon1.type,
          ohWeapon2Level: items.ohWeapon2.level,
          ohWeapon2Type: items.ohWeapon2.type,
          ohWeapon3Level: items.ohWeapon3.level,
          ohWeapon3Type: items.ohWeapon3.type,
          ohWeapon4Level: items.ohWeapon4.level,
          ohWeapon4Type: items.ohWeapon4.type,
        });
      }
    }, [items, reset]);

  useEffect(() => {
    if (thWeapon1Type) {
      if (thWeapon1Type === EWowItemType.ETC) {
        setThWeapon1LevelOptions(
          itemLevelList.map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          }))
        );
      }
      else {
        setThWeapon1LevelOptions(
          getItemLevelsOfType(thWeapon1Type).map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          })),
        );
      }
    }
  }, [getItemLevelsOfType, itemLevelList, thWeapon1Type]);

  useEffect(() => {
    if (thWeapon2Type) {
      if (thWeapon2Type === EWowItemType.ETC) {
        setThWeapon2LevelOptions(
          itemLevelList.map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          }))
        );
      }
      else {
        setThWeapon2LevelOptions(
          getItemLevelsOfType(thWeapon2Type).map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          })),
        );
      }
    }
  }, [getItemLevelsOfType, itemLevelList, thWeapon2Type]);

  useEffect(() => {
    if (ohWeapon1Type) {
      if (ohWeapon1Type === EWowItemType.ETC) {
        setOhWeapon1LevelOptions(
          itemLevelList.map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          }))
        );
      }
      else {
        setOhWeapon1LevelOptions(
          getItemLevelsOfType(ohWeapon1Type).map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          })),
        );
      }
    }
  }, [getItemLevelsOfType, itemLevelList, ohWeapon1Type]);

  useEffect(() => {
    if (ohWeapon2Type) {
      if (ohWeapon2Type === EWowItemType.ETC) {
        setOhWeapon2LevelOptions(
          itemLevelList.map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          }))
        );
      }
      else {
        setOhWeapon2LevelOptions(
          getItemLevelsOfType(ohWeapon2Type).map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          })),
        );
      }
    }
  }, [getItemLevelsOfType, itemLevelList, ohWeapon2Type]);

  useEffect(() => {
    if (ohWeapon3Type) {
      if (ohWeapon3Type === EWowItemType.ETC) {
        setOhWeapon3LevelOptions(
          itemLevelList.map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          }))
        );
      }
      else {
        setOhWeapon3LevelOptions(
          getItemLevelsOfType(ohWeapon3Type).map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          })),
        );
      }
    }
  }, [getItemLevelsOfType, itemLevelList, ohWeapon3Type]);

  useEffect(() => {
    if (ohWeapon4Type) {
      if (ohWeapon4Type === EWowItemType.ETC) {
        setOhWeapon4LevelOptions(
          itemLevelList.map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          }))
        );
      }
      else {
        setOhWeapon4LevelOptions(
          getItemLevelsOfType(ohWeapon4Type).map((lvl) => ({
            label: lvl.itemLevel,
            value: lvl.itemLevel,
          })),
        );
      }
    }
  }, [getItemLevelsOfType, itemLevelList, ohWeapon4Type]);

  const getItemPartTypeName = (partType: EWowItemPartType) => {
    return itemPartTypeOptions.find((part) => partType === part.value)?.label;
  }

  const isActiveJobWeaponType = (items?: IWowCharItem, partType?: EWowItemPartType) => {
    
    switch (items?.charJob) {
      case "수도사": {
        if (partType !== EWowItemPartType.UNDEFINED) {
          return true;
        }
        break;
      }
      case "드루이드": {
        if (partType === EWowItemPartType.TWO_HAND_WEAPON1
          || partType === EWowItemPartType.TWO_HAND_WEAPON2
          || partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
        ) {
          return true;
        }
        break;
      }
      case "악마사냥꾼": {
        if (partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
          || partType === EWowItemPartType.ONE_HAND_WEAPON3
          || partType === EWowItemPartType.ONE_HAND_WEAPON4
        ) {
          return true;
        }
        break;
      }
      case "도적": {
        if (partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
          || partType === EWowItemPartType.ONE_HAND_WEAPON3
          || partType === EWowItemPartType.ONE_HAND_WEAPON4
        ) {
          return true;
        }
        break;
      }
      case "기원사": {
        if (partType === EWowItemPartType.TWO_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
        ) {
          return true;
        }
        break;
      }
      case "사냥꾼": {
        if (partType === EWowItemPartType.TWO_HAND_WEAPON1
          || partType === EWowItemPartType.TWO_HAND_WEAPON2
          || partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
        ) {
          return true;
        }
        break;
      }
      case "주술사": {
        if (partType === EWowItemPartType.TWO_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
          || partType === EWowItemPartType.ONE_HAND_WEAPON3
          || partType === EWowItemPartType.ONE_HAND_WEAPON4
        ) {
          return true;
        }
        break;
      }
      case "마법사": {
        if (partType === EWowItemPartType.TWO_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
        ) {
          return true;
        }
        break;
      }
      case "사제": {
        if (partType === EWowItemPartType.TWO_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
        ) {
          return true;
        }
        break;
      }
      case "흑마법사": {
        if (partType === EWowItemPartType.TWO_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
        ) {
          return true;
        }
        break;
      }
      case "성기사": {
        if (partType !== EWowItemPartType.UNDEFINED) {
          return true;
        }
        break;
      }
      case "전사": {
        if (partType !== EWowItemPartType.UNDEFINED) {
          return true;
        }
        break;
      }
      case "죽음의 기사": {
        if (partType === EWowItemPartType.TWO_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON1
          || partType === EWowItemPartType.ONE_HAND_WEAPON2
        ) {
          return true;
        }
        break;
      }
    }

    return false;
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle>{getItemPartTypeName(EWowItemPartType.UNDEFINED)}</DialogTitle>
      <DialogContent>
        <form name="updateCharWeaponForm" onSubmit={handleSubmit(onSubmit)}>
          {/* 입력 필드 */}
          {isActiveJobWeaponType(items, EWowItemPartType.TWO_HAND_WEAPON1) && <Box display="flex" flexDirection="row" gap="8px">
            <Typography width={"200px"} alignContent="center">{getItemPartTypeName(EWowItemPartType.TWO_HAND_WEAPON1)}</Typography>
            {thWeapon1Type !== EWowItemType.ETC ? (
              <SelectInputField
                label="아이템 레벨"
                name={EWowCharWeaponUpdateRequestFields.thWeapon1Level}
                options={thWeapon1LevelOptions}
                control={control}
                defaultValue={thWeapon1Level}
                error={!!errors.thWeapon1Level}
                helperText={errors.thWeapon1Level?.message}
                onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.thWeapon1Level, value)}
              />
            ) : (
              <TextInputField
                label="아이템 레벨"
                name={EWowCharWeaponUpdateRequestFields.thWeapon1Level}
                control={control}
                defaultValue={thWeapon1Level}
                minLength={1}
                error={!!errors.thWeapon1Level}
                helperText={errors.thWeapon1Level?.message}
                onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.thWeapon1Level, value)}
              />
            )}
            <SelectInputField
              label="아이템 타입"
              name={EWowCharWeaponUpdateRequestFields.thWeapon1Type}
              options={itemTypeOptions}
              control={control}
              defaultValue={thWeapon1Type}
              error={!!errors.thWeapon1Type}
              helperText={errors.thWeapon1Type?.message}
              onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.thWeapon1Type, value as EWowItemType)}
            />
          </Box>}
          {isActiveJobWeaponType(items, EWowItemPartType.TWO_HAND_WEAPON2) && <Box>
            <Divider sx={{ my: "4px" }} />
            <Box display="flex" flexDirection="row" gap="8px">
              <Typography width={"200px"} alignContent="center">{getItemPartTypeName(EWowItemPartType.TWO_HAND_WEAPON2)}</Typography>
              {thWeapon2Type !== EWowItemType.ETC ? (
                <SelectInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.thWeapon2Level}
                  options={thWeapon2LevelOptions}
                  control={control}
                  defaultValue={thWeapon2Level}
                  error={!!errors.thWeapon2Level}
                  helperText={errors.thWeapon2Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.thWeapon2Level, value)}
                />
              ) : (
                <TextInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.thWeapon2Level}
                  control={control}
                  defaultValue={thWeapon2Level}
                  minLength={1}
                  error={!!errors.thWeapon2Level}
                  helperText={errors.thWeapon2Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.thWeapon2Level, value)}
                />
              )}
              <SelectInputField
                label="아이템 타입"
                name={EWowCharWeaponUpdateRequestFields.thWeapon2Type}
                options={itemTypeOptions}
                control={control}
                defaultValue={thWeapon2Type}
                error={!!errors.thWeapon2Type}
                helperText={errors.thWeapon2Type?.message}
                onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.thWeapon2Type, value as EWowItemType)}
              />
            </Box>
          </Box>}
          {isActiveJobWeaponType(items, EWowItemPartType.ONE_HAND_WEAPON1) && <Box>
            <Divider sx={{ my: "4px" }} />
            <Box display="flex" flexDirection="row" gap="8px">
              <Typography width={"200px"} alignContent="center">{getItemPartTypeName(EWowItemPartType.ONE_HAND_WEAPON1)}</Typography>
              {ohWeapon1Type !== EWowItemType.ETC ? (
                <SelectInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.ohWeapon1Level}
                  options={ohWeapon1LevelOptions}
                  control={control}
                  defaultValue={ohWeapon1Level}
                  error={!!errors.ohWeapon1Level}
                  helperText={errors.ohWeapon1Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon1Level, value)}
                />
              ) : (
                <TextInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.ohWeapon1Level}
                  control={control}
                  defaultValue={ohWeapon1Level}
                  minLength={1}
                  error={!!errors.ohWeapon1Level}
                  helperText={errors.ohWeapon1Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon1Level, value)}
                />
              )}
              <SelectInputField
                label="아이템 타입"
                name={EWowCharWeaponUpdateRequestFields.ohWeapon1Type}
                options={itemTypeOptions}
                control={control}
                defaultValue={ohWeapon1Type}
                error={!!errors.ohWeapon1Type}
                helperText={errors.ohWeapon1Type?.message}
                onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon1Type, value as EWowItemType)}
              />
            </Box>
            <Box display="flex" flexDirection="row" gap="8px">
              <Typography width={"200px"} alignContent="center">{getItemPartTypeName(EWowItemPartType.ONE_HAND_WEAPON2)}</Typography>
              {ohWeapon2Type !== EWowItemType.ETC ? (
                <SelectInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.ohWeapon2Level}
                  options={ohWeapon2LevelOptions}
                  control={control}
                  defaultValue={ohWeapon2Level}
                  error={!!errors.ohWeapon2Level}
                  helperText={errors.ohWeapon2Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon2Level, value)}
                />
              ) : (
                <TextInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.ohWeapon2Level}
                  control={control}
                  defaultValue={ohWeapon2Level}
                  minLength={1}
                  error={!!errors.ohWeapon2Level}
                  helperText={errors.ohWeapon2Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon2Level, value)}
                />
              )}
              <SelectInputField
                label="아이템 타입"
                name={EWowCharWeaponUpdateRequestFields.ohWeapon2Type}
                options={itemTypeOptions}
                control={control}
                defaultValue={ohWeapon2Type}
                error={!!errors.ohWeapon2Type}
                helperText={errors.ohWeapon2Type?.message}
                onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon2Type, value as EWowItemType)}
              />
            </Box>
          </Box>}
          {isActiveJobWeaponType(items, EWowItemPartType.ONE_HAND_WEAPON3) && <Box>
            <Divider sx={{ my: "4px" }} />
            <Box display="flex" flexDirection="row" gap="8px">
              <Typography width={"200px"} alignContent="center">{getItemPartTypeName(EWowItemPartType.ONE_HAND_WEAPON3)}</Typography>
              {ohWeapon3Type !== EWowItemType.ETC ? (
                <SelectInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.ohWeapon3Level}
                  options={ohWeapon3LevelOptions}
                  control={control}
                  defaultValue={ohWeapon3Level}
                  error={!!errors.ohWeapon3Level}
                  helperText={errors.ohWeapon3Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon3Level, value)}
                />
              ) : (
                <TextInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.ohWeapon3Level}
                  control={control}
                  defaultValue={ohWeapon3Level}
                  minLength={1}
                  error={!!errors.ohWeapon3Level}
                  helperText={errors.ohWeapon3Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon3Level, value)}
                />
              )}
              <SelectInputField
                label="아이템 타입"
                name={EWowCharWeaponUpdateRequestFields.ohWeapon3Type}
                options={itemTypeOptions}
                control={control}
                defaultValue={ohWeapon3Type}
                error={!!errors.ohWeapon3Type}
                helperText={errors.ohWeapon3Type?.message}
                onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon3Type, value as EWowItemType)}
              />
            </Box>
            <Box display="flex" flexDirection="row" gap="8px">
              <Typography width={"200px"} alignContent="center">{getItemPartTypeName(EWowItemPartType.ONE_HAND_WEAPON4)}</Typography>
              {ohWeapon4Type !== EWowItemType.ETC ? (
                <SelectInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.ohWeapon4Level}
                  options={ohWeapon4LevelOptions}
                  control={control}
                  defaultValue={ohWeapon4Level}
                  error={!!errors.ohWeapon4Level}
                  helperText={errors.ohWeapon4Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon4Level, value)}
                />
              ) : (
                <TextInputField
                  label="아이템 레벨"
                  name={EWowCharWeaponUpdateRequestFields.ohWeapon4Level}
                  control={control}
                  defaultValue={ohWeapon4Level}
                  minLength={1}
                  error={!!errors.ohWeapon4Level}
                  helperText={errors.ohWeapon4Level?.message}
                  onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon4Level, value)}
                />
              )}
              <SelectInputField
                label="아이템 타입"
                name={EWowCharWeaponUpdateRequestFields.ohWeapon4Type}
                options={itemTypeOptions}
                control={control}
                defaultValue={ohWeapon4Type}
                error={!!errors.ohWeapon4Type}
                helperText={errors.ohWeapon4Type?.message}
                onChange={(value) => setValue(EWowCharWeaponUpdateRequestFields.ohWeapon4Type, value as EWowItemType)}
              />
            </Box>
          </Box>}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
          취소
        </Button>
        <Button type="submit" form="updateCharWeaponForm" onClick={onSubmit} color="primary" variant="contained">
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCharWeaponModal;