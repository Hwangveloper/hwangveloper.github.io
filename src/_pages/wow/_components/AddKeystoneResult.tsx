import React, { useEffect, useState } from "react";
import { Typography, Paper, Button, Box } from "@mui/material";
import SelectInputField from "../../../common/_components/fields/SelectInputField";
import { IWowKeystoneSaveRequestFields } from "../_constants/wowKeystone";
import { useShallow } from "zustand/shallow";
import useWowStore from "../_stores/useWowStore";
import { ECommonYN } from "../../../common/_constants/common";
import { useForm } from "react-hook-form";
import { IWowKeystoneSaveRequest } from "../_apis/_models/wowKeystone";
import NumberInputField from "../../../common/_components/fields/NumberInputField";
import CheckboxInputField from "../../../common/_components/fields/CheckboxInputField";
import useWowKeystoneUpdateMutation from "../_apis/_mutations/useWowKeystoneUpdateMutation";
import useWowKeystoneStore from "../_stores/useWowKeystoneStore";
import useSimpleDialog from "../../../common/_stores/useSimpleDialog";
import useLoader from "../../../common/_stores/useLoader";
import { ICommonOption } from "../../../common/_models/common";

interface AddKeystoneResultProps {
  refetch: () => void;
}

const AddKeystoneResult: React.FC<AddKeystoneResultProps> = ({ refetch }) => {

  const defaultValues = {
    charId: '',
    dungeonId: '',
    level: 0,
    score: 0,
    clearYn: ECommonYN.Y,
  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IWowKeystoneSaveRequest>({
    defaultValues, 
  });

  const { characterList, dungeonList } = useWowStore(
    useShallow((state) => ({
      characterList: state.characterList,
      dungeonList: state.dungeonList,
    }))
  );

  const { mutateAsync: updateKeystone } = useWowKeystoneUpdateMutation();

  const { charId, dungeonId, level, score, clearYn } = getValues();

  const [charOptions, setCharOptions] = useState<ICommonOption[]>([]);
  const [dungeonOptions, setDungeonOptions] = useState<ICommonOption[]>([]);

  const onSubmit = () => {
    useLoader.setState({ isLoading: true });
    updateKeystone(
      {
        ...getValues(),
        list: useWowKeystoneStore.getState().keystoneTaskList,
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

  useEffect(() => {
      if (dungeonList && dungeonList.length > 0) {
        setValue(IWowKeystoneSaveRequestFields.dungeonId, dungeonList[0]?.id ?? '');
        setDungeonOptions(dungeonList.map((dungeon) => ({
          label: dungeon.name,
          value: dungeon.id,
        })));
      }
    }, [dungeonList, setValue]);

  useEffect(() => {
    if (characterList && characterList.length > 0) {
      setValue(IWowKeystoneSaveRequestFields.charId, characterList[0]?.id ?? '');
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
      <form name="newKeystoneResult" onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="row" gap="12px">
          <SelectInputField
            label="캐릭터"
            name={IWowKeystoneSaveRequestFields.charId}
            options={charOptions}
            control={control}
            defaultValue={charId}
            error={!!errors.charId}
            helperText={errors.charId?.message}
            onChange={(value) => setValue(IWowKeystoneSaveRequestFields.charId, value)}
          />
          <SelectInputField
            label="던전"
            name={IWowKeystoneSaveRequestFields.dungeonId}
            options={dungeonOptions}
            control={control}
            defaultValue={dungeonId}
            error={!!errors.dungeonId}
            helperText={errors.dungeonId?.message}
            onChange={(value) => setValue(IWowKeystoneSaveRequestFields.dungeonId, value)}
          />
        </Box>
        <Box display="flex" flexDirection="row" gap="12px">
          <Box width="60px">
            <NumberInputField
              label="단수"
              name={IWowKeystoneSaveRequestFields.level}
              control={control}
              defaultValue={level}
              minLength={1}
              error={!!errors.level}
              helperText={errors.level?.message}
              onChange={(value) => setValue(IWowKeystoneSaveRequestFields.level, value)}
            />
          </Box>
          <Box flex={1}>
            <NumberInputField
              label="점수"
              name={IWowKeystoneSaveRequestFields.score}
              control={control}
              defaultValue={score}
              minLength={1}
              error={!!errors.score}
              helperText={errors.score?.message}
              onChange={(value) => setValue(IWowKeystoneSaveRequestFields.score, value)}
            />
            </Box>
          <Box flex={1} display="flex" alignItems="center">
            <CheckboxInputField
              label="시클여부"
              name={IWowKeystoneSaveRequestFields.clearYn}
              control={control}
              defaultValue={clearYn === ECommonYN.Y}
              error={!!errors.clearYn}
              helperText={errors.clearYn?.message}
              onChange={(value) => {
                console.log(value);
                setValue(IWowKeystoneSaveRequestFields.clearYn, value ? ECommonYN.Y : ECommonYN.N);
              }}
            />
          </Box>
          <Button type="submit" form="newKeystoneResult" onClick={onSubmit} color="primary" variant="contained" sx={{width: '100px', margin: '12px 0'}}>
            저장
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddKeystoneResult;
