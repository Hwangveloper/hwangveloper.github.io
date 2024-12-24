import { ECommonYN } from "../../../../common/_constants/common";

export interface IWowCharacterParams {
  ignoreDelete: boolean;
}

export interface IWowCharacterResponse {
  rowIndex: number;
  id: string;
  order: string;
  isMain: string;
  name: string;
  job: string;
  tribe: string;
  server: string;
  link: string;
}

export interface IWowCharacter {
  rowIndex: number;
  id: string;
  order: number;
  isMain: ECommonYN;
  name: string;
  job: string;
  tribe: string;
  server: string;
  link: string;
}

export interface IWowCharacterOrderUpdateRequest {
  rowIndex: number;
  order: number;
}