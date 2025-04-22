import React, { useEffect, useState } from "react";
import { TableCell } from "@mui/material";
import { IWowItem, IWowItemLevel } from "../../_apis/_models/wowCharacterItem";
import useWowStore from "../../../_stores/useWowStore";
import { useShallow } from "zustand/shallow";
import { EWowItemType } from "../../_constants/wowCharacterItem";

interface WowItemTableCellProps {
  item: IWowItem;
}

const WowItemTableCell: React.FC<WowItemTableCellProps> = ({ item }) => {

  const { itemLevelList, getItemLevelsOfType } = useWowStore(
    useShallow((state) => ({
      itemLevelList: state.itemLevelList,
      getItemLevelsOfType: state.getItemLevelsOfType,
    }))
  );

  const [typeItemLevels, setTypeItemLevels] = useState<IWowItemLevel[]>([]);

  useEffect(() => {
    if (getItemLevelsOfType !== null) {
      setTypeItemLevels(getItemLevelsOfType(item.type));
    }
  }, [getItemLevelsOfType, item]);

  const getItemUpgradeColor = (itemLevel: string) => {
    const idx = typeItemLevels.findIndex((iLevel) => iLevel.itemLevel === itemLevel);

    if (idx === typeItemLevels.length - 1) {
      return "white";
    } else {
      switch (item.type) {
        case EWowItemType.STAGER:
          return "#d9ead3";
        case EWowItemType.CHAMPION:
          return "#f4cccc";
        case EWowItemType.HERO:
          return "#cfe2f3";
        case EWowItemType.MYTHIC:
          return "#d9d2e9";
        default:
          return "white";
      }
    }
  }

  const getItemLevelColor = (itemLevel: string) => {
    const iLevel = itemLevelList.find((iLevel) => iLevel.itemLevel === itemLevel);
    const lvl = iLevel?.level ?? 0;

    if (lvl < 4) {
      return "#00ff00";
    } else if (lvl < 8) {
      return "#ff9900";
    } else if (lvl < 12) {
      return "#ff0000";
    } else if (lvl < 13) {
      return "#0000ff";
    } else if (lvl < 17) {
      return "#9900ff";
    } else {
      return "black";
    }
  }

  return (
    <TableCell sx={{textAlign: "center", fontWeight: "600", backgroundColor: getItemUpgradeColor(item.level), color: getItemLevelColor(item.level)}}>
      {item.level}
    </TableCell>
  );
};

export default WowItemTableCell;
