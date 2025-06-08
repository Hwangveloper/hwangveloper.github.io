import React, { useEffect } from "react";
import { TableCell } from "@mui/material";
import useWowMythicDungeonRecordQuery from "../../_apis/_queries/useWowMythicDungeonRecordQuery";
import useBattleNetApiStore from "../../../../../common/_stores/useBattleNetApiStore";
import { useShallow } from "zustand/shallow";
import { IWowCharacter } from "../../../characters/_apis/_models/wowCharacter";
import styled from "styled-components";
import useWowKeystoneStore from "../../_stores/useWowKeystoneStore";

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

  const { addCharRecord } = useWowKeystoneStore(
    useShallow((state) => ({
      addCharRecord: state.addCharRecord,
    }))
  );

  const { data: charRecord } = useWowMythicDungeonRecordQuery(accessToken, {realm: char?.server ?? '', charName: char?.name ?? ''});

  useEffect(() => {
    if (charRecord) {
      addCharRecord(charRecord);
    }
  }, [charRecord, addCharRecord]);

  return (
    <HeaderTableCell>{char.name}</HeaderTableCell>
  );
};

export default WeeklyKeystoneHeaderTableCell;
