import { IWowCharacter } from "../../../characters/_apis/_models/wowCharacter";
import { EWowCollectionStatus, EWowRaidType, EWowTransmogPartType } from "../../_constants/wowTierTransmog";

export interface IWowCharTierTransmogParams {
  characterList: IWowCharacter[];
}

export interface IWowCharTierTransmogResponse {
  rowIndex: number;
  charId: string;
  raidType: EWowRaidType;
  head: string;
  shoulders: string;
  back: string;
  chest: string;
  wrist: string;
  hands: string;
  waist: string;
  legs: string;
  feet: string;
}

export interface IWowCharTierTransmog {
  charId: string;
  charName: string;
  charJob: string;

  raidTierTransmog: Map<EWowRaidType, IWowTierTransmog>;
}

export interface IWowTierTransmog {
  rowIndex: number;

  head: EWowCollectionStatus;
  shoulders: EWowCollectionStatus;
  back: EWowCollectionStatus;
  chest: EWowCollectionStatus;
  wrist: EWowCollectionStatus;
  hands: EWowCollectionStatus;
  waist: EWowCollectionStatus;
  legs: EWowCollectionStatus;
  feet: EWowCollectionStatus;
}

export interface IWowTierTransmogUpdateRequest {
  transmogs?: IWowTierTransmog;
  part: EWowTransmogPartType;
  collectionStatus: string;
}