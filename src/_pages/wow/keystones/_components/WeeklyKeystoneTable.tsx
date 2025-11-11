import React, { useEffect, useState } from "react";
import { Typography, IconButton, Box, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useShallow } from "zustand/shallow";
import useWowStore from "../../_stores/useWowStore";
import styled from "styled-components";
import useWowKeystoneStore from "../_stores/useWowKeystoneStore";
import { IWowCharacterMythicRun, IWowKeystone } from "../_apis/_models/wowKeystone";
import { ECommonYN } from "../../../../common/_constants/common";
import WeeklyKeystoneHeaderTableCell from "./_table/WeeklyKeystoneHeaderTableCell";
import { generateQueryKey } from "../_apis/_queries/useWowMythicDungeonRecordQuery";
import { useQueryClient } from "@tanstack/react-query";
import { CURR_SEASON_NO } from "../_constants/wowKeystone";

const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

const WeeklyKeystoneTable: React.FC = () => {

  const queryClient = useQueryClient();

  const { characterList, dungeonList } = useWowStore(
    useShallow((state) => ({
      characterList: state.characterList,
      dungeonList: state.dungeonList,
    }))
  );

  const { keystoneTaskList, keystoneRecordList } = useWowKeystoneStore(
    useShallow((state) => ({
      keystoneTaskList: state.keystoneTaskList,
      keystoneRecordList: state.keystoneRecordList,
    }))
  );

  const [weeklyClear, setWeeklyClear] = useState<IWowKeystone>();
  const [weeklyLevel, setWeeklyLevel] = useState<IWowKeystone>();

  const handleRefresh = () => {
    characterList.forEach((char) => {
      queryClient.invalidateQueries({
        queryKey: generateQueryKey({
          realm: char?.server ?? '',
          charName: char?.name ?? '',
          charJob: char?.job ?? '',
          seasonNo: CURR_SEASON_NO,
          dungeonList,
        }),
      });
    });
  }

  const getRenderColor = (value: number | string, firstStep: number, lastStep: number) => {
    if (typeof value === 'number') {
      if (value < firstStep) {
        return "red";
      } else if (value < lastStep) {
        return "blue";
      } else {
        return "black";
      }
    } else if (typeof value === 'string') {
      const values = value.replaceAll("+", ".5");
      const numValue = Number(values.indexOf('/') > 0 ? values.substring(0, values.indexOf('/') - 1) : values);
      if (numValue < Number(firstStep) + 0.5) {
        return "red";
      } else if (numValue < Number(lastStep) + 0.5) {
        return "blue";
      } else {
        return "black";
      }
    }
  }

  useEffect(() => {
    if (keystoneTaskList && characterList) {
      setWeeklyClear(keystoneTaskList.find((keystone) => keystone.masterId === "WOW0"));
      setWeeklyLevel(keystoneTaskList.find((keystone) => keystone.masterId === "WOW1"));
    }
  }, [keystoneTaskList, characterList]);

  const getRecordLevels = (runs: IWowCharacterMythicRun[]) => {

    const sortedRuns = runs.sort((left, right) => (right.level - (right.isClear ? 0.5 : 0)) - (left.level - (left.isClear ? 0.5 : 0)));
    let result = '';
    if (runs.length === 0) {
      return '-';
    }
    if (runs.length >= 1) {
      result += `${sortedRuns[0].level}${sortedRuns[0].isClear ? "+" : ""}`;
    }
    if (runs.length >= 4) {
      result += `/${sortedRuns[3].level}${sortedRuns[3].isClear ? "+" : ""}`;
    }
    if (runs.length >= 8) {
      result += `/${sortedRuns[7].level}${sortedRuns[7].isClear ? "+" : ""}`;
    }
    return result;
  }

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
                <WeeklyKeystoneHeaderTableCell key={char.id} char={char} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="WOW0">
              <TableCell key={"title"}>{"횟수"}</TableCell>
              {characterList.filter((char) => char.isMain === ECommonYN.Y).map((char) => {
                const record = keystoneRecordList.find((rec) => rec.charName === char.name);
                return (
                  <TableCell key={record?.charName} sx={{textAlign: "center", color: getRenderColor(record?.currRuns.length ?? 0, weeklyClear?.firstStep ?? 0, weeklyClear?.lastStep ?? 0)}}>{record?.currRuns.length}</TableCell>
                );
              })}
            </TableRow>
            <TableRow key="WOW1">
              <TableCell key={"title"}>{"단수"}</TableCell>
              {characterList.filter((char) => char.isMain === ECommonYN.Y).map((char) => {
                const record = keystoneRecordList.find((rec) => rec.charName === char.name);
                const recordLevels = getRecordLevels(record?.currRuns ?? []);
                return (
                  <TableCell key={record?.charName} sx={{textAlign: "center", color: getRenderColor(recordLevels, weeklyLevel?.firstStep ?? 0, weeklyLevel?.lastStep ?? 0)}}>{recordLevels}</TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default WeeklyKeystoneTable;
