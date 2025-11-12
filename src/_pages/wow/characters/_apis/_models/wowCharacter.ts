import { ECommonYN } from "../../../../../common/_constants/common";

export interface IWowCharacterParams {
  ignoreDelete: boolean;
}

export interface IWowUserInfoResponse {
  wow_accounts: {
    characters: IWowUserInfoCharacterResponse[];
  }[];
}

export interface IWowUserInfoCharacterResponse {
  id: number;
  name: string;
  realm: {
    slug: string;
  }
  playable_class: {
    name: string;
  }
  playable_race: {
    name: string;
  }
  faction: {
    name: string;
  }
}

export interface IWowCharacterResponse {
  rowIndex: number;
  id: string;
  order: string;
  isMain: string;
  memo: string;
  name: string;
  job: string;
  tribe: string;
  server: string;
  faction: string;
  link: string;
}

export interface IWowCharacter {
  rowIndex: number;
  id: string;
  order: number;
  isMain: ECommonYN;
  memo: string;
  modifiedMemo?: string;

  blizzardId: number;
  name: string;
  job: string;
  tribe: string;
  server: string;
}

export interface IWowCharacterOrderUpdateRequest {
  rowIndex: number;
  order: number;
}

export interface IWowCharacterMemoUpdateRequest {
  rowIndex: number;
  memo: string;
}