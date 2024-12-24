import { create } from 'zustand';
import { IWowMaster } from '../_apis/_models/wowMaster';
import { IWowCharacter } from '../_apis/_models/wowCharacter';
import { IWowDungeon } from '../_apis/_models/wowDungeon';

interface WowState {
  masterList: IWowMaster[];
  characterList: IWowCharacter[];
  dungeonList: IWowDungeon[];
}

const useWowStore = create<WowState>((set, get) => ({
  masterList: [],
  characterList: [],
  dungeonList: [],
}));

export default useWowStore;