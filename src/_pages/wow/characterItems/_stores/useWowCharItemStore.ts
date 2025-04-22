import { create } from 'zustand';
import { IWowCharItem } from '../_apis/_models/wowCharacterItem';

interface WowCharItemState {
  charItemList: IWowCharItem[];
}

const useWowCharItemStore = create<WowCharItemState>((set, get) => ({
  charItemList: [],
}));

export default useWowCharItemStore;