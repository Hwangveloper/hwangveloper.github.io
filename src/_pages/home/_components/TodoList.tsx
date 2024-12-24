import React, { useEffect } from "react";
import { Typography, IconButton, Box, Paper, List } from "@mui/material";
import useGoogleApiStore from "../../../common/_stores/useGoogleApiStore";
import { useShallow } from "zustand/shallow";
import useHomeStore from "../_stores/useHomeStore";
import useHomeOutlineQuery from "../_apis/_queries/useHomeOutlineQuery";
import useHomeOutlineCheckUpdateMutation from "../_apis/_mutations/useHomeOutlineCheckUpdateMutation";
import { EDataState } from "../_constants/homeOutline";
import useLoader from "../../../common/_stores/useLoader";
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import TodoItem from "./TodoItem";
import UpdateTodoModal from "./UpdateTodoModal";
import useTodoModalStore from "../_stores/useTodoModalStore";
import useHomeOutlineUpdateMutation from "../_apis/_mutations/useHomeOutlineUpdateMutation";
import useHomeOutlineDeleteMutation from "../_apis/_mutations/useHomeOutlineDeleteMutation";
import dayjs from "dayjs";

const TodoList: React.FC = () => {

  const { authStatus } = useGoogleApiStore(
    useShallow((state) => ({
      authStatus: state.authStatus,
    }))
  );

  const { outlineList } = useHomeStore(
    useShallow((state) => ({
      outlineList: state.outlineList,
    }))
  );

  const { data, isFetched, isFetching, refetch } = useHomeOutlineQuery(authStatus ? { ignoreDelete: true } : undefined);
  const { mutateAsync: updateCheck } = useHomeOutlineCheckUpdateMutation();
  const { mutateAsync: updateItem } = useHomeOutlineUpdateMutation();
  const { mutateAsync: deleteItem } = useHomeOutlineDeleteMutation();

  const handleRefresh = () => {
    refetch();
  }

  const handleSave = () => {
    updateCheck(
      {
        updateList: outlineList.filter((data) => data.dataState === EDataState.UPDATED).map((data) => {
          let nextBaseDatetime = data.baseDatetime?.add(data.period.period, data.period.unit);
          if (dayjs().diff(nextBaseDatetime) > 0) {
            nextBaseDatetime = data.baseDatetime;
          }
          return {
            rowIndex: data.rowIndex,
            isChecked: data.isChecked,
            nextBaseDatetime: nextBaseDatetime,
          };
        }),
      },
      {
        onSuccess: (res) => {
          refetch();
        }
      }
    );
  }

  const handleAdd = () => {
    useTodoModalStore.getState().open({
      onConfirm: (newTodo) => {
        updateItem(
          {
            item: newTodo,
          },
          {
            onSuccess: (res) => {
              refetch();
            }
          }
        );
      }
    });
  }

  const toggleTodo = (id: string, check: boolean) => {
    useHomeStore.getState().setCheck(id, check);
  }

  const updateTodo = (id: string) => {
    useTodoModalStore.getState().open({
      todoItem: outlineList.find((item) => item.id === id),
      onConfirm: (newTodo) => {
        updateItem(
          {
            item: newTodo,
          },
          {
            onSuccess: (res) => {
              refetch();
            }
          }
        );
      }
    });
  }

  const deleteTodo = (id: string) => {
    deleteItem(
      {
        deleteItem: outlineList.find((item) => item.id === id)
      },
      {
        onSuccess: (res) => {
          refetch();
        }
      }
    );
  }

  useEffect(() => {
    if (data && isFetched && !isFetching) {
      useHomeStore.setState({
        outlineList: data,
      });
    }
  }, [data, isFetched, isFetching]);

  useEffect(() => {
    useLoader.setState({ isLoading: isFetching });
  }, [isFetching]);

  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: 500,
        margin: "20px auto",
        padding: 16,
      }}
    >
      <Box display="flex" flexDirection="row-reverse">
        <IconButton 
          color="primary" 
          onClick={handleRefresh} 
          aria-label="refresh"
        >
          <RefreshIcon />
        </IconButton>
        {outlineList.some((item) => item.dataState === EDataState.UPDATED) &&
          <IconButton 
            color="primary" 
            onClick={handleSave} 
            aria-label="save"
          >
            <SaveIcon />
          </IconButton>
        }
        <IconButton
          color="primary" // 아이콘 버튼 색상
          onClick={handleAdd} // 클릭 이벤트 핸들러
          aria-label="add"
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        할 일
      </Typography>
      <List>
        {outlineList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </List>
      <UpdateTodoModal />
    </Paper>
  );
};

export default TodoList;
