import React, { useEffect, useState } from "react";
import { Typography, IconButton, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Collapse } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useShallow } from "zustand/shallow";
import useWowStore from "../../_stores/useWowStore";
import { ECommonYN } from "../../../../common/_constants/common";
import { IWowKeystoneRecordView } from "../_apis/_models/wowKeystone";
import { styled } from "styled-components";
import useWowKeystoneStore from "../_stores/useWowKeystoneStore";
import KeystoneRecordTableRow from "./_table/KeystoneRecordTableRow";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface KeystoneRecordTableProps {
  refetch: () => void;
}

const KeystoneRecordTable: React.FC<KeystoneRecordTableProps> = ({ refetch }) => {

  const { masterList, dungeonList, characterList } = useWowStore(
    useShallow((state) => ({
      masterList: state.masterList,
      dungeonList: state.dungeonList,
      characterList: state.characterList,
    }))
  );

  const { keystoneTaskList, keystoneRecordList } = useWowKeystoneStore(
    useShallow((state) => ({
      keystoneTaskList: state.keystoneTaskList,
      keystoneRecordList: state.keystoneRecordList,
    }))
  );

  const [open, setOpen] = useState(false);
  const [keystoneRecordMap, setKeystoneRecordMap] = useState<Map<string, IWowKeystoneRecordView>>(new Map<string, IWowKeystoneRecordView>());

  const handleRefresh = () => {
    refetch();
  }

  const togglePaper = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
      if (keystoneRecordList && characterList && dungeonList && masterList) {
        const recordMap = new Map<string, IWowKeystoneRecordView>();
        characterList.filter((char) => char.isMain === ECommonYN.Y).forEach((char) => {
          const charRecordList = keystoneRecordList.find((keystone) => keystone.charName === char.name);
          const scoreData = keystoneRecordList.find((keystone) => keystone.charId === char.id);
          const scoreMaster = masterList.find((master) => master.id === "WOW2");
          const completeMaster = masterList.find((master) => master.id === "WOW3");
          recordMap.set(char.id, {
            charId: char.id,
            charName: char.name,
            server: char.server,
            keystoneScore: scoreData?.mythicRating ?? 0,
            scoreFirstStep: scoreMaster?.firstStep ?? 0,
            scoreLastStep: scoreMaster?.lastStep ?? 0,
            dungeonRecords: dungeonList.map((dungeon) => ({
              dungeonId: dungeon.id,
              completeLevel: charRecordList?.seasonRecords.find((record) => record.dungeonId === dungeon.id)?.completeLevel ?? 0,
              clearLevel: charRecordList?.seasonRecords.find((record) => record.dungeonId === dungeon.id)?.clearLevel ?? 0,
              levelFirstStep: completeMaster?.firstStep ?? 0,
              levelLastStep: completeMaster?.lastStep ?? 0,
              isFavorite: keystoneTaskList.find((keystone) => keystone.masterId === "WOW5" && keystone.charId === char.id && keystone.dungeonId === dungeon.id)?.value === 1 ? true : false,
            })),
          });
        });
        setKeystoneRecordMap(recordMap);
      }
    }, [keystoneRecordList, keystoneTaskList, characterList, dungeonList, masterList]);

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
        <IconButton 
          color="primary" 
          onClick={togglePaper} 
          aria-label="expand"
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Typography variant="h6" align="center" gutterBottom>
          쐐기 기록
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow key={dungeonList.length}>
                <HeaderTableCell key={"head"}></HeaderTableCell>
                {dungeonList.map((dungeon) => (
                  <HeaderTableCell key={dungeon.id}>{dungeon.name}</HeaderTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {characterList.filter((char) => char.isMain === ECommonYN.Y).map((char) => (
                <KeystoneRecordTableRow row={keystoneRecordMap.get(char.id)} refetch={refetch}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Paper>
  );
};

export default KeystoneRecordTable;
