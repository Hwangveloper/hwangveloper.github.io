import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from "@mui/material";
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
    return <TableCell key={pet?.id} sx={{color: petStatus?.collected.length === 0 ? "red" : petStatus?.collected.length === 1 ? "blue" : "black"}}>{`${pet?.source} ${petStatus?.collected.length}/3`}</TableCell>
  }

  return (
    <TableRow key={`${row?.charId}${row?.term}`} onClick={() => handleClickRow()}>
      <TableCell key={row?.charId}>{row?.charId}</TableCell>
      <TableCell key={row?.category}>{row?.category}</TableCell>
      <TableCell key={petStatus?.name}>{petStatus?.name}</TableCell>
      <TableCell key={pet?.description}>{pet?.description}</TableCell>
      {renderPetStatus()}
    </TableRow>
  );
};

export default WowPetTaskTableRow;
