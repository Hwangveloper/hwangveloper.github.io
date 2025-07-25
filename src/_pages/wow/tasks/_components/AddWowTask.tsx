import React, { useEffect, useState } from "react";
import { Typography, Paper, Button, Box } from "@mui/material";
import SelectInputField from "../../../../common/_components/fields/SelectInputField";
import { useShallow } from "zustand/shallow";
import useWowStore from "../../_stores/useWowStore";
import { ECommonYN } from "../../../../common/_constants/common";
import { useForm } from "react-hook-form";
import useSimpleDialog from "../../../../common/_stores/useSimpleDialog";
import useLoader from "../../../../common/_stores/useLoader";
import { ICommonOption } from "../../../../common/_models/common";
import { EWowTaskCategory, IWowTaskSaveRequestFields, taskCategoryOptions } from "../_constants/wowTask";
import { IWowTaskSaveRequest } from "../_apis/_models/wowTask";
import useWowTaskCreateMutation from "../_apis/_mutations/useWowTaskCreateMutation";
import useWowTaskStore from "../stores/useWowTaskStore";
import { WOW_TASK_SHEET_DEFAULT_ID } from "../../../../common/_constants/sheets";
import TextInputField from "../../../../common/_components/fields/TextInputField";

interface AddWowTaskProps {
  refetch: () => void;
}

const AddWowTask: React.FC<AddWowTaskProps> = ({ refetch }) => {

  const defaultValues = {
    rowIndex: undefined,
    id: undefined,
    charId: '',
    category: EWowTaskCategory.ACHIEVEMENT,
    frequency: '',
    type: '',
    idOrName: '',
    description: '',
    reference: '',
  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IWowTaskSaveRequest>({
    defaultValues, 
  });

  const { characterList } = useWowStore(
    useShallow((state) => ({
      characterList: state.characterList,
    }))
  );

  const { taskList } = useWowTaskStore(
    useShallow((state) => ({
      taskList: state.taskList,
    }))
  );

  const { mutateAsync: createTask } = useWowTaskCreateMutation();

  const { charId, category, idOrName, reference, description } = getValues();

  const [charOptions, setCharOptions] = useState<ICommonOption[]>([]);

  const onSubmit = () => {
    useLoader.setState({ isLoading: true });
    const rowIndex = taskList.sort((a, b) => a.rowIndex - b.rowIndex).reduce((prev, curr) => {
      if (prev === curr.rowIndex) {
        return curr.rowIndex + 1;
      } else {
        return prev;
      }
    }, 0);
    createTask(
      {
        item: {
          ...getValues(),
          rowIndex,
          id: `${WOW_TASK_SHEET_DEFAULT_ID}${rowIndex}`,
        },
      },
      {
        onSuccess: (res) => {
          useSimpleDialog.setState({
            isOpen: true,
            message: "저장했습니다.",
            onClose: () => refetch(),
          });
        }
      }
    );
  }

  const onChangeCharacter = (charId: string) => {
    setValue(IWowTaskSaveRequestFields.charId, charId);
  }

  useEffect(() => {
    if (characterList && characterList.length > 0) {
      setValue(IWowTaskSaveRequestFields.charId, characterList[0]?.id ?? '');
      setCharOptions(characterList.filter((char) => char.isMain === ECommonYN.Y).map((char) => ({
        label: char.name,
        value: char.id,
      })));
    }
  }, [characterList, setValue]);

  return (
    <Paper
      elevation={3}
      style={{
        minWidth: 600,
        margin: "20px",
        padding: 16,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        결과 기록
      </Typography>
      <form name="newWowTask" onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="row" gap="12px">
          <SelectInputField
            label="캐릭터"
            name={IWowTaskSaveRequestFields.charId}
            options={charOptions}
            control={control}
            defaultValue={charId}
            error={!!errors.charId}
            helperText={errors.charId?.message}
            onChange={(value) => onChangeCharacter(value)}
          />
          <SelectInputField
            label="카테고리"
            name={IWowTaskSaveRequestFields.category}
            options={taskCategoryOptions}
            control={control}
            defaultValue={category}
            error={!!errors.category}
            helperText={errors.category?.message}
            onChange={(value) => setValue(IWowTaskSaveRequestFields.category, value)}
          />
        </Box>
        <Box display="flex" flexDirection="row" gap="12px">
          <TextInputField
            label="블리자드ID / 펫이름 / 장난감이름"
            name={IWowTaskSaveRequestFields.idOrName}
            control={control}
            defaultValue={idOrName}
            minLength={1}
            error={!!errors.idOrName}
            helperText={errors.idOrName?.message}
            onChange={(value) => setValue(IWowTaskSaveRequestFields.idOrName, value)}
          />
          <TextInputField
            label="참고 링크"
            name={IWowTaskSaveRequestFields.reference}
            control={control}
            defaultValue={reference}
            minLength={1}
            error={!!errors.reference}
            helperText={errors.reference?.message}
            onChange={(value) => setValue(IWowTaskSaveRequestFields.reference, value)}
          />
          
        </Box>
        <Box display="flex" flexDirection="row" gap="12px">
          <TextInputField
            label="추가 설명"
            name={IWowTaskSaveRequestFields.description}
            control={control}
            defaultValue={description}
            minLength={1}
            error={!!errors.description}
            helperText={errors.description?.message}
            onChange={(value) => setValue(IWowTaskSaveRequestFields.description, value)}
          />
          <Button type="submit" form="newWowTask" onClick={onSubmit} color="primary" variant="contained" sx={{width: '100px', margin: '12px 0'}}>
            저장
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddWowTask;
