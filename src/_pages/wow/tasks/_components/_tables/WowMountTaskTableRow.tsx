import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Box, Typography, Link } from "@mui/material";
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
    return (
      <TableCell key={row?.term} onClick={() => handleClickRow()}>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle2" fontWeight="700">{row?.description}</Typography>
          <Box display="flex" justifyContent="center" sx={{color: mountStatus?.is_collected === true ? "black" : "red"}}>
            {`${mount?.source} ${mountStatus?.is_collected === true ? "1/1" : "0/1"}`}
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
    <TableRow key={`${row?.charId}${row?.term}`} sx={{backgroundColor: "#f4cccc"}}>
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
      <TableCell key={row?.category} onClick={() => handleClickRow()}>탈것</TableCell>
      <TableCell key={mountStatus?.name} onClick={() => handleClickRow()}>{mountStatus?.name}</TableCell>
      <TableCell key={mount?.description} onClick={() => handleClickRow()}>{mount?.description}</TableCell>
      {renderMountStatus()}
      <TableCell sx={{textAlign: "center"}}>{row?.reference ? <Link href={row?.reference} target="_blank">링크</Link> : <></>}</TableCell>
    </TableRow>
  );
};

export default WowMountTaskTableRow;
