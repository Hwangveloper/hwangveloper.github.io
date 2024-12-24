import React, { useEffect, useState } from "react";
import { Typography, IconButton, Box, Paper } from "@mui/material";
import { useShallow } from "zustand/shallow";
import RefreshIcon from '@mui/icons-material/Refresh';
import { ECommonText } from "../../../common/_constants/common";
import { IWowKeystoneCharacterRequest } from "../_apis/_models/wowKeystone";
import { useForm } from "react-hook-form";
import useWowStore from "../_stores/useWowStore";
import { IWowKeystoneCharacterRequestFields } from "../_constants/wowKeystone";
import SelectInputField from "../../../common/_components/fields/SelectInputField";
import KeystoneCharacterTable from "./KeystoneCharacterTable";


interface CharacterListViewProps {
  refetch: () => void;
}

const CharacterListView: React.FC<CharacterListViewProps> = ({ refetch }) => {

  const defaultValues = {
    dungeonId: ECommonText.ALL,
  };

  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IWowKeystoneCharacterRequest>({
    defaultValues, 
  });

  const { dungeonList } = useWowStore(
    useShallow((state) => ({
      dungeonList: state.dungeonList,
    }))
  );

  const [dungeonOptions, setDungeonOptions] = useState<{ label: string, value: string }[]>([{ label: "전체", value: ECommonText.ALL}]);

  const handleRefresh = () => {
    refetch();
  }

  const dungeonId = watch(IWowKeystoneCharacterRequestFields.dungeonId);

  useEffect(() => {
    if (dungeonList) {
      setDungeonOptions([
        { label: "전체", value: ECommonText.ALL },
        ...dungeonList.map((dungeon) => ({
          label: dungeon.name,
          value: dungeon.id,
        })),
      ]);
    }
  }, [dungeonList]);

  return (
    <Paper
      elevation={3}
      style={{
        minWidth: 600,
        margin: "20px",
        padding: 16,
      }}
    >
      <Box display="flex" flexDirection="row-reverse">
        <IconButton 
          color="primary" 
          onClick={handleRefresh} 
          aria-label="refresh"
        >
          <RefreshIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        던전별 기록
      </Typography>
      <SelectInputField
        label="던전 선택"
        name={IWowKeystoneCharacterRequestFields.dungeonId}
        options={dungeonOptions}
        control={control}
        defaultValue={dungeonId}
        error={!!errors.dungeonId}
        helperText={errors.dungeonId?.message}
        onChange={(value) => setValue(IWowKeystoneCharacterRequestFields.dungeonId, value)}
      />
      <KeystoneCharacterTable dungeonId={dungeonId}/>
    </Paper>
  );
};

export default CharacterListView;
