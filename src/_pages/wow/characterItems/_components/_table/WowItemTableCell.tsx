import React, { useEffect, useState } from "react";
import { TableCell } from "@mui/material";
import { IWowCharItem, IWowItem, IWowItemLevel } from "../../_apis/_models/wowCharacterItem";
import useWowStore from "../../../_stores/useWowStore";
import { useShallow } from "zustand/shallow";
import { EWowItemPartType, EWowItemType } from "../../_constants/wowCharacterItem";

interface WowItemTableCellProps {
  items: IWowCharItem;
  partType: EWowItemPartType;
  onClickItemCell: (items: IWowCharItem, partType: EWowItemPartType) => void;
}

const WowItemTableCell: React.FC<WowItemTableCellProps> = ({ items, partType, onClickItemCell }) => {

  const { itemLevelList, getItemLevelsOfType } = useWowStore(
    useShallow((state) => ({
      itemLevelList: state.itemLevelList,
      getItemLevelsOfType: state.getItemLevelsOfType,
    }))
  );

  const [item, setItem] = useState<IWowItem>();
  const [typeItemLevels, setTypeItemLevels] = useState<IWowItemLevel[]>([]);

  useEffect(() => {
    if (items) {
      setItem(items?.[partType as Exclude<EWowItemPartType, EWowItemPartType.UNDEFINED>]);
    }
  }, [items, partType]);

  useEffect(() => {
    if (getItemLevelsOfType !== null) {
      setTypeItemLevels(getItemLevelsOfType(item?.type));
    }
  }, [getItemLevelsOfType, item]);

  const getItemUpgradeColor = (itemLevel?: string) => {
    const idx = typeItemLevels.findIndex((iLevel) => iLevel.itemLevel === itemLevel);

    if (idx === typeItemLevels.length - 1) {
      return "white";
    } else {
      switch (item?.type) {
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

  const getItemLevelColor = (itemLevel?: string) => {
    const iLevel = itemLevelList.find((iLevel) => iLevel.itemLevel === itemLevel);
    const lvl = iLevel?.level ?? 0;

    if (lvl < 4) {
      return "#00ff00";
    } else if (lvl < 8) {
      return "#ff9900";
    } else if (lvl < 12) {
      return "#ff0000";
    } else if (lvl < 16) {
      return "#0000ff";
    } else if (lvl < 19) {
      return "#9900ff";
    } else {
      return "black";
    }
  }

  const handleClickItemCell = () => {
    onClickItemCell(items, partType);
  }

  return (
    <TableCell onClick={() => handleClickItemCell()} sx={{textAlign: "center", fontWeight: "600", backgroundColor: getItemUpgradeColor(item?.level), color: getItemLevelColor(item?.level)}}>
      {item?.level}
    </TableCell>
  );
};

export default WowItemTableCell;
