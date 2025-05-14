import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { IWowKeystoneRecordView } from "../../_apis/_models/wowKeystone";
import useWowKeystoneFavoriteUpdateMutation from "../../_apis/_mutations/useWowKeystoneFavoriteUpdateMutation";
import useWowKeystoneStore from "../../_stores/useWowKeystoneStore";

interface KeystoneRecordTableRowProps {
  row?: IWowKeystoneRecordView;
  refetch: () => void;
}

const KeystoneRecordTableRow: React.FC<KeystoneRecordTableRowProps> = ({ row, refetch }) => {

  const { mutateAsync: updateKeystoneFavorite } = useWowKeystoneFavoriteUpdateMutation();

  const getBackgroundColor = (value: number, lastStep: number, isFavorites: boolean) => {
    if (value < lastStep) {
      return "#f4cccc";
    } else if (isFavorites) {
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

  const onToggleFavorite = (dungeonId: string, isFavorite: boolean) => {
    updateKeystoneFavorite(
      {
        charId: row?.charId ?? '',
        dungeonId: dungeonId,
        isFavorite: !isFavorite,
        list: useWowKeystoneStore.getState().keystoneTaskList,
      },
      {
        onSuccess: (res) => {
          refetch();
        }
      }
    );
  }

  return (
    <TableRow key={row?.charId}>
      <TableCell key={"-"}>{row?.charName}</TableCell>
      {row?.dungeonRecords.map((record) => (
        <TableCell key={record.dungeonId} sx={{
          textAlign: "center",
          color: getRenderColor(record.clearLevel, record.levelFirstStep ?? 0, record.levelLastStep ?? 0),
          backgroundColor: getBackgroundColor(record.clearLevel, record.levelLastStep, record.isFavorite),
        }} onClick={() => onToggleFavorite(record.dungeonId, record.isFavorite)}>
          {record.clearLevel}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default KeystoneRecordTableRow;
