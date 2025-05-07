import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { IWowKeystoneRecordView } from "../../_apis/_models/wowKeystone";

interface KeystoneRecordTableRowProps {
  row?: IWowKeystoneRecordView
}

const KeystoneRecordTableRow: React.FC<KeystoneRecordTableRowProps> = ({ row }) => {

  const getBackgroundColor = (value: number, firstStep: number, lastStep: number) => {
    if (value < firstStep) {
      return "#f4cccc";
    } else if (value < lastStep) {
      return "#cfe2f3";
    } else {
      return "white";
    }
  }

  const getRenderColor = (value: number, firstStep: number, lastStep: number) => {
    if (value < firstStep) {
      return "red";
    } else if (value < lastStep) {
      return "blue";
    } else {
      return "black";
    }
  }

  return (
    <TableRow key="WOW0">
      <TableCell key={"-"}>{row?.charName}</TableCell>
      {row?.dungeonRecords.map((record) => (
        <TableCell key={record.dungeonId} sx={{
          textAlign: "center",
          color: getRenderColor(record.clearLevel, record.levelFirstStep ?? 0, record.levelLastStep ?? 0),
          backgroundColor: getBackgroundColor(record.clearLevel, record.levelFirstStep, record.levelLastStep),
        }}>
          {record.clearLevel}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default KeystoneRecordTableRow;
