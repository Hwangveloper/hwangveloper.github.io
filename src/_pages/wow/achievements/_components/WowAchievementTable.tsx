import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import useWowAchievementStore from "../stores/useWowAchievementStore";
import { IWowAchievement } from "../_apis/_models/wowAchievement";
import useWowAchievementDetailQuery from "../_apis/_queries/useWowAchievementDetailQuery";
import useBattleNetApiStore from "../../../../common/_stores/useBattleNetApiStore";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface WowAchievementTableProps {
  refetch: () => void;
}

const WowAchievementTable: React.FC<WowAchievementTableProps> = ({ refetch }) => {

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  const { achievementList } = useWowAchievementStore(
    useShallow((state) => ({
      achievementList: state.achievementList,
    }))
  );

  const [currHref, setCurrHref] = useState<string>('');

  const { data, isFetched, isFetching } = useWowAchievementDetailQuery(accessToken, currHref);

  useEffect(() => {
console.log(data);
  }, [data]);

  const handleOnClick = (achv: IWowAchievement) => {
    setCurrHref(achv.link);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderTableCell width={70}>이름</HeaderTableCell>
            <HeaderTableCell width={70}>완료</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {achievementList.map((row, index) => (
            <TableRow key={`${row.id}`} >
              <TableCell onClick={() => handleOnClick(row)} sx={{textAlign: "center", fontWeight: "600"}}>{row.name}</TableCell>
              <TableCell sx={{textAlign: "center", fontWeight: "600"}}>{row.isCompleted ? "완료" : "미완료"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WowAchievementTable;
