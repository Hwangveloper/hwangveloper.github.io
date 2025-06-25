export enum EProjectTaskType {
  PLANNING = 'PLANNING',
  DESIGN = 'DESIGN',
  DEVELOPMENT = 'DEVELOPMENT',
  TEST_FIX = 'TEST_FIX',
}

export enum EProjectTaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
  BACKLOG = 'BACKLOG',
}

export enum EProjectTaskWeight {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum EProjectTaskSaveRequestFields {
  projectId = 'projectId',
  prevTaskId = 'prevTaskId',
  type = 'type',
  label = 'label',
  weight = 'weight',
  title = 'title',
  description = 'description',
  state = 'state',
  startDatetime = 'startDatetime',
  endDatetime = 'endDatetime',
  sprintStartDate = 'sprintStartDate',
  sprintEndDate = 'sprintEndDate',
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
    label: "기획",
    value: EProjectTaskType.PLANNING,
    color: "success.main",
  },
  {
    label: "디자인",
    value: EProjectTaskType.DESIGN,
    color: "secondary.main",
  },
  {
    label: "개발",
    value: EProjectTaskType.DEVELOPMENT,
    color: "primary.main",
  },
  {
    label: "테스트&수정",
    value: EProjectTaskType.TEST_FIX,
    color: "warning.main",
  },
];

export const taskWeightOptions = [
  {
    label: "높음",
    value: EProjectTaskWeight.HIGH,
    color: "primary.main",
  },
  {
    label: "중간",
    value: EProjectTaskWeight.MEDIUM,
    color: "secondary.main",
  },
  {
    label: "낮음",
    value: EProjectTaskWeight.LOW,
    color: "success.main",
  },
];