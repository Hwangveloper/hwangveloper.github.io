import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "styled-components";
import useWowKeystoneStore from "../_stores/useWowKeystoneStore";
import { useShallow } from "zustand/shallow";
import { ECommonText } from "../../../common/_constants/common";
import { IWowKeystoneDungeonView } from "../_apis/_models/wowKeystone";
import useWowStore from "../_stores/useWowStore";


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

  const { dungeonList } = useWowStore(
    useShallow((state) => ({
      dungeonList: state.dungeonList,
    }))
  );

  const { keystoneTaskList } = useWowKeystoneStore(
    useShallow((state) => ({
      keystoneTaskList: state.keystoneTaskList,
    }))
  );

  const [keystoneDungeonData, setKeystoneDungeonData] = useState<IWowKeystoneDungeonView[]>([]);

  useEffect(() => {
    if (keystoneTaskList && keystoneTaskList.length > 0) {
      setKeystoneDungeonData(dungeonList.map((dungeon) => {
        const allCompleteDataList = keystoneTaskList.filter((keystone) => keystone.masterId === "WOW3" && keystone.dungeonId === dungeon.id && (charId === ECommonText.ALL || keystone.charId === charId));
        const completeData = allCompleteDataList.reduce((prev, curr) => curr.value < prev.value ? curr : prev, allCompleteDataList[0]);
        const clearData = keystoneTaskList.find((keystone) => keystone.masterId === "WOW4" && keystone.dungeonId === dungeon.id && keystone.charId === completeData.charId);
        const scoreData = keystoneTaskList.find((keystone) => keystone.masterId === "WOW2" && keystone.charId === completeData.charId);
        return {
          id: dungeon.id,
          clearLevel: clearData?.value ?? 0,
          completeLevel: completeData?.value ?? 0,
          dungeonName: completeData?.dungeonName ?? '',
          charName: completeData?.charName ?? '',
          keystoneScore: scoreData?.value ?? 0,
        };
      }).sort((left, right) => left.completeLevel - right.completeLevel));
    }
  }, [charId, keystoneTaskList, dungeonList]);

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
              <TableCell sx={{textAlign: "center"}}>{`${row.completeLevel}(${row.clearLevel})`}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{row.charName}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{row.keystoneScore}</TableCell>
            </TableRow>
          ) : (
            <TableRow key={row.id}>
              <TableCell>{row.dungeonName}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{row.completeLevel}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{row.clearLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KeystoneDungeonTable;
