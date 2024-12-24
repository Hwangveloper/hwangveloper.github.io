import { ECommonYN } from "../../../../common/_constants/common";
import { EProjectBaseCode } from "../../_constants/project";

export interface IProjectParams {
  ignoreHide: boolean;
}

export interface IProjectResponse {
  rowIndex: number;
  id: string;
  baseCode: string;
  title: string;
  description: string;
  showYn: string;
}

export interface IProject {
  rowIndex: number;
  id: string;
  baseCode: EProjectBaseCode;
  title: string;
  description: string;
  showYn: ECommonYN;
}