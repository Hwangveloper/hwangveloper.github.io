import React, { useEffect, useState } from "react";
import { Typography, IconButton, Box, Paper } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import SelectInputField from "../../../common/_components/fields/SelectInputField";
import { IWowKeystoneDungeonRequestFields } from "../_constants/wowKeystone";
import { useShallow } from "zustand/shallow";
import useWowStore from "../_stores/useWowStore";
import { ECommonText, ECommonYN } from "../../../common/_constants/common";
import { useForm } from "react-hook-form";
import { IWowKeystoneDungeonRequest } from "../_apis/_models/wowKeystone";
import KeystoneDungeonTable from "./KeystoneDungeonTable";

interface DungeonListViewProps {
  refetch: () => void;
}

const DungeonListView: React.FC<DungeonListViewProps> = ({ refetch }) => {

  const defaultValues = {
    charId: ECommonText.ALL,
  };

  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IWowKeystoneDungeonRequest>({
    defaultValues, 
  });

  const { characterList } = useWowStore(
    useShallow((state) => ({
      characterList: state.characterList,
    }))
  );

  const [charOptions, setCharOptions] = useState<{ label: string, value: string }[]>([{ label: "전체", value: ECommonText.ALL}]);

  const handleRefresh = () => {
    refetch();
  }

  const charId = watch(IWowKeystoneDungeonRequestFields.charId);

  useEffect(() => {
    if (characterList) {
      setCharOptions([
        { label: "전체", value: ECommonText.ALL },
        ...characterList.filter((char) => char.isMain === ECommonYN.Y).map((char) => ({
          label: char.name,
          value: char.id,
        })),
      ]);
    }
  }, [characterList]);

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
        캐릭별 기록
      </Typography>
      <SelectInputField
        label="캐릭터 선택"
        name={IWowKeystoneDungeonRequestFields.charId}
        options={charOptions}
        control={control}
        defaultValue={charId}
        error={!!errors.charId}
        helperText={errors.charId?.message}
        onChange={(value) => setValue(IWowKeystoneDungeonRequestFields.charId, value)}
      />
      <KeystoneDungeonTable charId={charId}/>
    </Paper>
  );
};

export default DungeonListView;
