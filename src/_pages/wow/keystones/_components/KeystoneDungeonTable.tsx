import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import styled from "styled-components";
import useWowKeystoneStore from "../_stores/useWowKeystoneStore";
import { useShallow } from "zustand/shallow";
import { ECommonText } from "../../../../common/_constants/common";
import { IWowKeystoneDungeonView } from "../_apis/_models/wowKeystone";
import useWowStore from "../../_stores/useWowStore";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface KeystoneDungeonTableProps {
  charId: string;
}

const KeystoneDungeonTable: React.FC<KeystoneDungeonTableProps> = ({ charId }) => {

  const { masterList, dungeonList } = useWowStore(
    useShallow((state) => ({
      masterList: state.masterList,
      dungeonList: state.dungeonList,
    }))
  );

  const { keystoneRecordList } = useWowKeystoneStore(
    useShallow((state) => ({
      keystoneRecordList: state.keystoneRecordList,
    }))
  );

  const [keystoneDungeonData, setKeystoneDungeonData] = useState<IWowKeystoneDungeonView[]>([]);

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
    if (keystoneRecordList && keystoneRecordList.length > 0) {
      setKeystoneDungeonData(dungeonList.map((dungeon) => {
        const dungeonRecordList = keystoneRecordList.map((keystone) => ({
          charId: keystone.charId,
          charName: keystone.charName,
          score: keystone.mythicRating,
          records: keystone.seasonRecords.find((record) => record.dungeonId === dungeon.id),
        }));
        const allClearRecordList = dungeonRecordList.filter((record) => charId === ECommonText.ALL || record.charId === charId) ?? [];
        const recordData = allClearRecordList.reduce((prev, curr) => (curr.records?.clearLevel ?? 0) < (prev.records?.clearLevel ?? 0) ? curr : prev, allClearRecordList[0]);
        const scoreMaster = masterList.find((master) => master.id === "WOW2");
        const completeMaster = masterList.find((master) => master.id === "WOW3");
        return {
          id: dungeon.id,
          clearLevel: recordData?.records?.clearLevel ?? 0,
          completeLevel: recordData?.records?.completeLevel ?? 0,
          levelFirstStep: completeMaster?.firstStep ?? 0,
          levelLastStep: completeMaster?.lastStep ?? 0,
          dungeonName: dungeon.name ?? '',
          charName: recordData?.charName ?? '',
          keystoneScore: recordData.score ?? 0,
          scoreFirstStep: scoreMaster?.firstStep ?? 0,
          scoreLastStep: scoreMaster?.lastStep ?? 0,
        };
      }).sort((left, right) => left.clearLevel - right.clearLevel));
    }
  }, [charId, keystoneRecordList, dungeonList, masterList]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          {charId === ECommonText.ALL ?
            <TableRow>
              <HeaderTableCell>던전</HeaderTableCell>
              <HeaderTableCell width={60}>최저기록</HeaderTableCell>
              <HeaderTableCell>캐릭터</HeaderTableCell>
              <HeaderTableCell>점수</HeaderTableCell>
            </TableRow>
            : <TableRow>
              <HeaderTableCell>던전</HeaderTableCell>
              <HeaderTableCell>최고기록</HeaderTableCell>
              <HeaderTableCell>시클기록</HeaderTableCell>
            </TableRow>
          }
        </TableHead>
        <TableBody>
          {keystoneDungeonData.map((row) => charId === ECommonText.ALL ? (
            <TableRow key={row.id}>
              <TableCell>{row.dungeonName}</TableCell>
              <TableCell sx={{textAlign: "center", color: getRenderColor(row.clearLevel, row.levelFirstStep, row.levelLastStep)}}>
                <Box component="span" sx={{color: getRenderColor(row.completeLevel, row.levelFirstStep, row.levelLastStep)}}>
                  {`${row.completeLevel}`}
                </Box>
                {`(${row.clearLevel})`}
              </TableCell>
              <TableCell sx={{textAlign: "center"}}>{row.charName}</TableCell>
              <TableCell sx={{textAlign: "center", color: getRenderColor(row.keystoneScore, row.scoreFirstStep, row.scoreLastStep)}}>
                {row.keystoneScore}
              </TableCell>
            </TableRow>
          ) : (
            <TableRow key={row.id}>
              <TableCell>{row.dungeonName}</TableCell>
              <TableCell sx={{textAlign: "center", color: getRenderColor(row.completeLevel, row.levelFirstStep, row.levelLastStep)}}>{row.completeLevel}</TableCell>
              <TableCell sx={{textAlign: "center", color: getRenderColor(row.clearLevel, row.levelFirstStep, row.levelLastStep)}}>{row.clearLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KeystoneDungeonTable;
