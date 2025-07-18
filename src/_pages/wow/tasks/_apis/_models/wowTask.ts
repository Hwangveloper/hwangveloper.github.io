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
  term: string;
  isDeleted: string;
}

export interface IWowTask {
  rowIndex: number;
  id: string;
  charId: string;
  frequency: string;
  type: string;
  category: EWowTaskCategory;
  term: string;
  isDeleted: ECommonYN;
}

export interface IWowTaskSaveRequest {
  rowIndex?: number;
  id?: string;
  charId: string;
  category: string;
  frequency: string;
  type: string;
  idOrName?: string;
}