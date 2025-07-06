import { ECommonYN } from "../../../../../common/_constants/common";
import { EWowTaskCategory } from "../../_constants/wowTask";

export interface IWowTaskParams {
  ignoreDelete: boolean;
}

export interface IWowTaskResponse {
  rowIndex: number;
  id: string;
  charId: string;
  frequency: string;
  type: string;
  category: string;
  blizzardId: number;
  isDeleted: string;
}

export interface IWowTask {
  rowIndex: number;
  id: string;
  charId: string;
  frequency: string;
  type: string;
  category: EWowTaskCategory;
  blizzardId: number;
  isDeleted: ECommonYN;
}

export interface IWowTaskSaveRequest {
  rowIndex?: number;
  id?: string;
  charId: string;
  category: string;
  frequency: string;
  type: string;
  blizzardId?: number;
}