import { create } from 'zustand';
import { IProjectTask } from '../_apis/_models/projectTask';
import { EProjectTaskStatus } from '../_constants/projectTask';
import dayjs from 'dayjs';

interface ProjectTaskState {
  taskList: IProjectTask[];
  getList: (state: EProjectTaskStatus, isWeekly?: boolean) => IProjectTask[];
}

const useProjectTaskStore = create<ProjectTaskState>((set, get) => ({
  taskList: [],
  getList: (state: EProjectTaskStatus, isWeekly?: boolean) => {
    const today = dayjs();
    if (isWeekly) {
      return get().taskList.filter((row) => row.state === state && (row.endDatetime?.diff(today, 'week') ?? 0) >= -1)
    } else {
      return get().taskList.filter((row) => row.state === state);
    }
  }
}));

export default useProjectTaskStore;