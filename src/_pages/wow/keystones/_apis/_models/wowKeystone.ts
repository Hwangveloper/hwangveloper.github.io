import { Dayjs } from "dayjs";
import { IWowCharacter } from "../../../characters/_apis/_models/wowCharacter";
import { IWowDungeon } from "./wowDungeon";
import { IWowMaster } from "../../../_apis/_models/wowMaster";
import { EWowMasterResetType } from "../../../_constants/wowMaster";
import { ECommonYN } from "../../../../../common/_constants/common";

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
  firstStep?: number;
  lastStep?: number;

  /** Character Info */
  charRowIndex?: number;
  charId?: string;
  charOrder?: number;
  charName?: string;
  charJob?: string;
  charLink?: string;

  /** Dungeon Info */
  dungeonName?: string;
  blizzardDungeonId?: number;
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
  levelFirstStep: number;
  levelLastStep: number;
  dungeonName: string;
  charName: string;
  keystoneScore: number;
  scoreFirstStep: number;
  scoreLastStep: number;
}

export interface IWowKeystoneCharacterView {
  id: string;
  clearLevel: number;
  completeLevel: number;
  levelFirstStep: number;
  levelLastStep: number;
  dungeonName: string;
  charName: string;
  keystoneScore: number;
  scoreFirstStep: number;
  scoreLastStep: number;
}

export interface IWowKeystoneRecordView {
  charId: string;
  charName: string;
  server: string;
  keystoneScore: number;
  scoreFirstStep: number;
  scoreLastStep: number;

  dungeonRecords: IWowKeystoneDungeonRecord[];
}

export interface IWowKeystoneDungeonRecord {
  dungeonId: string;
  clearLevel: number;
  completeLevel: number;
  levelFirstStep: number;
  levelLastStep: number;
  isFavorite: boolean;
}

export interface IWowMythicDungeonRecordParams {
  realm: string;
  charName: string;
  seasonNo: number;
  dungeonList: IWowDungeon[];
}

export interface IWowCharacterMythicRecordResponse {
  character: {
    name: string;
    realm: {
      name: string;
      slug: string;
    }
  }
  current_mythic_rating: {
    rating: number;
  }
  current_period: {
    best_runs?: {
      dungeon: {
        name: string;
        id: number;
      }
      is_completed_within_time: boolean;
      keystone_level: number;
    }[];
  }
}

export interface IWowCharacterSeasonRecordResponse {
  best_runs?: {
    keystone_level: number;
    dungeon: {
      id: number;
      name: string;
    }
    is_completed_within_time: boolean;
    mythic_rating: {
      rating: number
    }
    duration: number;
  }[];
}

export interface IWowCharacterMythicRecord {
  charId: string;
  charName: string;
  charRealm: string;
  mythicRating: number;
  currRuns: IWowCharacterMythicRun[];
  seasonRecords: IWowCharacterSeasonRecord[];
}

export interface IWowCharacterMythicRun {
  dungeonName: string;
  isClear: boolean;
  level: number;
}

export interface IWowCharacterSeasonRecord {
  dungeonId: string;
  blizzardDungeonId: number;
  dungeonName: string;
  clearLevel: number;
  completeLevel: number;

}