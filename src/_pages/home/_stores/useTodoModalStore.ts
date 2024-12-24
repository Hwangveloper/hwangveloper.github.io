import { create } from 'zustand';
import { IHomeOutline, IHomeOutlineUpdateRequest } from '../_apis/_models/home';

interface TodoModalState {
  isOpen: boolean;
  todoItem?: IHomeOutline;
  open: (params: {todoItem?: IHomeOutline, onConfirm?: (newTodo: IHomeOutlineUpdateRequest) => void}) => void;
  onConfirm: (newTodo: IHomeOutlineUpdateRequest) => void;
}

const useTodoModalStore = create<TodoModalState>((set, get) => ({
  isOpen: false,
  todoItem: undefined,
  open: (params: {todoItem?: IHomeOutline, onConfirm?: (newTodo: IHomeOutlineUpdateRequest) => void}) => {
    set({
      isOpen: true,
      todoItem: params.todoItem,
      onConfirm: params.onConfirm,
    });
  },
  onConfirm: (newTodo: IHomeOutlineUpdateRequest) => {
    set({
      isOpen: false,
      todoItem: undefined,
    });
  },
}));

export default useTodoModalStore;