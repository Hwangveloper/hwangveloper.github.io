import React from 'react';
import { Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Droppable } from 'react-beautiful-dnd';
import ProjectTaskCard from './ProjectTaskCard';
import { IProjectTask, IProjectTaskColumn, IProjectTaskUpdateRequest } from '../_apis/_models/projectTask';
import useProjectTaskStore from '../_stores/useProjectTaskStore';
import useProjectTaskDeleteMutation from '../_apis/_mutations/useProjectTaskDeleteMutation';
import useProjectTaskUpdateModalStore from '../_stores/useProjectTaskUpdateModalStore';
import { EProjectTaskStatus } from '../_constants/projectTask';
import useProjectTaskUpdateMutation from '../_apis/_mutations/useProjectTaskUpdateMutation';

// Styled Components
const Column = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minWidth: '300px',
  maxWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

interface ProjectTaskColumnProps {
  column: IProjectTaskColumn;
  refetch: () => void;
}

const ProjectTaskColumn: React.FC<ProjectTaskColumnProps> = ({ column, refetch }) => {

  const { getList } = useProjectTaskStore();

  const { mutateAsync: deleteTask } = useProjectTaskDeleteMutation();
  const { mutateAsync: updateTask } = useProjectTaskUpdateMutation();

  const handleAddTask = (columnId: EProjectTaskStatus, task?: IProjectTask) => {
    useProjectTaskUpdateModalStore.getState().open({
      projectTask: task,
      taskStatus: columnId,
      onConfirm: (newTask: IProjectTaskUpdateRequest) => {
        updateTask(
          {
            item: newTask,
          },
          {
            onSuccess: (res) => {
              refetch();
            }
          }
        )
      }
    })
  };

  const handleUpdateTask = (task: IProjectTask) => {
    handleAddTask(column.id, task);
  }

  const handleDeleteTask = (task: IProjectTask) => {
    deleteTask(
      {
        item: { rowIndex: task.rowIndex },
      },
      {
        onSuccess: (res) => {
          refetch();
        }
      }
    );
  };

  return (
    <Droppable key={column.id} droppableId={column.id}>
      {(provided) => (
        <Column ref={provided.innerRef} {...provided.droppableProps} elevation={3}>
          <Typography variant="h6">{column.title}</Typography>
          {getList(column.id).map((task, index) => (
           <ProjectTaskCard index={index} task={task} column={column} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          ))}
          {provided.placeholder}
          <Button
            variant="contained"
            size="small"
            onClick={() => handleAddTask(column.id)}
            sx={{ marginTop: 1 }}
          >
            Add Task
          </Button>
        </Column>
      )}
    </Droppable>
  );
};

export default ProjectTaskColumn;
