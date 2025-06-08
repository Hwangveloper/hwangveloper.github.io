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

  const { dungeonList, characterList } = useWowStore(
    useShallow((state) => ({
      dungeonList: state.dungeonList,
      characterList: state.characterList,
    }))
  );

  const { keystoneTaskList } = useWowKeystoneStore(
    useShallow((state) => ({
      keystoneTaskList: state.keystoneTaskList,
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
      if (keystoneTaskList && characterList && dungeonList) {
        const recordMap = new Map<string, IWowKeystoneRecordView>();
        characterList.filter((char) => char.isMain === ECommonYN.Y).forEach((char) => {
          const scoreData = keystoneTaskList.find((keystone) => keystone.masterId === "WOW2" && keystone.charId === char.id);
          recordMap.set(char.id, {
            charId: char.id,
            charName: char.name,
            server: char.server,
            keystoneScore: scoreData?.value ?? 0,
            scoreFirstStep: scoreData?.firstStep ?? 0,
            scoreLastStep: scoreData?.lastStep ?? 0,
            dungeonRecords: dungeonList.map((dungeon) => ({
              dungeonId: dungeon.id,
              completeLevel: keystoneTaskList.find((keystone) => keystone.masterId === "WOW3" && keystone.charId === char.id && keystone.dungeonId === dungeon.id)?.value ?? 0,
              clearLevel: keystoneTaskList.find((keystone) => keystone.masterId === "WOW4" && keystone.charId === char.id && keystone.dungeonId === dungeon.id)?.value ?? 0,
              levelFirstStep: keystoneTaskList.find((keystone) => keystone.masterId === "WOW3" && keystone.charId === char.id && keystone.dungeonId === dungeon.id)?.firstStep ?? 0,
              levelLastStep: keystoneTaskList.find((keystone) => keystone.masterId === "WOW3" && keystone.charId === char.id && keystone.dungeonId === dungeon.id)?.lastStep ?? 0,
              isFavorite: keystoneTaskList.find((keystone) => keystone.masterId === "WOW5" && keystone.charId === char.id && keystone.dungeonId === dungeon.id)?.value === 1 ? true : false,
            })),
          });
        });
        setKeystoneRecordMap(recordMap);
      }
    }, [keystoneTaskList, characterList, dungeonList]);

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
