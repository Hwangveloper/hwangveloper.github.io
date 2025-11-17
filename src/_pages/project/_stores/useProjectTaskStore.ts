import { create } from 'zustand';
import { IProjectSprint, IProjectTask } from '../_apis/_models/projectTask';
import { EProjectTaskStatus, EProjectTaskWeight } from '../_constants/projectTask';
import dayjs from 'dayjs';
import { DATE_FORMAT, ECommonText } from '../../../common/_constants/common';

interface ProjectTaskState {
  taskList: IProjectTask[];
  sprintList: IProjectSprint[];
  currSprint: string;
  getList: (state: EProjectTaskStatus, sprint?: string) => IProjectTask[];
  getSortedList: (state: EProjectTaskStatus, sprint?: string) => IProjectTask[];
}

const useProjectTaskStore = create<ProjectTaskState>((set, get) => ({
  taskList: [],
  sprintList: [],
  currSprint: `${dayjs().startOf('day').subtract(4, 'day').startOf('week').add(4, 'day').format(DATE_FORMAT)}&${dayjs().startOf('day').subtract(4, 'day').startOf('week').add(10, 'day').format(DATE_FORMAT)}`,
  getList: (state: EProjectTaskStatus, sprint?: string) => {
    if (sprint && sprint !== ECommonText.ALL && state !== EProjectTaskStatus.BACKLOG && state !== EProjectTaskStatus.TODO) {
      const sprintStartDate = dayjs(sprint?.substring(0, sprint.indexOf('&')), DATE_FORMAT);
      const sprintEndDate = dayjs(sprint?.substring(sprint.indexOf('&')), DATE_FORMAT);
      if (state === EProjectTaskStatus.DONE) {
        return get().taskList.filter((row) => row.state === state && sprintStartDate.isSame(row.sprintStartDate) && sprintEndDate.isSame(row.sprintEndDate));
      } else {
        return get().taskList.filter((row) => row.state === state && ((sprintStartDate.isSame(row.sprintStartDate) && sprintEndDate.isSame(row.sprintEndDate)) || (!row.sprintStartDate || !row.sprintEndDate)));
      }
    } else {
      return get().taskList.filter((row) => row.state === state);
    }
  },
  getSortedList: (state: EProjectTaskStatus, sprint?: string) => {
    const { getList } = get();

    const list = getList(state, sprint);

    return list.sort((left, right) => {

      // 스프린트 포함여부 내림차순
      if ((left.sprintStartDate && left.sprintEndDate) && (!right.sprintStartDate || !right.sprintEndDate)) {
        return -1;
      } else if ((!left.sprintStartDate || !left.sprintEndDate) && (right.sprintStartDate && right.sprintEndDate)) {
        return 1;
      }

      // 태스크 분량 내림차순
      if (left.weight !== right.weight) {
        if (left.weight === EProjectTaskWeight.HIGH || (left.weight === EProjectTaskWeight.MEDIUM && right.weight === EProjectTaskWeight.LOW)) {
          return -1;
        } else if (left.weight === EProjectTaskWeight.LOW || (left.weight === EProjectTaskWeight.MEDIUM && right.weight === EProjectTaskWeight.HIGH)) {
          return 1;
        }
      }

      // 프로젝트 오름차순
      if (left.projectId < right.projectId) {
        return -1;
      } else if (left.projectId > right.projectId) {
        return 1;
      }

      // 완료일자 내림차순
      if (left.endDatetime && right.endDatetime) {
        if (left.endDatetime.isAfter(right.endDatetime)) {
          return -1;
        } else if (left.endDatetime.isBefore(right.endDatetime)) {
          return 1;
        }
      }

      // 시작일자 내림차순
      if (left.startDatetime && right.startDatetime) {
        if (left.startDatetime.isAfter(right.startDatetime)) {
          return -1;
        } else if (left.startDatetime.isBefore(right.startDatetime)) {
          return 1;
        }
      }

      // 프로젝트ID(생성일자) 내림차순
      if (left.id > right.id) {
        return -1;
      } else if (left.id < right.id) {
        return 1;
      }
      
      return 0;
    });
  }
}));

export default useProjectTaskStore;