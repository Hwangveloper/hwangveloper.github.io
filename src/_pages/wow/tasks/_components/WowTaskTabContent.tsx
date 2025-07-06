import React, { useEffect } from "react";
import { Typography, IconButton, Box, Paper } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useShallow } from "zustand/shallow";
import useWowAchievementQuery from "../_apis/_queries/useWowAchievementQuery";
import useBattleNetApiStore from "../../../../common/_stores/useBattleNetApiStore";
import useWowTaskStore from "../stores/useWowTaskStore";
import WowTaskTable from "./WowTaskTable";
import AddWowTask from "./AddWowTask";
import useWowTaskQuery from "../_apis/_queries/useWowTaskQuery";
import useLoader from "../../../../common/_stores/useLoader";

interface WowTaskTabContentProps {
}

const WowTaskTabContent: React.FC<WowTaskTabContentProps> = () => {

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  const { data: achievements, isFetched: isAchievementsFetched, isFetching: isAchievementsFetching, refetch: refetchAchievements } = useWowAchievementQuery(accessToken, {
    realm: "azshara",
    charName: "기분탓이죠",
  });
  const { data: wowTasks, isFetched, isFetching, refetch: refetchTasks } = useWowTaskQuery({ignoreDelete: true});

  useEffect(() => {
    if (achievements && isAchievementsFetched && !isAchievementsFetching) {
      useWowTaskStore.setState({
        achievementList: achievements,
      });
    }
  }, [achievements, isAchievementsFetched, isAchievementsFetching]);

  useEffect(() => {
    if (wowTasks && isFetched && !isFetching) {
      useWowTaskStore.setState({
        taskList: wowTasks
      });
    }
  }, [wowTasks, isFetched, isFetching]);

  useEffect(() => {
    useLoader.setState({ isLoading: isFetching });
  }, [isFetching]);

  const handleRefresh = () => {
    refetchAchievements();
    refetchTasks();
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
      <AddWowTask refetch={refetchTasks} />
      <Typography variant="h4" align="center" gutterBottom>
        와우 할 일 리스트
      </Typography>
      <WowTaskTable />
    </Paper>
  );
};

export default WowTaskTabContent;
