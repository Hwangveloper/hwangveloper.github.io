import { Dayjs } from "dayjs";
import { IWowCharacter } from "./wowCharacter";
import { IWowDungeon } from "./wowDungeon";
import { IWowMaster } from "./wowMaster";
import { EWowMasterResetType } from "../../_constants/wowMaster";
import { ECommonYN } from "../../../../common/_constants/common";

export interface IWowKeystoneParams {
  masterList: IWowMaster[];
  characterList: IWowCharacter[];
  dungeonList: IWowDungeon[];
}

export interface IWowKeystoneInitParams {
  masterList: IWowMaster[];
}

export interface IWowKeystoneResponse {
  rowIndex: number;
  id: string;
  masterId: string;
  dungeonId: string;
  lastRefreshDatetime: string;
}

export interface IWowKeystoneCharacterValuesResponse {
  [key: string]: string;
}

export interface IWowKeystone {
  rowIndex: number;
  id: string;
  masterId: string;
  dungeonId: string;
  lastRefreshDatetime: Dayjs;
  value: number;

  /** Master Info */
  type?: string;
  resetType?: EWowMasterResetType;
  firstStep?: string;
  lastStep?: string;

  /** Character Info */
  charRowIndex?: number;
  charId?: string;
  charOrder?: number;
  charName?: string;
  charJob?: string;
  charLink?: string;

  /** Dungeon Info */
  dungeonName?: string;
  dungeonPortal?: ECommonYN;
}

export interface IWowKeystoneInitResponse {
  rowIndex: number;
  id: string;
  masterId: string;
  lastRefreshDatetime: Dayjs;
}

export interface IWowKeystoneCharacterRequest {
  dungeonId: string;
}

export interface IWowKeystoneDungeonRequest {
  charId: string;
}

export interface IWowKeystoneSaveRequest {
  charId: string;
  dungeonId: string;
  level: number;
  clearYn: ECommonYN;
  score: number;
}

export interface IWowKeystoneDungeonView {
  id: string;
  clearLevel: number;
  completeLevel: number;
  dungeonName: string;
  charName: string;
  keystoneScore: number;
}

export interface IWowKeystoneCharacterView {
  id: string;
  clearLevel: number;
  completeLevel: number;
  dungeonName: string;
  charName: string;
  keystoneScore: number;
}