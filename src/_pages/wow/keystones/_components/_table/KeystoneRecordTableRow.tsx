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
    if (value < lastStep && isFavorites) {
      return "#f4cccc";
    } else if (value < lastStep) {
      return "#d9ead3";
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

  const getClassColor = (className?: string): string => {
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
    <TableRow key={row?.charId}>
      <TableCell key={row?.charId}
        sx={{
          textAlign: "center",
          fontWeight: "700",
          color: `${getClassColor(row?.charJob)}`,
          textShadow: (row?.charJob === "사제" || row?.charJob === "도적") ? "1px 1px 4px black" : "1px 1px 0 black",
        }}
      >
        {row?.charName}
      </TableCell>
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
