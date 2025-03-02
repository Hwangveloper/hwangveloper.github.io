import React, { useEffect, useState } from "react";
import { Typography, IconButton, Box, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useShallow } from "zustand/shallow";
import useWowStore from "../_stores/useWowStore";
import styled from "styled-components";
import useWowKeystoneStore from "../_stores/useWowKeystoneStore";
import { IWowKeystone } from "../_apis/_models/wowKeystone";
import { ECommonYN } from "../../../common/_constants/common";

const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface WeeklyKeystoneTableProps {
  refetch: () => void;
}

const WeeklyKeystoneTable: React.FC<WeeklyKeystoneTableProps> = ({ refetch }) => {

  const { characterList } = useWowStore(
    useShallow((state) => ({
      characterList: state.characterList,
    }))
  );

  const { keystoneTaskList } = useWowKeystoneStore(
    useShallow((state) => ({
      keystoneTaskList: state.keystoneTaskList,
    }))
  );

  const [weeklyClears, setWeeklyClears] = useState<IWowKeystone[]>([]);
  const [weeklyLevels, setWeeklyLevels] = useState<IWowKeystone[]>([]);

  const handleRefresh = () => {
    refetch();
  }

  const getRenderColor = (value: number, firstStep: number, lastStep: number) => {
    if (value < firstStep) {
      return "red";
    } else if (value < lastStep) {
      return "blue";
    } else {
      return "black";
    }
  }

  useEffect(() => {
    if (keystoneTaskList && characterList) {
      setWeeklyClears(keystoneTaskList.filter((keystone) => keystone.masterId === "WOW0"));
      setWeeklyLevels(keystoneTaskList.filter((keystone) => keystone.masterId === "WOW1"));
    }
  }, [keystoneTaskList, characterList]);

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
      </Box>
      <Typography variant="h5" align="center" gutterBottom>
        주간 쐐기 주차
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderTableCell key={"head"}></HeaderTableCell>
              {characterList.filter((char) => char.isMain === ECommonYN.Y).map((char) => (
                <HeaderTableCell key={char.id}>{char.name}</HeaderTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="WOW0">
              <TableCell key={"-"}>{"횟수"}</TableCell>
              {weeklyClears.map((clear) => (
                <TableCell key={clear.charId} sx={{textAlign: "center", color: getRenderColor(clear.value, clear.firstStep ?? 0, clear.lastStep ?? 0)}}>{clear.value}</TableCell>
              ))}
            </TableRow>
            <TableRow key="WOW1">
              <TableCell key={"-"}>{"단수"}</TableCell>
              {weeklyLevels.map((level) => (
                <TableCell key={level.charId} sx={{textAlign: "center", color: getRenderColor(level.value, level.firstStep ?? 0, level.lastStep ?? 0)}}>{level.value}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default WeeklyKeystoneTable;
