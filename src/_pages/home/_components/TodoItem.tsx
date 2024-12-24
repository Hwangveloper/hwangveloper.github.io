import React from "react";
import { Box, Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IHomeOutline } from "../_apis/_models/home";
import { ETaskStatus, taskCategoryOptions } from "../_constants/homeOutline";
import { ICommonPeriod } from "../../../common/_models/common";
import dayjs, { Dayjs } from "dayjs";

interface TodoItemProps {
  todo: IHomeOutline;
  toggleTodo: (id: string, check: boolean) => void;
  updateTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, updateTodo, deleteTodo }) => {

  const renderPeriod = (period: ICommonPeriod, lastDoneDatetime: Dayjs) => {

    const standardDatetime = lastDoneDatetime.add(period.period, period.unit);
    const today = dayjs();

    const diff = standardDatetime.diff(today, 'day');

    if (diff === 0) {
      return "오늘";
    }
    return standardDatetime.isBefore(today) ? `${-diff}일 지남` : `${diff}일 남음`;
  }

  return (
    <ListItem
      divider
      secondaryAction={
        <>
          <IconButton
            color="secondary"
            onClick={() => updateTodo(todo.id)}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => deleteTodo(todo.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.isChecked}
          onChange={(e) => toggleTodo(todo.id, e.target.checked)}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center">
            {/* Prefix Box */}
            <Box
              sx={{
                backgroundColor: todo.taskStatus === ETaskStatus.DONE ? "#d3d3d3" : taskCategoryOptions.find((opt) => opt.value === todo.category)?.color,
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                marginRight: '8px',
                fontWeight: 'bold',
              }}
            >
              {todo.category}
            </Box>
            {/* Text */}
            {todo.name}
          </Box>
        }
        secondary={`${renderPeriod(todo.period, todo.baseDatetime ?? todo.lastDoneDatetime ?? dayjs().subtract(todo.period.period, todo.period.unit))}(${renderPeriod(todo.maxPeriod ?? todo.period, todo.baseDatetime ?? todo.lastDoneDatetime ?? dayjs().subtract(todo.period.period, todo.period.unit))})`}
        primaryTypographyProps={{
          style: {
            color: todo.taskStatus === ETaskStatus.DONE ? "#d3d3d3" : todo.taskStatus === ETaskStatus.DONOT ? "red" : "black",
            textDecoration: todo.taskStatus === ETaskStatus.DONE ? 'line-through' : 'none',
          },
        }}
        secondaryTypographyProps={{
          style: {
            color: todo.taskStatus === ETaskStatus.DONE ? "#a3a3a3" : todo.taskStatus === ETaskStatus.DONOT ? "red" : "blue",
          },
        }}
      />
    </ListItem>
  );
};

export default TodoItem;
