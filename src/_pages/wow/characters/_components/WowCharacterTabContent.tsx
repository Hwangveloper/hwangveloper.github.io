import React from "react";
import { Typography, IconButton, Box, Paper } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import WowCharacterTable from "./WowCharacterTable";
import useWowStore from "../../_stores/useWowStore";
import { useShallow } from "zustand/shallow";
import useWowCharacterMemoUpdateMutation from "../_apis/_mutations/useWowCharacterMemoUpdateMutation";

interface WowCharacterTabContentProps {
  refetch: () => void;
}

const WowCharacterTabContent: React.FC<WowCharacterTabContentProps> = ({ refetch }) => {

  const { characterList } = useWowStore(
    useShallow((state) => ({
      characterList: state.characterList,
    }))
  );

  const { mutateAsync: updateCharacterMemo } = useWowCharacterMemoUpdateMutation();

  const handleRefresh = () => {
    refetch();
  }

  const handleSave = () => {
    updateCharacterMemo(
      {
        list: characterList.filter((char) => !!char.modifiedMemo).map((char) => ({
          rowIndex: char.rowIndex,
          memo: char.modifiedMemo ?? '',
        })),
      },
      {
        onSuccess: (res) => {
          refetch();
        }
      }
    );
  }

  return (
    <Paper
      elevation={3}
      style={{
        minWidth: 500,
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
        {characterList.reduce((prev, curr) => !!curr.modifiedMemo || prev, false) ? (
          <IconButton 
            color="primary" 
            onClick={handleSave} 
            aria-label="save"
          >
            <SaveIcon />
          </IconButton>
        ) : <></>}
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        캐릭터 목록
      </Typography>
      <WowCharacterTable refetch={refetch} />
    </Paper>
  );
};

export default WowCharacterTabContent;
