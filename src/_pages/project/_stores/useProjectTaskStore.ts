import { create } from 'zustand';
import { IProjectSprint, IProjectTask } from '../_apis/_models/projectTask';
import { EProjectTaskStatus } from '../_constants/projectTask';
import dayjs from 'dayjs';
import { DATE_FORMAT, ECommonText } from '../../../common/_constants/common';

interface ProjectTaskState {
  taskList: IProjectTask[];
  sprintList: IProjectSprint[];
  currSprint: string;
  getList: (state: EProjectTaskStatus, sprint?: string) => IProjectTask[];
}

const useProjectTaskStore = create<ProjectTaskState>((set, get) => ({
  taskList: [],
  sprintList: [],
  currSprint: `${dayjs().startOf('day').subtract(4, 'day').startOf('week').add(4, 'day').format(DATE_FORMAT)}&${dayjs().startOf('day').subtract(4, 'day').startOf('week').add(10, 'day').format(DATE_FORMAT)}`,
  getList: (state: EProjectTaskStatus, sprint?: string) => {
    if (sprint && sprint !== ECommonText.ALL && state !== EProjectTaskStatus.BACKLOG) {
      const sprintStartDate = dayjs(sprint?.substring(0, sprint.indexOf('&')), DATE_FORMAT);
      const sprintEndDate = dayjs(sprint?.substring(sprint.indexOf('&')), DATE_FORMAT);
      return get().taskList.filter((row) => row.state === state && sprintStartDate.isSame(row.sprintStartDate) && sprintEndDate.isSame(row.sprintEndDate));
    } else {
      return get().taskList.filter((row) => row.state === state);
    }
  }
}));

export default useProjectTaskStore;