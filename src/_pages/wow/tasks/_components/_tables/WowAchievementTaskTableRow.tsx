import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Box, Typography, Link } from "@mui/material";
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
    <TableRow key={`${row?.charId}${row?.term}`} sx={{backgroundColor: "#fff2cc"}}>
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
      <TableCell key={row?.category} onClick={() => handleClickRow()}>업적</TableCell>
      <TableCell key={achievement?.name} onClick={() => handleClickRow()}>{achievement?.name}</TableCell>
      <TableCell key={achievement?.description} onClick={() => handleClickRow()}>{achievement?.description}</TableCell>
      <TableCell key={row?.term} onClick={() => handleClickRow()}>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle2" fontWeight="700">{row?.description}</Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" columnGap="8px" justifyContent="center">
            {achievement?.criteria.childCriteria ? achievement?.criteria.childCriteria?.map((child, idx) => renderCriteria(achievementStatus?.criteria.childCriteria?.[idx], child)) : renderCriteria(achievementStatus?.criteria, achievement?.criteria)}
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{textAlign: "center"}}>{row?.reference ? <Link href={row?.reference} target="_blank">링크</Link> : <></>}</TableCell>
    </TableRow>
  );
};

export default WowAchievementTaskTableRow;
