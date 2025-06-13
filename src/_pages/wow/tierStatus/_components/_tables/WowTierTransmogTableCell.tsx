import React from "react";
import { TableCell } from "@mui/material";
import { IWowTierTransmog } from "../../_apis/_models/wowTierTransmog";
import { EWowCollectionStatus, EWowRaidType, EWowTransmogPartType } from "../../_constants/wowTierTransmog";

interface WowTierTransmogTableCellProps {
  transmogs?: IWowTierTransmog;
  partType: EWowTransmogPartType;
  raidType: EWowRaidType;
  onClickTransmogCell: (raidType: EWowRaidType, partType: EWowTransmogPartType, transmog?: IWowTierTransmog) => void;
}

const WowTierTransmogTableCell: React.FC<WowTierTransmogTableCellProps> = ({ transmogs, partType, raidType, onClickTransmogCell }) => {

  const getCollectionStatusColor = (status?: EWowCollectionStatus) => {
    switch (status) {
      case EWowCollectionStatus.COMPLETE:
        return "white";
      case EWowCollectionStatus.CHANGEABLE:
        return "#cfe2f3";
      case EWowCollectionStatus.UPGRADABLE:
        return "#fff2cc";
      default:
        return "#f4cccc";
    }
  }

  const getCollectionStatusText = (status?: EWowCollectionStatus) => {
    switch (status) {
      case EWowCollectionStatus.COMPLETE:
        return "O";
      case EWowCollectionStatus.CHANGEABLE:
        return "변환";
      case EWowCollectionStatus.UPGRADABLE:
        return "업글";
      default:
        return "";
    }
  }

  const handleClickTransmogCell = () => {
    onClickTransmogCell(raidType, partType, transmogs);
  }

  return (
    <TableCell onClick={() => handleClickTransmogCell()} sx={{padding: "5px", height: "18px", textAlign: "center", backgroundColor: getCollectionStatusColor(transmogs?.[partType])}}>
      {getCollectionStatusText(transmogs?.[partType])}
    </TableCell>
  );
};

export default WowTierTransmogTableCell;
