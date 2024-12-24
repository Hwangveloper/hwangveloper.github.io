import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
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

  const { getList } = useProjectTaskStore(
    useShallow((state) => ({
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

  useEffect(() => {
    if (data && isFetched && !isFetching) {
      useProjectTaskStore.setState({
        taskList: data,
      });
    }
  }, [data, isFetched, isFetching]);

  useEffect(() => {
    useLoader.setState({ isLoading: isFetching });
  }, [isFetching]);

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

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom marginTop="16px">
        프로젝트 할 일
      </Typography>
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
