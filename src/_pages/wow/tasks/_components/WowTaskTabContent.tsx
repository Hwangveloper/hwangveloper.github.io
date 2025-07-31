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
import useWowTaskDeleteMutation from "../_apis/_mutations/useWowTaskDeleteMutation";
import { IWowTask } from "../_apis/_models/wowTask";
import useWowMountQuery from "../_apis/_queries/useWowMountQuery";
import useWowPetQuery from "../_apis/_queries/useWowPetQuery";
import useWowToyQuery from "../_apis/_queries/useWowToyQuery";
import useWowStore from "../../_stores/useWowStore";

interface WowTaskTabContentProps {
}

const WowTaskTabContent: React.FC<WowTaskTabContentProps> = () => {

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  const { characterList } = useWowStore(
    useShallow((state) => ({
      characterList: state.characterList,
    }))
  );

  const { data: achievements, isFetched: isAchievementsFetched, isFetching: isAchievementsFetching } = useWowAchievementQuery(accessToken, {
    realm: "azshara",
    charName: "기분탓이죠",
  });
  const { data: mounts, isFetched: isMountsFetched, isFetching: isMountsFetching } = useWowMountQuery(accessToken);
  const { data: pets, isFetched: isPetsFetched, isFetching: isPetsFetching } = useWowPetQuery(accessToken);
  const { data: toys, isFetched: isToysFetched, isFetching: isToysFetching } = useWowToyQuery(accessToken);
  const { data: wowTasks, isFetched, isFetching, refetch: refetchTasks } = useWowTaskQuery({ignoreDelete: true, characterList});
  const { mutateAsync: deleteTask } = useWowTaskDeleteMutation();

  useEffect(() => {
    if (achievements && isAchievementsFetched && !isAchievementsFetching) {
      useWowTaskStore.setState({
        achievementList: achievements,
      });
    }
  }, [achievements, isAchievementsFetched, isAchievementsFetching]);

  useEffect(() => {
    if (mounts && isMountsFetched && !isMountsFetching) {
      useWowTaskStore.setState({
        mountList: mounts,
      });
    }
  }, [mounts, isMountsFetched, isMountsFetching]);

  useEffect(() => {
    if (pets && isPetsFetched && !isPetsFetching) {
      useWowTaskStore.setState({
        petList: pets,
      });
    }
  }, [pets, isPetsFetched, isPetsFetching]);

  useEffect(() => {
    if (toys && isToysFetched && !isToysFetching) {
      useWowTaskStore.setState({
        toyList: toys,
      });
    }
  }, [toys, isToysFetched, isToysFetching]);

  useEffect(() => {
    if (wowTasks && isFetched && !isFetching) {
      useWowTaskStore.setState({
        taskList: wowTasks
      });
    }
  }, [wowTasks, isFetched, isFetching]);

  useEffect(() => {
    useLoader.setState({ isLoading: isFetching || isAchievementsFetching || isMountsFetching || isPetsFetching || isToysFetching });
  }, [isFetching, isAchievementsFetching, isMountsFetching, isPetsFetching, isToysFetching]);

  const handleRefresh = () => {
    refetchTasks();
  }

  const deleteItem = (task?: IWowTask) => {
    deleteTask(
      {
        deleteItem: task,
      },
      {
        onSuccess: (res) => {
          refetchTasks();
        }
      }
    )
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
      <WowTaskTable onDelete={(task) => deleteItem(task)} refetch={refetchTasks} />
    </Paper>
  );
};

export default WowTaskTabContent;
