import { Dayjs } from "dayjs";
import { EProjectTaskPriority, EProjectTaskStatus, EProjectTaskType } from "../../_constants/projectTask";
import { IProject } from "./project";
import { ECommonYN } from "../../../../common/_constants/common";

export interface IProjectTaskParams {
  projectList: IProject[];
  ignoreDelete: boolean;
}

export interface IProjectTaskResponse {
  rowIndex: number;
  id: string;
  projectId: string;
  prevTaskId: string;
  type: string;
  label: string;
  priority: string;
  title: string;
  description: string;
  state: string;
  startDatetime: string;
  endDatetime: string;
  isDelete: string;
}

export interface IProjectTask {
  rowIndex: number;
  id: string;
  projectId: string;
  prevTaskId: string;
  type: EProjectTaskType;
  label: string;
  priority: EProjectTaskPriority;
  title: string;
  description: string;
  state: EProjectTaskStatus;
  startDatetime?: Dayjs;
  endDatetime?: Dayjs;
  isDelete: ECommonYN;

  projectTitle?: string;
}

export interface IProjectTaskColumn {
  id: EProjectTaskStatus;
  title: string;
}

export interface IProjectTaskUpdateRequest {
  rowIndex?: number;
  id?: string;
  projectId: string;
  prevTaskId: string;
  type: string;
  label: string;
  priority: string;
  title: string;
  description: string;
  state: string;
  startDatetime?: Dayjs;
  endDatetime?: Dayjs;
  isDelete: ECommonYN;
}

export interface IProjectTaskStateUpdateRequest {
  rowIndex: number;
  state: EProjectTaskStatus;
  startDatetime?: Dayjs;
  endDatetime?: Dayjs;
}

export interface IProjectTaskDeleteRequest {
  rowIndex: number;
}