import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import useWowCharItemStore from "../_stores/useWowCharItemStore";
import WowItemTableCell from "./_table/WowItemTableCell";
import WowWeaponTableCell from "./_table/WowWeaponTableCell";
import { EWowItemPartType, itemPartTypeOptions } from "../_constants/wowCharacterItem";
import { IWowCharItem } from "../_apis/_models/wowCharacterItem";
import useWowCharItemModalStore from "../_stores/useWowCharItemModalStore";
import useWowCharItemUpdateMutation from "../_apis/_mutations/useWowCharItemUpdateMutation";
import useWowCharWeaponModalStore from "../_stores/useWowCharWeaponModalStore";
import useWowCharWeaponUpdateMutation from "../_apis/_mutations/useWowCharWeaponUpdateMutation";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface WowCharacterItemTableProps {
  refetch: () => void;
}

const WowCharacterItemTable: React.FC<WowCharacterItemTableProps> = ({ refetch }) => {

  const { charItemList } = useWowCharItemStore(
    useShallow((state) => ({
      charItemList: state.charItemList,
    }))
  );

  const { mutateAsync: updateWeapon } = useWowCharWeaponUpdateMutation();
  const { mutateAsync: updateItem } = useWowCharItemUpdateMutation();

  const handleClickWeaponCell = (items: IWowCharItem) => {
    useWowCharWeaponModalStore.getState().open({
      items,
      onConfirm: (request) => {
        updateWeapon(
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

  const handleClickItemCell = (items: IWowCharItem, partType: EWowItemPartType) => {
    useWowCharItemModalStore.getState().open({
      items,
      itemPartType: partType,
      onConfirm: (request) => {
        updateItem(
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

  const getItemPartTypeName = (partType: EWowItemPartType) => {
    return itemPartTypeOptions.find((part) => partType === part.value)?.label;
  }

  const getClassColor = (className: string): string => {
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
          <TableRow>
            <HeaderTableCell width={70}>이름</HeaderTableCell>
            <HeaderTableCell colSpan={2}>{getItemPartTypeName(EWowItemPartType.UNDEFINED)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.HEAD)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.NECK)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.SHOULDERS)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.BACK)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.CHEST)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.WRIST)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.HANDS)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.WAIST)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.LEGS)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.FEET)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.RING1)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.RING2)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.TRINKET1)}</HeaderTableCell>
            <HeaderTableCell>{getItemPartTypeName(EWowItemPartType.TRINKET2)}</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {charItemList.map((row, index) => (
            <TableRow key={`${row.charId}-${index}`} >
              <TableCell sx={{
                textAlign: "center",
                fontWeight: "700",
                color: `${getClassColor(row.charJob)}`,
                textShadow: (row.charJob === "사제" || row.charJob === "도적") ? "1px 1px 4px black" : "1px 1px 0 black",
              }}>{`${row.charName}(${row.itemAverage.toFixed(1)})`}</TableCell>
              <WowWeaponTableCell items={row} onClickWeaponCell={handleClickWeaponCell} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.HEAD} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.NECK} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.SHOULDERS} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.BACK} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.CHEST} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.WRIST} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.HANDS} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.WAIST} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.LEGS} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.FEET} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.RING1} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.RING2} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.TRINKET1} />
              <WowItemTableCell items={row} onClickItemCell={handleClickItemCell} partType={EWowItemPartType.TRINKET2} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WowCharacterItemTable;
