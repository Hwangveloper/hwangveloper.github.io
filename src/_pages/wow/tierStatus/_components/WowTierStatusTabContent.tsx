import React, { useEffect } from "react";
import { Typography, IconButton, Box, Paper } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import WowTierTransmogTable from "./WowTierTransmogTable";
import useWowCharTierTransmogQuery from "../_apis/_queries/useWowCharTierTransmogQuery";
import useGoogleApiStore from "../../../../common/_stores/useGoogleApiStore";
import { useShallow } from "zustand/shallow";
import useWowStore from "../../_stores/useWowStore";
import useWowTierTransmogStore from "../_stores/useWowTierTransmogStore";
import UpdateCharTierTransmogModal from "./UpdateCharTierTransmogModal";

interface WowTierStatusTabContentProps {
}

const WowTierStatusTabContent: React.FC<WowTierStatusTabContentProps> = () => {

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

  const { data: charTierData, isFetched: isCharTierFetched, isFetching: isCharTierFetching, refetch: refetchCharTierTransmog } = useWowCharTierTransmogQuery(authStatus ? { characterList } : undefined);

  useEffect(() => {
    if (charTierData && isCharTierFetched && !isCharTierFetching) {
      useWowTierTransmogStore.setState({
        charTierTransmogList: charTierData,
      });
    }
  }, [charTierData, isCharTierFetched, isCharTierFetching]);

  const handleRefresh = () => {
    refetchCharTierTransmog();
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
        티어룩 현황
      </Typography>
      <WowTierTransmogTable refetch={refetchCharTierTransmog} />
      <UpdateCharTierTransmogModal />
    </Paper>
  );
};

export default WowTierStatusTabContent;
