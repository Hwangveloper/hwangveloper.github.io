import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import { EWowRaidType, EWowTransmogPartType, itemTransPartTypeOptions } from "../_constants/wowTierTransmog";
import useWowTierTransmogStore from "../_stores/useWowTierTransmogStore";
import { IWowTierTransmog } from "../_apis/_models/wowTierTransmog";
import WowTierTransmogTableCell from "./_tables/WowTierTransmogTableCell";
import useWowTierTransmogModalStore from "../_stores/useWowTierTransmogModalStore";
import useWowTierTransmogUpdateMutation from "../_apis/_mutations/useWowTierTransmogUpdateMutation";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface WowTierTransmogTableProps {
  refetch: () => void;
}

const WowTierTransmogTable: React.FC<WowTierTransmogTableProps> = ({ refetch }) => {

  const { charTierTransmogList } = useWowTierTransmogStore(
    useShallow((state) => ({
      charTierTransmogList: state.charTierTransmogList,
    }))
  );

  const { mutateAsync: updateTierTransmog } = useWowTierTransmogUpdateMutation();

  const handleClickTransmogCell = (raidType: EWowRaidType, partType: EWowTransmogPartType, transmogs?: IWowTierTransmog) => {
    useWowTierTransmogModalStore.getState().open({
      transmogs,
      partType,
      raidType,
      onConfirm: (request) => {
        updateTierTransmog(
          {
            item: request,
          },
          {
            onSuccess: (res) => {
              refetch();
            }
          }
        );
      }
    });
  }

  const getItemPartTypeName = (partType: EWowTransmogPartType) => {
    return itemTransPartTypeOptions.find((part) => partType === part.value)?.label;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderTableCell width={70}>이름</HeaderTableCell>
            <HeaderTableCell width={70}>난이도</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowTransmogPartType.HEAD)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowTransmogPartType.SHOULDERS)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowTransmogPartType.BACK)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowTransmogPartType.CHEST)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowTransmogPartType.WRIST)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowTransmogPartType.HANDS)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowTransmogPartType.WAIST)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowTransmogPartType.LEGS)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowTransmogPartType.FEET)}</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {charTierTransmogList.map((row, index) => (
            <>
              <TableRow key={`${row.charId}-${index}-${EWowRaidType.RAID_FINDER}`} >
                <TableCell rowSpan={4} sx={{textAlign: "center", fontWeight: "600"}}>{row.charName}</TableCell>
                <TableCell sx={{textAlign: "center", fontWeight: "600"}}>{"공격대 찾기"}</TableCell>
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.RAID_FINDER)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.RAID_FINDER} partType={EWowTransmogPartType.HEAD} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.RAID_FINDER)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.RAID_FINDER} partType={EWowTransmogPartType.SHOULDERS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.RAID_FINDER)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.RAID_FINDER} partType={EWowTransmogPartType.BACK} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.RAID_FINDER)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.RAID_FINDER} partType={EWowTransmogPartType.CHEST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.RAID_FINDER)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.RAID_FINDER} partType={EWowTransmogPartType.WRIST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.RAID_FINDER)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.RAID_FINDER} partType={EWowTransmogPartType.HANDS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.RAID_FINDER)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.RAID_FINDER} partType={EWowTransmogPartType.WAIST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.RAID_FINDER)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.RAID_FINDER} partType={EWowTransmogPartType.LEGS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.RAID_FINDER)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.RAID_FINDER} partType={EWowTransmogPartType.FEET} />
              </TableRow>
              <TableRow key={`${row.charId}-${index}-${EWowRaidType.NORMAL}`} >
                <TableCell sx={{textAlign: "center", fontWeight: "600"}}>{"일반"}</TableCell>
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.NORMAL)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.NORMAL} partType={EWowTransmogPartType.HEAD} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.NORMAL)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.NORMAL} partType={EWowTransmogPartType.SHOULDERS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.NORMAL)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.NORMAL} partType={EWowTransmogPartType.BACK} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.NORMAL)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.NORMAL} partType={EWowTransmogPartType.CHEST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.NORMAL)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.NORMAL} partType={EWowTransmogPartType.WRIST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.NORMAL)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.NORMAL} partType={EWowTransmogPartType.HANDS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.NORMAL)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.NORMAL} partType={EWowTransmogPartType.WAIST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.NORMAL)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.NORMAL} partType={EWowTransmogPartType.LEGS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.NORMAL)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.NORMAL} partType={EWowTransmogPartType.FEET} />
              </TableRow>
              <TableRow key={`${row.charId}-${index}-${EWowRaidType.HEROIC}`} >
                <TableCell sx={{textAlign: "center", fontWeight: "600"}}>{"영웅"}</TableCell>
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.HEROIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.HEROIC} partType={EWowTransmogPartType.HEAD} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.HEROIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.HEROIC} partType={EWowTransmogPartType.SHOULDERS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.HEROIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.HEROIC} partType={EWowTransmogPartType.BACK} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.HEROIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.HEROIC} partType={EWowTransmogPartType.CHEST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.HEROIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.HEROIC} partType={EWowTransmogPartType.WRIST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.HEROIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.HEROIC} partType={EWowTransmogPartType.HANDS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.HEROIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.HEROIC} partType={EWowTransmogPartType.WAIST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.HEROIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.HEROIC} partType={EWowTransmogPartType.LEGS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.HEROIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.HEROIC} partType={EWowTransmogPartType.FEET} />
              </TableRow>
              <TableRow key={`${row.charId}-${index}-${EWowRaidType.MYTHIC}`} sx={{borderBottom: "2px solid black"}} >
                <TableCell sx={{textAlign: "center", fontWeight: "600"}}>{"신화"}</TableCell>
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.MYTHIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.MYTHIC} partType={EWowTransmogPartType.HEAD} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.MYTHIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.MYTHIC} partType={EWowTransmogPartType.SHOULDERS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.MYTHIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.MYTHIC} partType={EWowTransmogPartType.BACK} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.MYTHIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.MYTHIC} partType={EWowTransmogPartType.CHEST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.MYTHIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.MYTHIC} partType={EWowTransmogPartType.WRIST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.MYTHIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.MYTHIC} partType={EWowTransmogPartType.HANDS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.MYTHIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.MYTHIC} partType={EWowTransmogPartType.WAIST} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.MYTHIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.MYTHIC} partType={EWowTransmogPartType.LEGS} />
                <WowTierTransmogTableCell transmogs={row.raidTierTransmog.get(EWowRaidType.MYTHIC)} onClickTransmogCell={handleClickTransmogCell} raidType={EWowRaidType.MYTHIC} partType={EWowTransmogPartType.FEET} />
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WowTierTransmogTable;
