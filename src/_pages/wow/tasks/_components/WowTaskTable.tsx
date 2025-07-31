import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import useWowTaskStore from "../stores/useWowTaskStore";
import WowAchievementTaskTableRow from "./_tables/WowAchievementTaskTableRow";
import { IWowTask } from "../_apis/_models/wowTask";
import { EWowTaskCategory } from "../_constants/wowTask";
import WowMountTaskTableRow from "./_tables/WowMountTaskTableRow";
import WowPetTaskTableRow from "./_tables/WowPetTaskTableRow";
import WowToyTaskTableRow from "./_tables/WowToyTaskTableRow";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import useWowTaskOrderUpdateMutation from "../_apis/_mutations/useWowTaskOrderUpdateMutation";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface WowTaskTableProps {
  onDelete: (task?: IWowTask) => void;
  refetch: () => void;
}

const WowTaskTable: React.FC<WowTaskTableProps> = ({ onDelete, refetch }) => {

  const { taskList } = useWowTaskStore(
    useShallow((state) => ({
      taskList: state.taskList,
    }))
  );

  const { mutateAsync: updateTaskOrder } = useWowTaskOrderUpdateMutation();

  const handleDragEnd = (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;
      if (source.index === destination.index) return;
  
      const sourceOrder = taskList[source.index].order;
      const destOrder = taskList[destination.index].order;
      const sourceTask = taskList[source.index];
      const destTask = taskList[destination.index];
      sourceTask.order = destOrder;
      destTask.order = sourceOrder;

      var updatedTaskList: IWowTask[] = [
        sourceTask,
        destTask,
      ];
  
      updateTaskOrder(
        {
          list: updatedTaskList,
        },
        {
          onSuccess: (res) => {
            refetch();
          }
        }
      );
    };

  return (
    <TableContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderTableCell width={40}>캐릭터</HeaderTableCell>
              <HeaderTableCell width={40}>분류</HeaderTableCell>
              <HeaderTableCell width={70}>제목</HeaderTableCell>
              <HeaderTableCell width={140}>내용</HeaderTableCell>
              <HeaderTableCell width={140}>진행</HeaderTableCell>
              <HeaderTableCell width={70}>참고</HeaderTableCell>
            </TableRow>
          </TableHead>
          <Droppable droppableId="WowTaskTable">
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {taskList.map((row, index) => (
                  <Draggable key={row.id} draggableId={row.id} index={index}>
                    {(provided, snapshot) => {
                      switch (row.category) {
                        case EWowTaskCategory.ACHIEVEMENT:
                          return (<WowAchievementTaskTableRow
                            key={`${row.id}`}
                            row={row}
                            onDelete={onDelete}
                            draggableProvided={provided}
                            draggableStateSnapshot={snapshot}
                          />);
                        case EWowTaskCategory.MOUNT:
                          return (<WowMountTaskTableRow
                            key={`${row.id}`}
                            row={row}
                            onDelete={onDelete}
                            draggableProvided={provided}
                            draggableStateSnapshot={snapshot}
                          />);
                        case EWowTaskCategory.PET:
                          return (<WowPetTaskTableRow
                            key={`${row.id}`}
                            row={row}
                            onDelete={onDelete}
                            draggableProvided={provided}
                            draggableStateSnapshot={snapshot}
                          />);
                        case EWowTaskCategory.TOY:
                          return (<WowToyTaskTableRow
                            key={`${row.id}`}
                            row={row}
                            onDelete={onDelete}
                            draggableProvided={provided}
                            draggableStateSnapshot={snapshot}
                          />);
                      }
                      return <></>;
                    }}
                  </Draggable>
                ))}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </TableContainer>
  );
};

export default WowTaskTable;
