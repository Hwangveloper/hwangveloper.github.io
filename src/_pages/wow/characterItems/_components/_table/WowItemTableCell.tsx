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

  const { getItemLevelsOfType } = useWowStore(
    useShallow((state) => ({
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
        case EWowItemType.ADVENTURER:
          return "#fce5cd";
        case EWowItemType.STAGER:
          return "#f4cccc";
        case EWowItemType.CHAMPION:
          return "#cfe2f3";
        case EWowItemType.HERO:
          return "#d9d2e9";
        case EWowItemType.MYTHIC:
          return "#cccccc";
        default:
          return "white";
      }
    }
  }

  const getItemLevelColor = () => {

    switch (item?.type) {
      case EWowItemType.ADVENTURER:
        return "#ff9900";
      case EWowItemType.STAGER:
        return "#ff0000";
      case EWowItemType.CHAMPION:
        return "#0000ff";
      case EWowItemType.HERO:
        return "#9900ff";
      case EWowItemType.MYTHIC:
        return "black";
      default:
        return "#00ff00";
    }
  }

  const handleClickItemCell = () => {
    onClickItemCell(items, partType);
  }

  return (
    <TableCell onClick={() => handleClickItemCell()} sx={{textAlign: "center", fontWeight: "600", backgroundColor: getItemUpgradeColor(item?.level), color: getItemLevelColor()}}>
      {item?.level}
    </TableCell>
  );
};

export default WowItemTableCell;
