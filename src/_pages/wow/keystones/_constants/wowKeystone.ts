export enum IWowKeystoneCharacterRequestFields {
  dungeonId = 'dungeonId',
}

export enum IWowKeystoneDungeonRequestFields {
  charId = 'charId',
}

export enum IWowKeystoneSaveRequestFields {
  charId = 'charId',
  dungeonId = 'dungeonId',
  level = 'level',
  clearYn = 'clearYn',
  score = 'score',
}

export enum IWowKeystoneRefreshFields {
  seasonNo = 'seasonNo',
}

export const CURR_SEASON_NO = 17;