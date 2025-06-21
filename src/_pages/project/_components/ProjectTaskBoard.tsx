import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { IProjectTaskColumn } from '../_apis/_models/projectTask';
import ProjectTaskColumn from './ProjectTaskColumn';
import useProjectStore from '../_stores/useProjectStore';
import { useShallow } from 'zustand/shallow';
import useProjectTaskQuery from '../_apis/_queries/useProjectTaskQuery';
import { EProjectTaskStatus } from '../_constants/projectTask';
import useLoader from '../../../common/_stores/useLoader';
import useProjectTaskStore from '../_stores/useProjectTaskStore';
import useProjectTaskStateUpdateMutation from '../_apis/_mutations/useProjectTaskStateUpdateMutation';
import UpdateProjectTaskModal from './UpdateProjectTaskModal';
import useProjectTaskUpdateModalStore from '../_stores/useProjectTaskUpdateModalStore';
import { ICommonOption } from '../../../common/_models/common';
import { DATE_FORMAT, ECommonText } from '../../../common/_constants/common';

// Styled Components
const BoardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  overflowX: 'auto',
}));

const ProjectTaskBoard: React.FC = () => {

  const { projectList } = useProjectStore(
    useShallow((state) => ({
      projectList: state.projectList,
    }))
  );

  const { currSprint, sprintList, getList } = useProjectTaskStore(
    useShallow((state) => ({
      currSprint: state.currSprint,
      sprintList: state.sprintList,
      getList: state.getList,
    }))
  );

  const { isOpen } = useProjectTaskUpdateModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
    }))
  );

  const columns: IProjectTaskColumn[] = [
    { id: EProjectTaskStatus.TODO, title: 'To Do' },
    { id: EProjectTaskStatus.DOING, title: 'Doing' },
    { id: EProjectTaskStatus.DONE, title: 'Done' },
    { id: EProjectTaskStatus.BACKLOG, title: 'Backlog' },
  ];

  const { data, isFetched, isFetching, refetch } = useProjectTaskQuery(projectList.length > 0 ? { projectList, ignoreDelete: true } : undefined);

  const { mutateAsync: updateTaskState } = useProjectTaskStateUpdateMutation();

  const [sprintOptions, setSprintOptions] = useState<ICommonOption[]>([]);

  useEffect(() => {
    if (data && isFetched && !isFetching) {
      useProjectTaskStore.setState({
        taskList: data.taskList,
        sprintList: data.sprintList,
      });
    }
  }, [data, isFetched, isFetching]);

  useEffect(() => {
    useLoader.setState({ isLoading: isFetching });
  }, [isFetching]);

  useEffect(() => {
    if (sprintList) {
      setSprintOptions([
        {
          label: '전체',
          value: ECommonText.ALL,
        },
        ...sprintList.map((sprint) => {
        const startDate = sprint.startDate.format(DATE_FORMAT);
        const endDate = sprint.endDate.format(DATE_FORMAT);
        return {
          label: `${startDate} ~ ${endDate}`,
          value: `${startDate}&${endDate}`,
        };
      })]);
    }
  }, [sprintList]);

  const handleDragEnd = (result: DropResult) => {
    const { draggableId: taskId, source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const task = getList(source.droppableId as EProjectTaskStatus).find((row) => row.id === taskId);

    updateTaskState(
      {
        item: {
          rowIndex: task?.rowIndex ?? 0,
          startDatetime: task?.startDatetime,
          endDatetime: task?.endDatetime,
          state: destination.droppableId as EProjectTaskStatus,
        }
      },
      {
        onSuccess: (res) => {
          refetch();
        }
      }
    );
  };

  const handleChangeSprint = (sprint: string) => {
    useProjectTaskStore.setState({
      currSprint: sprint,
    });
  };

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom marginTop="16px">
        프로젝트 할 일
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" marginX="20px" gap="10px">
        <Typography variant="h6">스프린트</Typography>
        <Select
          variant="standard"
          autoFocus
          sx={{minWidth: "200px"}}
          value={currSprint}
          onChange={(e) => handleChangeSprint(e.target.value as string)}
        >
          {sprintOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <BoardContainer>
          {columns.map((column) => (
            <ProjectTaskColumn column={column} refetch={refetch} />
          ))}
        </BoardContainer>
      </DragDropContext>
      {isOpen && <UpdateProjectTaskModal />}
    </Box>
  );
};

export default ProjectTaskBoard;
