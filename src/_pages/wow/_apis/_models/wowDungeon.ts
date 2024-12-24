import { ECommonYN } from "../../../../common/_constants/common";

export interface IWowDungeonParams {
  ignoreDelete: boolean;
}

export interface IWowDungeonResponse {
  rowIndex: number;
  id: string;
  name: string;
  portal: string;
}

export interface IWowDungeon {
  rowIndex: number;
  id: string;
  name: string;
  portal: ECommonYN;
}