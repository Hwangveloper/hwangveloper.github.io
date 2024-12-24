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
import TextInputField from "../../../common/_components/fields/TextInputField";
import SelectInputField from "../../../common/_components/fields/SelectInputField";
import dayjs from "dayjs";
import { IProjectTaskUpdateRequest } from "../_apis/_models/projectTask";
import { EProjectTaskPriority, EProjectTaskStatus, EProjectTaskType, EProjectTaskSaveRequestFields, taskStatusOptions, projectTaskTypeOptions, taskPriorityOptions } from "../_constants/projectTask";
import useProjectTaskUpdateModalStore from "../_stores/useProjectTaskUpdateModalStore";
import useProjectTaskStore from "../_stores/useProjectTaskStore";
import useProjectStore from "../_stores/useProjectStore";
import { ICommonOption } from "../../../common/_models/common";
import DatePickerField from "../../../common/_components/fields/DatePickerField";
import { PROJECT_TASK_SHEET_DEFAULT_ID } from "../../../common/_constants/sheets";

const UpdateProjectTaskModal: React.FC = () => {

  const defaultValues = {
    rowIndex: undefined,
    id: undefined,
    projectId: '',
    prevTaskId: '',
    type: EProjectTaskType.PLANNING,
    label: '',
    priority: EProjectTaskPriority.MEDIUM,
    title: '',
    description: '',
    state: EProjectTaskStatus.BACKLOG,
    startDatetime: dayjs(),
    endDatetime: dayjs(),
  };

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IProjectTaskUpdateRequest>({
    defaultValues, 
  });

  const { projectList } = useProjectStore(
    useShallow((state) => ({
      projectList: state.projectList,
    }))
  );

  const { taskList } = useProjectTaskStore(
    useShallow((state) => ({
      taskList: state.taskList,
    }))
  );

  const { isOpen, projectTask, taskStatus, onConfirm } = useProjectTaskUpdateModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      projectTask: state.projectTask,
      taskStatus: state.taskStatus,
      onConfirm: state.onConfirm,
    }))
  );

  const [projectOptions, setProjectOptions] = useState<ICommonOption[]>([]);
  const [taskOptions, setTaskOptions] = useState<ICommonOption[]>([]);

  const { id, projectId, prevTaskId, type, label, priority, title, description, state, startDatetime, endDatetime } = getValues();

  // 모달 닫기
  const handleCloseModal = () => {
    useProjectTaskUpdateModalStore.setState(
      useProjectTaskUpdateModalStore.getInitialState()
    );
    reset(defaultValues); // 모달 닫을 때 입력값 초기화
  };

  // 항목 추가
  const onSubmit = () => {
    if (id) {
      onConfirm(getValues());
    } else {
      const rowIndex = taskList.sort((a, b) => a.rowIndex - b.rowIndex).reduce((prev, curr) => {
        if (prev === curr.rowIndex) {
          return curr.rowIndex + 1;
        } else {
          return prev;
        }
      }, 0);
      onConfirm({
        ...getValues(),
        rowIndex,
        id: `${PROJECT_TASK_SHEET_DEFAULT_ID}${rowIndex}`,
      });
    }
    handleCloseModal();
  };

  useEffect(() => {
    if (projectList && projectList.length > 0) {
      setValue(EProjectTaskSaveRequestFields.projectId, projectList[0]?.id ?? '');
      setProjectOptions(projectList.map((proj) => ({
        label: proj.title,
        value: proj.id,
      })));
    }
  }, [projectList, setValue]);

  useEffect(() => {
    if (taskList && taskList.length > 0) {
      setTaskOptions([
        { label: "선택 안 함", value: "" },
        ...taskList.filter((task) => task.id !== id).map((task) => ({
          label: task.title,
          value: task.id,
        })),
      ]);
    }
  }, [taskList, id]);

  useEffect(() => {
    if (projectTask) {
      reset({
        ...projectTask,
      });
    }
  }, [projectTask, reset]);

  useEffect(() => {
    if (taskStatus) {
      console.log(taskStatus);
      setValue(EProjectTaskSaveRequestFields.state, taskStatus);
    }
  }, [taskStatus, setValue]);

  return (
    <Dialog open={isOpen} maxWidth="md" onClose={handleCloseModal}>
      <DialogTitle>{id ? "할 일 변경" : "새 할 일 추가"}</DialogTitle>
      <DialogContent sx={{width: "500px"}}>
        <form name="newProjectTaskForm" onSubmit={handleSubmit(onSubmit)}>
          {/* 입력 필드 */}
          <SelectInputField
            label="프로젝트"
            name={EProjectTaskSaveRequestFields.projectId}
            options={projectOptions}
            control={control}
            defaultValue={projectId}
            error={!!errors.projectId}
            helperText={errors.projectId?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.projectId, value)}
          />
          <SelectInputField
            label="이전 할 일"
            name={EProjectTaskSaveRequestFields.prevTaskId}
            options={taskOptions}
            control={control}
            defaultValue={prevTaskId}
            error={!!errors.prevTaskId}
            helperText={errors.prevTaskId?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.prevTaskId, value)}
          />
          <SelectInputField
            label="타입"
            name={EProjectTaskSaveRequestFields.type}
            options={projectTaskTypeOptions}
            control={control}
            defaultValue={type}
            error={!!errors.type}
            helperText={errors.type?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.type, value)}
          />
          <SelectInputField
            label="우선순위"
            name={EProjectTaskSaveRequestFields.priority}
            options={taskPriorityOptions}
            control={control}
            defaultValue={priority}
            error={!!errors.priority}
            helperText={errors.priority?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.priority, value)}
          />
          <TextInputField
            label="라벨"
            name={EProjectTaskSaveRequestFields.label}
            control={control}
            defaultValue={label}
            minLength={3}
            error={!!errors.label}
            helperText={errors.label?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.label, value)}
          />
          <TextInputField
            label="제목"
            name={EProjectTaskSaveRequestFields.title}
            control={control}
            defaultValue={title}
            minLength={3}
            error={!!errors.title}
            helperText={errors.title?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.title, value)}
          />
          <TextInputField
            label="설명"
            name={EProjectTaskSaveRequestFields.description}
            control={control}
            defaultValue={description}
            minLength={3}
            error={!!errors.description}
            helperText={errors.description?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.description, value)}
          />
          <SelectInputField
            label="상태"
            name={EProjectTaskSaveRequestFields.state}
            options={taskStatusOptions}
            control={control}
            defaultValue={state}
            disabled={true}
            error={!!errors.state}
            helperText={errors.state?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.state, value)}
          />
          <DatePickerField
            label="시작일자"
            name={EProjectTaskSaveRequestFields.startDatetime}
            control={control}
            defaultValue={startDatetime}
            error={!!errors.startDatetime}
            helperText={errors.startDatetime?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.startDatetime, value ?? undefined)}
          />
          <DatePickerField
            label="종료일자"
            name={EProjectTaskSaveRequestFields.endDatetime}
            control={control}
            defaultValue={endDatetime}
            error={!!errors.endDatetime}
            helperText={errors.endDatetime?.message}
            onChange={(value) => setValue(EProjectTaskSaveRequestFields.endDatetime, value ?? undefined)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
          취소
        </Button>
        <Button type="submit" form="newProjectTaskForm" onClick={onSubmit} color="primary" variant="contained">
          {id ? "수정" : "추가"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProjectTaskModal;