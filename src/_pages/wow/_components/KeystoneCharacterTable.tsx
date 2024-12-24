import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "styled-components";
import useWowKeystoneStore from "../_stores/useWowKeystoneStore";
import { useShallow } from "zustand/shallow";
import { ECommonText, ECommonYN } from "../../../common/_constants/common";
import { IWowKeystoneCharacterView } from "../_apis/_models/wowKeystone";
import useWowStore from "../_stores/useWowStore";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface KeystoneCharacterTableProps {
  dungeonId: string;
}

const KeystoneCharacterTable: React.FC<KeystoneCharacterTableProps> = ({ dungeonId }) => {

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

  const [keystoneCharacterData, setKeystoneCharacterData] = useState<IWowKeystoneCharacterView[]>([]);

  useEffect(() => {
    if (keystoneTaskList && keystoneTaskList.length > 0) {
      setKeystoneCharacterData(characterList.filter((char) => char.isMain === ECommonYN.Y).map((char) => {
        const allCompleteDataList = keystoneTaskList.filter((keystone) => keystone.masterId === "WOW3" && keystone.charId === char.id && (dungeonId === ECommonText.ALL || keystone.dungeonId === dungeonId));
        const completeData = allCompleteDataList.reduce((prev, curr) => curr.value < prev.value ? curr : prev, allCompleteDataList[0]);
        const clearData = keystoneTaskList.find((keystone) => keystone.masterId === "WOW4" && keystone.charId === char.id && keystone.dungeonId === completeData.dungeonId);
        const scoreData = keystoneTaskList.find((keystone) => keystone.masterId === "WOW2" && keystone.charId === char.id);
        return {
          id: char.id,
          clearLevel: clearData?.value ?? 0,
          completeLevel: completeData?.value ?? 0,
          dungeonName: completeData?.dungeonName ?? '',
          charName: char.name,
          keystoneScore: scoreData?.value ?? 0,
        };
      }).sort((left, right) => left.completeLevel - right.completeLevel));
    }
  }, [dungeonId, keystoneTaskList, characterList]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          {dungeonId === ECommonText.ALL ?
            <TableRow>
              <HeaderTableCell width={60}>최저기록</HeaderTableCell>
              <HeaderTableCell>던전</HeaderTableCell>
              <HeaderTableCell>캐릭터</HeaderTableCell>
              <HeaderTableCell>점수</HeaderTableCell>
            </TableRow>
            : <TableRow>
              <HeaderTableCell>기록</HeaderTableCell>
              <HeaderTableCell>캐릭터</HeaderTableCell>
              <HeaderTableCell>점수</HeaderTableCell>
            </TableRow>
          }
        </TableHead>
        <TableBody>
          {keystoneCharacterData.map((row) => dungeonId === ECommonText.ALL ? (
            <TableRow key={row.id}>
              <TableCell sx={{textAlign: "center"}}>{`${row.completeLevel}(${row.clearLevel})`}</TableCell>
              <TableCell>{row.dungeonName}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{row.charName}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{row.keystoneScore}</TableCell>
            </TableRow>
          ) : (
            <TableRow key={row.id}>
              <TableCell sx={{textAlign: "center"}}>{`${row.completeLevel}(${row.clearLevel})`}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{row.charName}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{row.keystoneScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KeystoneCharacterTable;
