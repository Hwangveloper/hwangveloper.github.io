import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import useWowTaskStore from "../stores/useWowTaskStore";
import WowTaskTableRow from "./_tables/WowTaskTableRow";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface WowTaskTableProps {
}

const WowTaskTable: React.FC<WowTaskTableProps> = () => {

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
            <HeaderTableCell width={140}>진행도</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskList.map((row) => (
            <WowTaskTableRow key={`${row.id}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WowTaskTable;
