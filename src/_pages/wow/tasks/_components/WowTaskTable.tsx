import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import useWowTaskStore from "../stores/useWowTaskStore";
import WowAchievementTaskTableRow from "./_tables/WowAchievementTaskTableRow";
import { IWowTask } from "../_apis/_models/wowTask";
import { EWowTaskCategory } from "../_constants/wowTask";
import WowMountTaskTableRow from "./_tables/WowMountTaskTableRow";
import WowPetTaskTableRow from "./_tables/WowPetTaskTableRow";
import WowToyTaskTableRow from "./_tables/WowToyTaskTableRow";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface WowTaskTableProps {
  onDelete: (task?: IWowTask) => void;
}

const WowTaskTable: React.FC<WowTaskTableProps> = ({ onDelete }) => {

  const { taskList } = useWowTaskStore(
    useShallow((state) => ({
      taskList: state.taskList,
    }))
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderTableCell width={40}>캐릭터</HeaderTableCell>
            <HeaderTableCell width={40}>분류</HeaderTableCell>
            <HeaderTableCell width={70}>제목</HeaderTableCell>
            <HeaderTableCell width={140}>내용</HeaderTableCell>
            <HeaderTableCell width={140}>진행</HeaderTableCell>
            <HeaderTableCell width={70}>참고</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskList.map((row) => {
            switch (row.category) {
              case EWowTaskCategory.ACHIEVEMENT:
                return <WowAchievementTaskTableRow key={`${row.id}`} row={row} onDelete={onDelete} />;
              case EWowTaskCategory.MOUNT:
                return <WowMountTaskTableRow key={`${row.id}`} row={row} onDelete={onDelete} />;
              case EWowTaskCategory.PET:
                return <WowPetTaskTableRow key={`${row.id}`} row={row} onDelete={onDelete} />;
              case EWowTaskCategory.TOY:
                return <WowToyTaskTableRow key={`${row.id}`} row={row} onDelete={onDelete} />;
            }
            return <></>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WowTaskTable;
