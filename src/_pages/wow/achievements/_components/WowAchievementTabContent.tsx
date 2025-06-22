import React, { useEffect } from "react";
import { Typography, IconButton, Box, Paper } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useShallow } from "zustand/shallow";
import useWowAchievementQuery from "../_apis/_queries/useWowAchievementQuery";
import useBattleNetApiStore from "../../../../common/_stores/useBattleNetApiStore";
import useWowAchievementStore from "../stores/useWowAchievementStore";
import WowAchievementTable from "./WowAchievementTable";

interface WowAchievementTabContentProps {
}

const WowAchievementTabContent: React.FC<WowAchievementTabContentProps> = () => {

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  const { data: achievements, isFetched: isAchievementsFetched, isFetching: isAchievementsFetching, refetch: refetchAchievements } = useWowAchievementQuery(accessToken, {
    realm: "azshara",
    charName: "기분탓이죠",
  });

  useEffect(() => {
    if (achievements && isAchievementsFetched && !isAchievementsFetching) {
      useWowAchievementStore.setState({
        achievementList: achievements,
      });
    }
  }, [achievements, isAchievementsFetched, isAchievementsFetching]);

  const handleRefresh = () => {
    refetchAchievements();
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
        업적 리스트
      </Typography>
      <WowAchievementTable refetch={refetchAchievements} />
    </Paper>
  );
};

export default WowAchievementTabContent;
