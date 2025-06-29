export interface IWowDungeonParams {
  ignoreDelete: boolean;
}

export interface IWowDungeonResponse {
  rowIndex: number;
  id: string;
  blizzardId: number;
  name: string;
}

export interface IWowDungeon {
  rowIndex: number;
  id: string;
  blizzardId: number;
  name: string;
}