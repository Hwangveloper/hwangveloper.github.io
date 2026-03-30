import React, { useEffect } from "react";
import { TableCell } from "@mui/material";
import useWowMythicDungeonRecordQuery from "../../_apis/_queries/useWowMythicDungeonRecordQuery";
import useBattleNetApiStore from "../../../../../common/_stores/useBattleNetApiStore";
import { useShallow } from "zustand/shallow";
import { IWowCharacter } from "../../../characters/_apis/_models/wowCharacter";
import styled from "styled-components";
import useWowKeystoneStore from "../../_stores/useWowKeystoneStore";
import useWowStore from "../../../_stores/useWowStore";

const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface WeeklyKeystoneHeaderTableCellProps {
  char: IWowCharacter;
}

const WeeklyKeystoneHeaderTableCell: React.FC<WeeklyKeystoneHeaderTableCellProps> = ({ char }) => {

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  const { dungeonList } = useWowStore(
    useShallow((state) => ({
      dungeonList: state.dungeonList,
    }))
  );

  const { currSeasonNo, addCharRecord } = useWowKeystoneStore(
    useShallow((state) => ({
      currSeasonNo: state.currSeasonNo,
      addCharRecord: state.addCharRecord,
    }))
  );

  const { data: charRecord } = useWowMythicDungeonRecordQuery(accessToken, {
    realm: char?.server ?? '',
    charName: char?.name ?? '',
    charJob: char?.job ?? '',
    seasonNo: currSeasonNo,
    dungeonList,
  });

  useEffect(() => {
    if (charRecord) {
      addCharRecord(charRecord);
    }
  }, [charRecord, addCharRecord]);

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
    <HeaderTableCell sx={{
      color: `${getClassColor(char.job)}`,
      textShadow: (char.job === "사제" || char.job === "도적") ? "1px 1px 4px black" : "1px 1px 0 black",
    }}>{char.name}</HeaderTableCell>
  );
};

export default WeeklyKeystoneHeaderTableCell;
