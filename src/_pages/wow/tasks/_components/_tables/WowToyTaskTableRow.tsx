import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Box, Typography, Link } from "@mui/material";
import { IWowTask } from "../../_apis/_models/wowTask";
import { useShallow } from "zustand/shallow";
import useWowTaskStore from "../../stores/useWowTaskStore";
import useConfirmDialog from "../../../../../common/_stores/useConfirmDialog";
import { IWowToy } from "../../_apis/_models/wowToy";
import useBattleNetApiStore from "../../../../../common/_stores/useBattleNetApiStore";
import useWowToyInfoQuery from "../../_apis/_queries/useWowToyInfoQuery";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

interface WowToyTaskTableRowProps {
  row?: IWowTask;
  onDelete: (task?: IWowTask) => void;
  draggableProvided: DraggableProvided;
  draggableStateSnapshot: DraggableStateSnapshot;
}

const WowToyTaskTableRow: React.FC<WowToyTaskTableRowProps> = ({ row, onDelete, draggableProvided, draggableStateSnapshot }) => {

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  const { toyList } = useWowTaskStore(
    useShallow((state) => ({
      toyList: state.toyList,
    }))
  );

  const [toyStatus, setToyStatus] = useState<IWowToy>();

  const { data: toy } = useWowToyInfoQuery(accessToken, {toyId: toyStatus?.id});

  useEffect(() => {
    const t = toyList.find((t) => t.name === row?.term);
    setToyStatus(t);
  }, [row, toyList]);

  const handleClickRow = () => {
    useConfirmDialog.setState({
      isOpen: true,
      message: `${toyStatus?.name} 항목을 삭제하시겠습니까?`,
      onConfirm: () => onDelete(row),
    });
  }

  const renderToyStatus = () => {
    return (
      <TableCell key={toyStatus?.id} onClick={() => handleClickRow()}>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle2" fontWeight="700">{row?.description}</Typography>
          <Box display="flex" justifyContent="center" sx={{color: toyStatus?.is_collected === true ? "black" : "red"}}>
            {`${toy?.source} ${toyStatus?.is_collected === true ? "1/1" : "0/1"}`}
          </Box>
        </Box>
      </TableCell>
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
    <TableRow
          key={`${row?.charId}${row?.term}`}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          style={{
            background: draggableStateSnapshot.isDragging ? "#f0f0f0" : "#cfe2f3",
            ...draggableProvided.draggableProps.style,
          }}
    >
      <TableCell key={row?.charId}
        sx={{
          textAlign: "center",
          fontWeight: "700",
          color: `${getClassColor(row?.charJob)}`,
          textShadow: (row?.charJob === "사제" || row?.charJob === "도적") ? "1px 1px 4px black" : "1px 1px 0 black",
        }}
        onClick={() => handleClickRow()}
      >
        {row?.charName}
      </TableCell>
      <TableCell key={row?.category} onClick={() => handleClickRow()}>장난감</TableCell>
      <TableCell key={toyStatus?.name} onClick={() => handleClickRow()}>{toyStatus?.name}</TableCell>
      <TableCell key={toy?.description} onClick={() => handleClickRow()}>{toy?.description}</TableCell>
      {renderToyStatus()}
      <TableCell sx={{textAlign: "center"}}>{row?.reference ? <Link href={row?.reference} target="_blank">링크</Link> : <></>}</TableCell>
    </TableRow>
  );
};

export default WowToyTaskTableRow;
