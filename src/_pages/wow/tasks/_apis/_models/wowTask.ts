import { ECommonYN } from "../../../../../common/_constants/common";
import { IWowCharacter } from "../../../characters/_apis/_models/wowCharacter";
import { EWowTaskCategory } from "../../_constants/wowTask";

export interface IWowTaskParams {
  characterList: IWowCharacter[];
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
  description: string;
  reference: string; 
}

export interface IWowTask {
  rowIndex: number;
  id: string;
  
  charId: string;
  charName: string;
  charJob: string;

  frequency: string;
  type: string;
  category: EWowTaskCategory;
  term: string;
  isDeleted: ECommonYN;
  description: string;
  reference: string;
}

export interface IWowTaskSaveRequest {
  rowIndex?: number;
  id?: string;
  charId: string;
  category: string;
  frequency: string;
  type: string;
  idOrName?: string;
  description: string;
  reference: string;
}