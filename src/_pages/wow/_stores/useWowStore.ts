import { create } from 'zustand';
import { IWowMaster } from '../_apis/_models/wowMaster';
import { IWowCharacter } from '../characters/_apis/_models/wowCharacter';
import { IWowDungeon } from '../keystones/_apis/_models/wowDungeon';
import { IWowItemLevel } from '../characterItems/_apis/_models/wowCharacterItem';
import { EWowItemType } from '../characterItems/_constants/wowCharacterItem';

interface WowState {
  masterList: IWowMaster[];
  characterList: IWowCharacter[];
  dungeonList: IWowDungeon[];
  itemLevelList: IWowItemLevel[];
  getItemLevelsOfType: (type?: EWowItemType) => IWowItemLevel[];
  modifyMemo: (charId: string, newMemo: string) => void;
}

const useWowStore = create<WowState>((set, get) => ({
  masterList: [],
  characterList: [],
  dungeonList: [],
  itemLevelList: [],

  getItemLevelsOfType: (type?: EWowItemType) => {

    const { itemLevelList } = get();

    switch (type) {
      case EWowItemType.STAGER:
        return itemLevelList.slice(0, 8);
      case EWowItemType.CHAMPION:
        return itemLevelList.slice(4, 12);
      case EWowItemType.HERO:
        return itemLevelList.slice(8, 16);
      case EWowItemType.MYTHIC:
        return itemLevelList.slice(12, 20);
      default:
        return [];
    }
  },

  modifyMemo: (charId: string, modifiedMemo: string) => {
    const { characterList } = get();
    set({
      characterList: characterList.map((char) => {
        if (char.id === charId) {
          return {
            ...char,
            modifiedMemo: char.memo === modifiedMemo ? undefined : modifiedMemo,
          };
        } else {
          return char;
        }
      })
    });
  },
}));

export default useWowStore;