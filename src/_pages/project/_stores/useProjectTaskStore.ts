import { create } from 'zustand';
import { IProjectTask } from '../_apis/_models/projectTask';
import { EProjectTaskStatus } from '../_constants/projectTask';

interface ProjectTaskState {
  taskList: IProjectTask[];
  getList: (state: EProjectTaskStatus) => IProjectTask[];
}

const useProjectTaskStore = create<ProjectTaskState>((set, get) => ({
  taskList: [],
  getList: (state: EProjectTaskStatus) => {
    return get().taskList.filter((row) => row.state === state);
  }
}));

export default useProjectTaskStore;