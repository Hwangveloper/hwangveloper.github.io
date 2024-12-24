import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useTodoModalStore from "../_stores/useTodoModalStore";
import { useShallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { ETaskCategory, IHomeOutlineUpdateRequestFields, taskCategoryOptions, timeUnitOptions } from "../_constants/homeOutline";
import { ECommonTimeUnit, ECommonYN } from "../../../common/_constants/common";
import TextInputField from "../../../common/_components/fields/TextInputField";
import { IHomeOutlineUpdateRequest } from "../_apis/_models/home";
import useHomeStore from "../_stores/useHomeStore";
import { OUTLINE_SHEET_DEFAULT_ID } from "../../../common/_constants/sheets";
import SelectInputField from "../../../common/_components/fields/SelectInputField";
import NumberInputField from "../../../common/_components/fields/NumberInputField";
import dayjs from "dayjs";

const UpdateTodoModal: React.FC = () => {

  const defaultValues = {
    rowIndex: undefined,
    id: undefined,
    name: '',
    category: ETaskCategory.NORMAL,
    periodCount: 1,
    periodUnit: ECommonTimeUnit.DAY,
    maxPeriodCount: 1,
    maxPeriodUnit: ECommonTimeUnit.DAY,
    repeat: ECommonYN.N,
  };

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IHomeOutlineUpdateRequest>({
    defaultValues, 
  });

  const { isOpen, todoItem, onConfirm } = useTodoModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      todoItem: state.todoItem,
      onConfirm: state.onConfirm,
    }))
  );

  const { id, name, category, periodCount, periodUnit, maxPeriodCount, maxPeriodUnit } = getValues();

  const { outlineList } = useHomeStore(
    useShallow((state) => ({
      outlineList: state.outlineList,
    }))
  );

  // 모달 닫기
  const handleCloseModal = () => {
    useTodoModalStore.setState(
      useTodoModalStore.getInitialState()
    );
    reset(defaultValues); // 모달 닫을 때 입력값 초기화
  };

  // 항목 추가
  const onSubmit = () => {
    if (id) {
      onConfirm(getValues());
    } else {
      const rowIndex = outlineList.sort((a, b) => a.rowIndex - b.rowIndex).reduce((prev, curr) => {
        if (prev === curr.rowIndex) {
          return curr.rowIndex + 1;
        } else {
          return prev;
        }
      }, 0);
      onConfirm({
        ...getValues(),
        rowIndex,
        id: `${OUTLINE_SHEET_DEFAULT_ID}${rowIndex}`,
        lastDoneDatetime: dayjs().subtract(periodCount, periodUnit as ECommonTimeUnit),
      });
    }
    handleCloseModal();
  };

  useEffect(() => {
    if (todoItem) {
      reset({
        ...todoItem,
        periodCount: todoItem.period.period,
        periodUnit: todoItem.period.unit,
        maxPeriodCount: todoItem.maxPeriod?.period,
        maxPeriodUnit: todoItem.maxPeriod?.unit,
      });
    }
  }, [todoItem, reset]);

  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle>{id ? "할 일 변경" : "새 할 일 추가"}</DialogTitle>
      <DialogContent>
        <form name="newTaskForm" onSubmit={handleSubmit(onSubmit)}>
          {/* 입력 필드 */}
          <TextInputField
            label="이름"
            name={IHomeOutlineUpdateRequestFields.name}
            control={control}
            defaultValue={name}
            minLength={3}
            error={!!errors.name}
            helperText={errors.name?.message}
            onChange={(value) => setValue(IHomeOutlineUpdateRequestFields.name, value)}
          />
          <SelectInputField
            label="카테고리"
            name={IHomeOutlineUpdateRequestFields.category}
            options={taskCategoryOptions}
            control={control}
            defaultValue={category}
            error={!!errors.category}
            helperText={errors.category?.message}
            onChange={(value) => setValue(IHomeOutlineUpdateRequestFields.category, value)}
          />
          <Box display="flex" flexDirection="row" gap="8px">
            <NumberInputField
              label="기간"
              name={IHomeOutlineUpdateRequestFields.periodCount}
              control={control}
              defaultValue={periodCount}
              minLength={3}
              error={!!errors.periodCount}
              helperText={errors.periodCount?.message}
              onChange={(value) => setValue(IHomeOutlineUpdateRequestFields.periodCount, value)}
            />
            <SelectInputField
              label=""
              name={IHomeOutlineUpdateRequestFields.periodUnit}
              options={timeUnitOptions}
              control={control}
              defaultValue={periodUnit}
              error={!!errors.periodUnit}
              helperText={errors.periodUnit?.message}
              onChange={(value) => setValue(IHomeOutlineUpdateRequestFields.periodUnit, value)}
            />
          </Box>
          <Box display="flex" flexDirection="row" gap="8px">
            <NumberInputField
              label="최대기간"
              name={IHomeOutlineUpdateRequestFields.maxPeriodCount}
              control={control}
              defaultValue={maxPeriodCount}
              minLength={3}
              error={!!errors.maxPeriodCount}
              helperText={errors.maxPeriodCount?.message}
              onChange={(value) => setValue(IHomeOutlineUpdateRequestFields.maxPeriodCount, value)}
            />
            <SelectInputField
              label=""
              name={IHomeOutlineUpdateRequestFields.maxPeriodUnit}
              options={timeUnitOptions}
              control={control}
              defaultValue={maxPeriodUnit}
              error={!!errors.maxPeriodUnit}
              helperText={errors.maxPeriodUnit?.message}
              onChange={(value) => setValue(IHomeOutlineUpdateRequestFields.maxPeriodUnit, value)}
            />
          </Box>
          {/* <SelectInputField
            label="반복"
            name={IHomeOutlineUpdateRequestFields.repeat}
            options={commonYNOptions}
            control={control}
            defaultValue={repeat}
            error={!!errors.repeat}
            helperText={errors.repeat?.message}
            onChange={(value) => setValue(IHomeOutlineUpdateRequestFields.repeat, value)}
          /> */}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
          취소
        </Button>
        <Button type="submit" form="newTaskForm" onClick={onSubmit} color="primary" variant="contained">
          {id ? "수정" : "추가"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTodoModal;