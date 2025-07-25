import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Box, Typography, Link } from "@mui/material";
import { IWowTask } from "../../_apis/_models/wowTask";
import { useShallow } from "zustand/shallow";
import useWowTaskStore from "../../stores/useWowTaskStore";
import useConfirmDialog from "../../../../../common/_stores/useConfirmDialog";
import { IWowPet } from "../../_apis/_models/wowPet";
import useBattleNetApiStore from "../../../../../common/_stores/useBattleNetApiStore";
import useWowPetInfoQuery from "../../_apis/_queries/useWowPetInfoQuery";

interface WowPetTaskTableRowProps {
  row?: IWowTask;
  onDelete: (task?: IWowTask) => void;
}

const WowPetTaskTableRow: React.FC<WowPetTaskTableRowProps> = ({ row, onDelete }) => {

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  const { petList } = useWowTaskStore(
    useShallow((state) => ({
      petList: state.petList,
    }))
  );

  const [petStatus, setPetStatus] = useState<IWowPet>();

  const { data: pet } = useWowPetInfoQuery(accessToken, {petId: petStatus?.id});

  useEffect(() => {
    const p = petList.find((p) => p.name === row?.term);
    setPetStatus(p);
  }, [row, petList]);

  const handleClickRow = () => {
    useConfirmDialog.setState({
      isOpen: true,
      message: `${petStatus?.name} 항목을 삭제하시겠습니까?`,
      onConfirm: () => onDelete(row),
    });
  }

  const renderPetStatus = () => {
    return (
      <TableCell key={pet?.id} onClick={() => handleClickRow()}>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle2" fontWeight="700">{row?.description}</Typography>
          <Box display="flex" justifyContent="center"  sx={{color: petStatus?.collected.length === 0 ? "red" : petStatus?.collected.length === 1 ? "blue" : "black"}}>
            {`${pet?.source} ${petStatus?.collected.length}/3`}
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
    <TableRow key={`${row?.charId}${row?.term}`} sx={{backgroundColor: "#d9ead3"}}>
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
      <TableCell key={row?.category} onClick={() => handleClickRow()}>애완동물</TableCell>
      <TableCell key={petStatus?.name} onClick={() => handleClickRow()}>{petStatus?.name}</TableCell>
      <TableCell key={pet?.description} onClick={() => handleClickRow()}>{pet?.description}</TableCell>
      {renderPetStatus()}
      <TableCell sx={{textAlign: "center"}}>{row?.reference ? <Link href={row?.reference} target="_blank">링크</Link> : <></>}</TableCell>
    </TableRow>
  );
};

export default WowPetTaskTableRow;
