import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useShallow } from "zustand/shallow";
import useLoader from "../../../common/_stores/useLoader";
import DungeonListView from "./DungeonListView";
import CharacterListView from "./CharacterListView";
import useWowKeystoneQuery from "../_apis/_queries/useWowKeystoneQuery";
import useWowKeystoneStore from "../_stores/useWowKeystoneStore";
import useWowStore from "../_stores/useWowStore";
import AddKeystoneResult from "./AddKeystoneResult";
import WeeklyKeystoneTable from "./WeeklyKeystoneTable";
import useWowKeystoneInitQuery from "../_apis/_queries/useWowKeystoneInitQuery";
import useWowKeystoneRefreshMutation from "../_apis/_mutations/useWowKeystoneRefreshMutation";

const WowKeystoneTabContent: React.FC = () => {

  const { masterList, characterList, dungeonList } = useWowStore(
    useShallow((state) => ({
      masterList: state.masterList,
      characterList: state.characterList,
      dungeonList: state.dungeonList,
    }))
  );

  const { isInit } = useWowKeystoneStore(
    useShallow((state) => ({
      isInit: state.isInit,
    }))
  );

  const { data: initData, isFetched: isInitFetched } = useWowKeystoneInitQuery((masterList.length > 0 && characterList.length > 0 && dungeonList.length > 0 && !isInit) ? { masterList } : undefined);
  const { data, isFetched, isFetching, refetch } = useWowKeystoneQuery(isInit ? { masterList, characterList, dungeonList } : undefined);

  const { mutateAsync: refreshKeystone } = useWowKeystoneRefreshMutation();

  useEffect(() => {
    if (initData && isInitFetched) {
      if (initData.length > 0) {
        refreshKeystone(
          {
            list: initData,
          },
          {
            onSuccess: (res) => {
              useWowKeystoneStore.setState({ isInit: true });
            }
          }
        );
      } else {
        useWowKeystoneStore.setState({ isInit: true });
      }
    }
  }, [initData, isInitFetched, refreshKeystone]);

  useEffect(() => {
    if (data && isFetched && !isFetching) {
      useWowKeystoneStore.setState({
        keystoneTaskList: data,
      });
    }
  }, [data, isFetched, isFetching]);

  useEffect(() => {
    useLoader.setState({ isLoading: isFetching });
  }, [isFetching]);

  return (
    <Box display="flex" flexDirection="column">
      <WeeklyKeystoneTable refetch={refetch} />
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        <Box display="flex" flexDirection="column">
          <AddKeystoneResult refetch={refetch} />
          <DungeonListView refetch={refetch} />
        </Box>
        <Box>
          <CharacterListView refetch={refetch} />
        </Box>
      </Box>
    </Box>
  );
};

export default WowKeystoneTabContent;
