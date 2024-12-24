import React from "react";
import { Typography, IconButton, Box, Paper } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import WowCharacterTable from "./WowCharacterTable";

interface WowCharacterTabContentProps {
  refetch: () => void;
}

const WowCharacterTabContent: React.FC<WowCharacterTabContentProps> = ({ refetch }) => {

  const handleRefresh = () => {
    refetch();
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
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        캐릭터 목록
      </Typography>
      <WowCharacterTable />
    </Paper>
  );
};

export default WowCharacterTabContent;
