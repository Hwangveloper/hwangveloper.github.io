import { create } from 'zustand';
import { IProjectTask, IProjectTaskUpdateRequest } from '../_apis/_models/projectTask';
import { EProjectTaskStatus } from '../_constants/projectTask';

interface ProjectTaskUpdateModalState {
  isOpen: boolean;
  projectTask?: IProjectTask;
  taskStatus: EProjectTaskStatus;
  open: (params: {projectTask?: IProjectTask, taskStatus: EProjectTaskStatus, onConfirm?: (newTask: IProjectTaskUpdateRequest) => void}) => void;
  onConfirm: (newTask: IProjectTaskUpdateRequest) => void;
}

const useProjectTaskUpdateModalStore = create<ProjectTaskUpdateModalState>((set, get) => ({
  isOpen: false,
  projectTask: undefined,
  taskStatus: EProjectTaskStatus.BACKLOG,
  open: (params: {projectTask?: IProjectTask, taskStatus: EProjectTaskStatus, onConfirm?: (newTask: IProjectTaskUpdateRequest) => void}) => {
    set({
      isOpen: true,
      projectTask: params.projectTask,
      taskStatus: params.taskStatus,
      onConfirm: params.onConfirm,
    });
  },
  onConfirm: (newTask: IProjectTaskUpdateRequest) => {
    set({
      isOpen: false,
      projectTask: undefined,
    });
  }
}));

export default useProjectTaskUpdateModalStore;