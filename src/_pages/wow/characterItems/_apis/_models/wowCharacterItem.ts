import { IWowCharacter } from "../../../characters/_apis/_models/wowCharacter";
import { EWowCharItemDataType, EWowItemPartType, EWowItemType } from "../../_constants/wowCharacterItem";

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
  charJob: string;

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

export interface IWowCharItemUpdateRequest {
  items?: IWowCharItem;
  part: EWowItemPartType;
  level: string;
  type: EWowItemType;
}

export interface IWowCharWeaponUpdateRequest {
  items?: IWowCharItem;
  thWeapon1Level: string;
  thWeapon1Type: EWowItemType;
  thWeapon2Level: string;
  thWeapon2Type: EWowItemType;
  ohWeapon1Level: string;
  ohWeapon1Type: EWowItemType;
  ohWeapon2Level: string;
  ohWeapon2Type: EWowItemType;
  ohWeapon3Level: string;
  ohWeapon3Type: EWowItemType;
  ohWeapon4Level: string;
  ohWeapon4Type: EWowItemType;
}