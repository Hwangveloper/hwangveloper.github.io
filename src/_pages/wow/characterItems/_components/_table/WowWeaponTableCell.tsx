import React, { useEffect, useState } from "react";
import { TableCell } from "@mui/material";
import { IWowCharItem, IWowItem } from "../../_apis/_models/wowCharacterItem";
import useWowStore from "../../../_stores/useWowStore";
import { useShallow } from "zustand/shallow";
import { EWowItemType } from "../../_constants/wowCharacterItem";

interface WowWeaponTableCellProps {
  items: IWowCharItem;
  onClickWeaponCell: (items: IWowCharItem) => void;
}

const WowWeaponTableCell: React.FC<WowWeaponTableCellProps> = ({ items, onClickWeaponCell }) => {

  const { itemLevelList, getItemLevelsOfType } = useWowStore(
    useShallow((state) => ({
      itemLevelList: state.itemLevelList,
      getItemLevelsOfType: state.getItemLevelsOfType,
    }))
  );

  const [isTwoHandWeapon, setIsTwoHandWeapon] = useState<boolean>(true);
  const [weapon1, setWeapon1] = useState<IWowItem>();
  const [weapon2, setWeapon2] = useState<IWowItem>();

  useEffect(() => {
    if (items) {
      let currLevel = items.thWeapon1.level !== '' ? Number(items.thWeapon1.level) : 0;
      if (currLevel > 0) {
        setWeapon1(items.thWeapon1);
        setIsTwoHandWeapon(true);
      }
      if (items.thWeapon2.level !== '') {
        if (currLevel < Number(items.thWeapon2.level)) {
          currLevel = Number(items.thWeapon2.level);
          setWeapon1(items.thWeapon2);
          setIsTwoHandWeapon(true);
        }
      }
      if (items.ohWeapon1.level !== '' && items.ohWeapon2.level !== '') {
        const ohWeapon12Level = Number(items.ohWeapon1.level) <= Number(items.ohWeapon2.level) ? Number(items.ohWeapon1.level) : Number(items.ohWeapon2.level);
        if (currLevel < ohWeapon12Level) {
          currLevel = ohWeapon12Level;
          setWeapon1(items.ohWeapon1);
          setWeapon2(items.ohWeapon2);
          setIsTwoHandWeapon(false);
        }
      }
      if (items.ohWeapon3.level !== '' && items.ohWeapon4.level !== '') {
        const ohWeapon34Level = Number(items.ohWeapon3.level) <= Number(items.ohWeapon4.level) ? Number(items.ohWeapon3.level) : Number(items.ohWeapon4.level);
        if (currLevel < ohWeapon34Level) {
          currLevel = ohWeapon34Level;
          setWeapon1(items.ohWeapon3);
          setWeapon2(items.ohWeapon4);
          setIsTwoHandWeapon(false);
        }
      }
    }
  }, [items]);

  const getItemUpgradeColor = (item?: IWowItem) => {
    const typeItemLevels = getItemLevelsOfType(item?.type ?? EWowItemType.ETC);
    const idx = typeItemLevels.findIndex((iLevel) => iLevel.itemLevel === item?.level);

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

  const getItemLevelColor = (item?: IWowItem) => {
    const iLevel = itemLevelList.find((iLevel) => iLevel.itemLevel === item?.level);
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

  const renderWeaponCell = () => {
    if (!isTwoHandWeapon) {
      return (
        <>
          <TableCell onClick={() => onClickWeaponCell(items)} sx={{textAlign: "center", fontWeight: "600", backgroundColor: getItemUpgradeColor(weapon1), color: getItemLevelColor(weapon1)}}>
            {weapon1?.level}
          </TableCell>
          <TableCell onClick={() => onClickWeaponCell(items)} sx={{textAlign: "center", fontWeight: "600", backgroundColor: getItemUpgradeColor(weapon2), color: getItemLevelColor(weapon2)}}>
            {weapon2?.level}
          </TableCell>
        </>
      );
    } else {
      return (
        <TableCell onClick={() => onClickWeaponCell(items)} colSpan={2} sx={{textAlign: "center", fontWeight: "600", backgroundColor: getItemUpgradeColor(weapon1), color: getItemLevelColor(weapon1)}}>
          {weapon1?.level}
        </TableCell>
      );
    }
  }

  return renderWeaponCell();
};

export default WowWeaponTableCell;
