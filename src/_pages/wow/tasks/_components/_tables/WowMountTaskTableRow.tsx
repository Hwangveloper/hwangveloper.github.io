import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from "@mui/material";
import { IWowTask } from "../../_apis/_models/wowTask";
import { useShallow } from "zustand/shallow";
import useWowTaskStore from "../../stores/useWowTaskStore";
import useConfirmDialog from "../../../../../common/_stores/useConfirmDialog";
import { IWowMount } from "../../_apis/_models/wowMount";
import useWowMountInfoQuery from "../../_apis/_queries/useWowMountInfoQuery";
import useBattleNetApiStore from "../../../../../common/_stores/useBattleNetApiStore";

interface WowMountTaskTableRowProps {
  row?: IWowTask;
  onDelete: (task?: IWowTask) => void;
}

const WowMountTaskTableRow: React.FC<WowMountTaskTableRowProps> = ({ row, onDelete }) => {

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  const { mountList } = useWowTaskStore(
    useShallow((state) => ({
      mountList: state.mountList,
    }))
  );

  const { data: mount } = useWowMountInfoQuery(accessToken, {mountId: Number(row?.term)});

  const [mountStatus, setMountStatus] = useState<IWowMount>();

  useEffect(() => {
    const mnt = mountList.find((mnt) => mnt.id === Number(row?.term));
    setMountStatus(mnt);
  }, [row, mountList]);

  const handleClickRow = () => {
    useConfirmDialog.setState({
      isOpen: true,
      message: `${mountStatus?.name} 항목을 삭제하시겠습니까?`,
      onConfirm: () => onDelete(row),
    });
  }

  const renderMountStatus = () => {
    return <TableCell key={row?.term} sx={{color: mountStatus?.is_collected === true ? "black" : "red"}}>{`${mount?.source} ${mountStatus?.is_collected === true ? "1/1" : "0/1"}`}</TableCell>
  }

  return (
    <TableRow key={`${row?.charId}${row?.term}`} onClick={() => handleClickRow()}>
      <TableCell key={row?.charId}>{row?.charId}</TableCell>
      <TableCell key={row?.category}>{row?.category}</TableCell>
      <TableCell key={mountStatus?.name}>{mountStatus?.name}</TableCell>
      <TableCell key={mount?.description}>{mount?.description}</TableCell>
      {renderMountStatus()}
    </TableRow>
  );
};

export default WowMountTaskTableRow;
