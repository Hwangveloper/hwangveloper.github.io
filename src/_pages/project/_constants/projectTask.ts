export enum EProjectTaskType {
  PLANNING = 'PLANNING',
  FEATURE = 'FEATURE',
  FIX = 'FIX',
}

export enum EProjectTaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
  BACKLOG = 'BACKLOG',
}

export enum EProjectTaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum EProjectTaskSaveRequestFields {
  projectId = 'projectId',
  prevTaskId = 'prevTaskId',
  type = 'type',
  label = 'label',
  priority = 'priority',
  title = 'title',
  description = 'description',
  state = 'state',
  startDatetime = 'startDatetime',
  endDatetime = 'endDatetime',
}

export const taskStatusOptions = [
  {
    label: "To Do",
    value: EProjectTaskStatus.TODO,
    color: "primary.light",
  },
  {
    label: "Doing",
    value: EProjectTaskStatus.DOING,
    color: "secondary.main",
  },
  {
    label: "Done",
    value: EProjectTaskStatus.DONE,
    color: "info.main",
  },
  {
    label: "Backlog",
    value: EProjectTaskStatus.BACKLOG,
    color: "success.main",
  },
];

export const projectTaskTypeOptions = [
  {
    label: "계획",
    value: EProjectTaskType.PLANNING,
    color: "primary.main",
  },
  {
    label: "신규",
    value: EProjectTaskType.FEATURE,
    color: "secondary.main",
  },
  {
    label: "수정",
    value: EProjectTaskType.FIX,
    color: "success.main",
  },
];

export const taskPriorityOptions = [
  {
    label: "높음",
    value: EProjectTaskPriority.HIGH,
    color: "primary.main",
  },
  {
    label: "중간",
    value: EProjectTaskPriority.MEDIUM,
    color: "secondary.main",
  },
  {
    label: "낮음",
    value: EProjectTaskPriority.LOW,
    color: "success.main",
  },
];