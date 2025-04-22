import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import useWowCharItemStore from "../_stores/useWowCharItemStore";
import WowItemTableCell from "./_table/WowItemTableCell";
import WowWeaponTableCell from "./_table/WowWeaponTableCell";
// import useWowCharacterOrderUpdateMutation from "../_apis/_mutations/useWowCharacterOrderUpdateMutation";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

const WowCharacterItemTable: React.FC = () => {

  const { charItemList } = useWowCharItemStore(
    useShallow((state) => ({
      charItemList: state.charItemList,
    }))
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderTableCell width={70}>이름</HeaderTableCell>
            <HeaderTableCell colSpan={2}>무기</HeaderTableCell>
            <HeaderTableCell>머리</HeaderTableCell>
            <HeaderTableCell>목</HeaderTableCell>
            <HeaderTableCell>어깨</HeaderTableCell>
            <HeaderTableCell>등</HeaderTableCell>
            <HeaderTableCell>가슴</HeaderTableCell>
            <HeaderTableCell>손목</HeaderTableCell>
            <HeaderTableCell>손</HeaderTableCell>
            <HeaderTableCell>허리</HeaderTableCell>
            <HeaderTableCell>다리</HeaderTableCell>
            <HeaderTableCell>발</HeaderTableCell>
            <HeaderTableCell>반지1</HeaderTableCell>
            <HeaderTableCell>반지2</HeaderTableCell>
            <HeaderTableCell>장신구1</HeaderTableCell>
            <HeaderTableCell>장신구2</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {charItemList.map((row, index) => (
            <TableRow key={`${row.charId}-${index}`} >
              <TableCell sx={{textAlign: "center"}}>{row.charName}</TableCell>
              <WowWeaponTableCell items={row} />
              <WowItemTableCell item={row.head} />
              <WowItemTableCell item={row.neck} />
              <WowItemTableCell item={row.shoulders} />
              <WowItemTableCell item={row.back} />
              <WowItemTableCell item={row.chest} />
              <WowItemTableCell item={row.wrist} />
              <WowItemTableCell item={row.hands} />
              <WowItemTableCell item={row.waist} />
              <WowItemTableCell item={row.legs} />
              <WowItemTableCell item={row.feet} />
              <WowItemTableCell item={row.ring1} />
              <WowItemTableCell item={row.ring2} />
              <WowItemTableCell item={row.trinket1} />
              <WowItemTableCell item={row.trinket2} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WowCharacterItemTable;
