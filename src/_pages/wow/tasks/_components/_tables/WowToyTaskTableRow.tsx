import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from "@mui/material";
import { IWowTask } from "../../_apis/_models/wowTask";
import { useShallow } from "zustand/shallow";
import useWowTaskStore from "../../stores/useWowTaskStore";
import useConfirmDialog from "../../../../../common/_stores/useConfirmDialog";
import { IWowToy } from "../../_apis/_models/wowToy";
import useBattleNetApiStore from "../../../../../common/_stores/useBattleNetApiStore";
import useWowToyInfoQuery from "../../_apis/_queries/useWowToyInfoQuery";

interface WowToyTaskTableRowProps {
  row?: IWowTask;
  onDelete: (task?: IWowTask) => void;
}

const WowToyTaskTableRow: React.FC<WowToyTaskTableRowProps> = ({ row, onDelete }) => {

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
    return <TableCell key={toyStatus?.id} sx={{color: toyStatus?.is_collected === true ? "black" : "red"}}>{`${toy?.source} ${toyStatus?.is_collected === true ? "1/1" : "0/1"}`}</TableCell>
  }

  return (
    <TableRow key={`${row?.charId}${row?.term}`} onClick={() => handleClickRow()}>
      <TableCell key={row?.charId}>{row?.charId}</TableCell>
      <TableCell key={row?.category}>{row?.category}</TableCell>
      <TableCell key={toyStatus?.name}>{toyStatus?.name}</TableCell>
      <TableCell key={toy?.description}>{toy?.description}</TableCell>
      {renderToyStatus()}
    </TableRow>
  );
};

export default WowToyTaskTableRow;
