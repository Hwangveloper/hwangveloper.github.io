import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';
import { IProjectTask, IProjectTaskColumn } from '../_apis/_models/projectTask';
import { Draggable } from 'react-beautiful-dnd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DATE_FORMAT } from '../../../common/_constants/common';

const TaskCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  boxShadow: '3',
  borderRadius: 4,
}));

interface ProjectTaskCardProps {
  task: IProjectTask;
  column: IProjectTaskColumn;
  index: number;
  onUpdate: (task: IProjectTask) => void;
  onDelete: (task: IProjectTask) => void;
}

const priorityColors: Record<string, { bg: string; color: string }> = {
  HIGH: { bg: '#ffcccc', color: '#cc0000' },
  MEDIUM: { bg: '#fff3cd', color: '#856404' },
  LOW: { bg: '#d4edda', color: '#155724' },
};

const ProjectTaskCard: React.FC<ProjectTaskCardProps> = ({ task, index, onUpdate, onDelete }) => {

  const handleEdit = () => {
    onUpdate(task);
  }

  const handleDelete = () => {
    onDelete(task);
  }

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <TaskCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={2}
        >
          <Typography variant="body1" component="div">
            {`[${task.projectTitle}]`}
          </Typography>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" borderTop="1px solid black">
            <Typography variant="h6" component="div">
              {task.title}
            </Typography>
            <Box display="flex" flexDirection="row">
              <Button size="small" onClick={handleEdit}>
                <EditIcon fontSize="small" />
              </Button>
              <Button size="small" onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
          <CardContent sx={{ p: 0, mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Chip
                label={`${task.priority} Priority`}
                sx={{
                  backgroundColor: priorityColors[task.priority]?.bg,
                  color: priorityColors[task.priority]?.color,
                  fontWeight: 'bold',
                }}
              />
              <Box display="flex" flexDirection="column" alignItems="end">
                {(task.startDatetime && task.startDatetime.isValid()) && <Typography variant="caption" color="text.secondary">
                  Start: {task.startDatetime?.format(DATE_FORMAT)}
                </Typography>}
                {(task.endDatetime && task.endDatetime.isValid()) && <Typography variant="caption" color="text.secondary">
                  End: {task.endDatetime?.format(DATE_FORMAT)}
                </Typography>}
              </Box>
            </Box>
          </CardContent>
        </TaskCard>
      )}
    </Draggable>
  );
};

export default ProjectTaskCard;