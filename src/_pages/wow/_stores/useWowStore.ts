import { create } from 'zustand';
import { IWowMaster } from '../_apis/_models/wowMaster';
import { IWowCharacter, IWowCharacterMemoUpdateRequest } from '../characters/_apis/_models/wowCharacter';
import { IWowDungeon } from '../keystones/_apis/_models/wowDungeon';
import { IWowItemLevel } from '../characterItems/_apis/_models/wowCharacterItem';
import { EWowItemType } from '../characterItems/_constants/wowCharacterItem';

interface WowState {
  masterList: IWowMaster[];
  characterList: IWowCharacter[];
  dungeonList: IWowDungeon[];
  itemLevelList: IWowItemLevel[];
  getItemLevelsOfType: (type?: EWowItemType) => IWowItemLevel[];
  modifyMemo: (modified: IWowCharacterMemoUpdateRequest) => void;
}

const useWowStore = create<WowState>((set, get) => ({
  masterList: [],
  characterList: [],
  dungeonList: [],
  itemLevelList: [],

  getItemLevelsOfType: (type?: EWowItemType) => {

    const { itemLevelList } = get();

    switch (type) {
      case EWowItemType.ADVENTURER:
        return itemLevelList.slice(0, 6);
      case EWowItemType.STAGER:
        return itemLevelList.slice(4, 10);
      case EWowItemType.CHAMPION:
        return itemLevelList.slice(8, 14);
      case EWowItemType.HERO:
        return itemLevelList.slice(12, 18);
      case EWowItemType.MYTHIC:
        return itemLevelList.slice(16, 22);
      default:
        return [];
    }
  },

  modifyMemo: (modified: IWowCharacterMemoUpdateRequest) => {
    const { characterList } = get();
    set({
      characterList: characterList.map((char) => {
        if (char.id === modified.id) {
          return {
            ...char,
            modifiedMemo: modified.memo,
          };
        } else {
          return char;
        }
      })
    });
  },
}));

export default useWowStore;