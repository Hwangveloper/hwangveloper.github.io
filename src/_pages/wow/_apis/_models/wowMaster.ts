import { EWowMasterCategory, EWowMasterResetType } from "../../_constants/wowMaster";

export interface IWowMasterParams {
  ignoreDelete: boolean;
}

export interface IWowMasterResponse {
  rowIndex: number;
  id: string;
  category: string;
  subcategory: string;
  name: string;
  type: string;
  resetType: string;
  firstStep: string;
  lastStep: string;
}

export interface IWowMaster {
  rowIndex: number;
  id: string;
  category: EWowMasterCategory;
  subcategory: string;
  name: string;
  type: string;
  resetType: EWowMasterResetType;
  firstStep: string;
  lastStep: string;
}