import React, { useEffect } from "react";
import { Typography, IconButton, Box, Paper } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import WowCharacterItemTable from "./WowCharacterItemTable";
import useWowCharItemQuery from "../_apis/_queries/useWowCharItemQuery";
import useGoogleApiStore from "../../../../common/_stores/useGoogleApiStore";
import { useShallow } from "zustand/shallow";
import useWowStore from "../../_stores/useWowStore";
import useWowCharItemStore from "../_stores/useWowCharItemStore";
import UpdateCharItemModal from "./UpdateCharItemModal";
import UpdateCharWeaponModal from "./UpdateCharWeaponModal";

interface WowCharacterItemTabContentProps {
}

const WowCharacterItemTabContent: React.FC<WowCharacterItemTabContentProps> = () => {

  const { authStatus } = useGoogleApiStore(
    useShallow((state) => ({
      authStatus: state.authStatus,
    }))
  );

  const { characterList } = useWowStore(
    useShallow((state) => ({
      characterList: state.characterList,
    }))
  );

  const { data: charItemData, isFetched: isCharItemFetched, isFetching: isCharItemFetching, refetch: refetchCharItem } = useWowCharItemQuery(authStatus ? { characterList } : undefined);

  useEffect(() => {
    if (charItemData && isCharItemFetched && !isCharItemFetching) {
      useWowCharItemStore.setState({
        charItemList: charItemData,
      });
    }
  }, [charItemData, isCharItemFetched, isCharItemFetching]);

  const handleRefresh = () => {
    refetchCharItem();
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
        캐릭터 아이템 목록
      </Typography>
      <WowCharacterItemTable refetch={refetchCharItem} />
      <UpdateCharItemModal />
      <UpdateCharWeaponModal />
    </Paper>
  );
};

export default WowCharacterItemTabContent;
