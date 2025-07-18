import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Box } from "@mui/material";
import { IWowTask } from "../../_apis/_models/wowTask";
import useBattleNetApiStore from "../../../../../common/_stores/useBattleNetApiStore";
import { useShallow } from "zustand/shallow";
import useWowAchievementInfoQuery from "../../_apis/_queries/useWowAchievementInfoQuery";
import useWowTaskStore from "../../stores/useWowTaskStore";
import { IWowAchievement, IWowAchievementCriteria } from "../../_apis/_models/wowAchievement";
import useConfirmDialog from "../../../../../common/_stores/useConfirmDialog";

interface WowAchievementTaskTableRowProps {
  row?: IWowTask;
  onDelete: (task?: IWowTask) => void;
}

const WowAchievementTaskTableRow: React.FC<WowAchievementTaskTableRowProps> = ({ row, onDelete }) => {

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  const { achievementList } = useWowTaskStore(
    useShallow((state) => ({
      achievementList: state.achievementList,
    }))
  );

  const { data: achievement } = useWowAchievementInfoQuery(accessToken, {achievementId: Number(row?.term)});

  const [achievementStatus, setAchievementStatus] = useState<IWowAchievement>();

  useEffect(() => {
    if (achievementList && row) {
      setAchievementStatus(achievementList.find((achv) => achv.id === Number(row.term)));
    }
  }, [achievementList, row]);

  const handleClickRow = () => {
    useConfirmDialog.setState({
      isOpen: true,
      message: `${achievement?.name} 항목을 삭제하시겠습니까?`,
      onConfirm: () => onDelete(row),
    });
  }

  const renderCriteria = (criteriaStatus?: IWowAchievementCriteria, criteriaInfo?: IWowAchievementCriteria) => {
    return (
      <Box sx={{color: criteriaStatus?.isCompleted ? "black" : (criteriaStatus?.amount ?? 0) > 0 ? "blue" : "red"}}>
        {`${criteriaInfo?.description ? `${criteriaInfo?.description} - ` : ''}${(criteriaStatus?.amount ?? 0) > (criteriaInfo?.amount ?? 0) ? criteriaInfo?.amount : (criteriaStatus?.amount ?? 0)}/${criteriaInfo?.amount}`}
      </Box>
    );
  }

  return (
    <TableRow key={`${row?.charId}${row?.term}`} onClick={() => handleClickRow()}>
      <TableCell key={row?.charId}>{row?.charId}</TableCell>
      <TableCell key={row?.category}>{row?.category}</TableCell>
      <TableCell key={achievement?.name}>{achievement?.name}</TableCell>
      <TableCell key={achievement?.description}>{achievement?.description}</TableCell>
      <TableCell key={row?.term}>
        <Box display="flex" flexDirection="column">
          {achievement?.criteria.childCriteria ? achievement?.criteria.childCriteria?.map((child, idx) => renderCriteria(achievementStatus?.criteria.childCriteria?.[idx], child)) : renderCriteria(achievementStatus?.criteria, achievement?.criteria)}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default WowAchievementTaskTableRow;
