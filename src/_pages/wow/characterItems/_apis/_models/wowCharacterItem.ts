import { IWowCharacter } from "../../../characters/_apis/_models/wowCharacter";
import { EWowCharItemDataType, EWowItemType } from "../../_constants/wowCharacterItem";

export interface IWowItemLevelParams {
}

export interface IWowItemLevel {
  rowIndex: number;
  level: number;
  itemLevel: string;
}

export interface IWowCharItemParams {
  characterList: IWowCharacter[];
}

export interface IWowCharItemResponse {
  rowIndex: number;
  charId: string;
  dataType: EWowCharItemDataType;
  thWeapon1: string;
  thWeapon2: string;
  ohWeapon1: string;
  ohWeapon2: string;
  ohWeapon3: string;
  ohWeapon4: string;
  head: string;
  neck: string;
  shoulders: string;
  back: string;
  chest: string;
  wrist: string;
  hands: string;
  waist: string;
  legs: string;
  feet: string;
  ring1: string;
  ring2: string;
  trinket1: string;
  trinket2: string;
}

export interface IWowCharItem {
  charId: string;
  charName: string;

  levelRowIndex: number;
  typeRowIndex: number;
  thWeapon1: IWowItem;
  thWeapon2: IWowItem;
  ohWeapon1: IWowItem;
  ohWeapon2: IWowItem;
  ohWeapon3: IWowItem;
  ohWeapon4: IWowItem;
  head: IWowItem;
  neck: IWowItem;
  shoulders: IWowItem;
  back: IWowItem;
  chest: IWowItem;
  wrist: IWowItem;
  hands: IWowItem;
  waist: IWowItem;
  legs: IWowItem;
  feet: IWowItem;
  ring1: IWowItem;
  ring2: IWowItem;
  trinket1: IWowItem;
  trinket2: IWowItem;
}

export interface IWowItem {
  level: string;
  type: EWowItemType;
}

// export interface IWowKeystoneCharacterValuesResponse {
//   [key: string]: string;
// }

// export interface IWowKeystone {
//   rowIndex: number;
//   id: string;
//   masterId: string;
//   dungeonId: string;
//   lastRefreshDatetime: Dayjs;
//   value: number;

//   /** Master Info */
//   type?: string;
//   resetType?: EWowMasterResetType;
//   firstStep?: number;
//   lastStep?: number;

//   /** Character Info */
//   charRowIndex?: number;
//   charId?: string;
//   charOrder?: number;
//   charName?: string;
//   charJob?: string;
//   charLink?: string;

//   /** Dungeon Info */
//   dungeonName?: string;
//   dungeonPortal?: ECommonYN;
// }

// export interface IWowKeystoneInitResponse {
//   rowIndex: number;
//   id: string;
//   masterId: string;
//   lastRefreshDatetime: Dayjs;
// }

// export interface IWowKeystoneCharacterRequest {
//   dungeonId: string;
// }

// export interface IWowKeystoneDungeonRequest {
//   charId: string;
// }

// export interface IWowKeystoneSaveRequest {
//   charId: string;
//   dungeonId: string;
//   level: number;
//   clearYn: ECommonYN;
//   score: number;
// }

// export interface IWowKeystoneDungeonView {
//   id: string;
//   clearLevel: number;
//   completeLevel: number;
//   levelFirstStep: number;
//   levelLastStep: number;
//   dungeonName: string;
//   charName: string;
//   keystoneScore: number;
//   scoreFirstStep: number;
//   scoreLastStep: number;
// }

// export interface IWowKeystoneCharacterView {
//   id: string;
//   clearLevel: number;
//   completeLevel: number;
//   levelFirstStep: number;
//   levelLastStep: number;
//   dungeonName: string;
//   charName: string;
//   keystoneScore: number;
//   scoreFirstStep: number;
//   scoreLastStep: number;
// }