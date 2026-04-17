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

  const { getItemLevelsOfType, itemLevelList } = useWowStore(
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
    const itemLevel = item?.level ?? 0;
    const idx = typeItemLevels.findIndex((iLevel) => iLevel.itemLevel === itemLevel);
console.log(itemLevel);
console.log(item?.type);
console.log(idx);
    switch (item?.type) {
      case EWowItemType.ADVENTURER:
        return "#ff9900";
      case EWowItemType.STAGER:
        if (idx === 0) {
          return "#ff9900";
        }
        return "#ff0000";
      case EWowItemType.CHAMPION:
        if (idx === 0) {
          return "#ff0000";
        }
        return "#0000ff";
      case EWowItemType.HERO:
        if (idx === 0) {
          return "#0000ff";
        }
        return "#9900ff";
      case EWowItemType.MYTHIC:
        if (idx === 0) {
          return "#9900ff";
        }
        return "black";
      default:
        if (itemLevelList && itemLevelList.length > 0) {
          const itemLevelInfo = itemLevelList.reduce((prev, curr) => {
            if ((item?.level ?? 0) >= curr.itemLevel) {
              return curr;
            } else {
              return prev;
            }
          }, itemLevelList[0]);
          if (itemLevelInfo.level <= 0) {
            return "#00ff00";
          } else if (itemLevelInfo.level <= 4) {
            return "#ff9900";
          } else if (itemLevelInfo.level <= 8) {
            return "#ff0000";
          } else if (itemLevelInfo.level <= 12) {
            return "#0000ff";
          } else if (itemLevelInfo.level <= 16) {
            return "#9900ff";
          } else {
            return "black";
          }
        }
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
