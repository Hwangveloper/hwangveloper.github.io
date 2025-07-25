import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import styled from "styled-components";
import useWowKeystoneStore from "../_stores/useWowKeystoneStore";
import { useShallow } from "zustand/shallow";
import { ECommonText, ECommonYN } from "../../../../common/_constants/common";
import { IWowKeystoneCharacterView } from "../_apis/_models/wowKeystone";
import useWowStore from "../../_stores/useWowStore";


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

  const { masterList, characterList } = useWowStore(
    useShallow((state) => ({
      masterList: state.masterList,
      characterList: state.characterList,
    }))
  );

  const { keystoneRecordList } = useWowKeystoneStore(
    useShallow((state) => ({
      keystoneRecordList: state.keystoneRecordList,
    }))
  );

  const [keystoneCharacterData, setKeystoneCharacterData] = useState<IWowKeystoneCharacterView[]>([]);

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
    if (keystoneRecordList && keystoneRecordList.length > 0 && masterList) {
      setKeystoneCharacterData(characterList.filter((char) => char.isMain === ECommonYN.Y).map((char) => {
        const charRecordList = keystoneRecordList.find((keystone) => keystone.charName === char.name);
        const allClearRecordList = charRecordList?.seasonRecords.filter((record) => dungeonId === ECommonText.ALL || record.dungeonId === dungeonId) ?? [];
        const recordData = allClearRecordList.reduce((prev, curr) => curr.clearLevel < prev.clearLevel ? curr : prev, allClearRecordList[0]);
        const scoreMaster = masterList.find((master) => master.id === "WOW2");
        const completeMaster = masterList.find((master) => master.id === "WOW3");
        return {
          id: char.id,
          clearLevel: recordData?.clearLevel ?? 0,
          completeLevel: recordData?.completeLevel ?? 0,
          levelFirstStep: completeMaster?.firstStep ?? 0,
          levelLastStep: completeMaster?.lastStep ?? 0,
          dungeonName: recordData?.dungeonName ?? '',
          charName: char.name,
          charJob: char.job,
          keystoneScore: charRecordList?.mythicRating ?? 0,
          scoreFirstStep: scoreMaster?.firstStep ?? 0,
          scoreLastStep: scoreMaster?.lastStep ?? 0,
        };
      }).sort((left, right) => left.clearLevel - right.clearLevel));
    }
  }, [dungeonId, keystoneRecordList, characterList, masterList]);

  const getClassColor = (className?: string): string => {
    switch (className) {
      case "수도사":
        return "#00ff98";
      case "기원사":
        return "#33937f";
      case "마법사":
        return "#3fc7eb";
      case "성기사":
        return "#f48cba";
      case "드루이드":
        return "#ff7c0a";
      case "사냥꾼":
        return "#aad372";
      case "사제":
        return "#ffffff";
      case "전사":
        return "#c69b6d";
      case "악마사냥꾼":
        return "#a330c9";
      case "주술사":
        return "#0070dd";
      case "흑마법사":
        return "#8788ee";
      case "죽음의 기사":
        return "#c41e3a";
      case "도적":
        return "#fff468";
    }

    return "#000000";
  }

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
              <TableCell sx={{textAlign: "center", color: getRenderColor(row.clearLevel, row.levelFirstStep, row.levelLastStep)}}>
                <Box component="span" sx={{color: getRenderColor(row.completeLevel, row.levelFirstStep, row.levelLastStep)}}>
                  {`${row.completeLevel}`}
                </Box>
                {`(${row.clearLevel})`}
              </TableCell>
              <TableCell>{row.dungeonName}</TableCell>
              <TableCell key={row.charName}
                sx={{
                  textAlign: "center",
                  fontWeight: "700",
                  color: `${getClassColor(row.charJob)}`,
                  textShadow: (row.charJob === "사제" || row.charJob === "도적") ? "1px 1px 4px black" : "1px 1px 0 black",
                }}
              >
                {row.charName}
              </TableCell>
              <TableCell sx={{textAlign: "center", color: getRenderColor(row.keystoneScore, row.scoreFirstStep, row.scoreLastStep)}}>
                {row.keystoneScore}
              </TableCell>
            </TableRow>
          ) : (
            <TableRow key={row.id}>
              <TableCell sx={{textAlign: "center", color: getRenderColor(row.clearLevel, row.levelFirstStep, row.levelLastStep)}}>
                <Box component="span" sx={{color: getRenderColor(row.completeLevel, row.levelFirstStep, row.levelLastStep)}}>
                  {`${row.completeLevel}`}
                </Box>
                {`(${row.clearLevel})`}
              </TableCell>
              <TableCell key={row.charName}
                sx={{
                  textAlign: "center",
                  fontWeight: "700",
                  color: `${getClassColor(row.charJob)}`,
                  textShadow: (row.charJob === "사제" || row.charJob === "도적") ? "1px 1px 4px black" : "1px 1px 0 black",
                }}
              >
                {row.charName}
              </TableCell>
              <TableCell sx={{textAlign: "center", color: getRenderColor(row.keystoneScore, row.scoreFirstStep, row.scoreLastStep)}}>
                {row.keystoneScore}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KeystoneCharacterTable;
