import { create } from 'zustand';
import { IWowCharItem, IWowCharWeaponUpdateRequest } from '../_apis/_models/wowCharacterItem';

interface WowCharWeaponModalState {
  isOpen: boolean;
  items?: IWowCharItem;

  open: (params: {items?: IWowCharItem, onConfirm?: (updateWeapons: IWowCharWeaponUpdateRequest) => void}) => void;
  onConfirm: (updateWeapons: IWowCharWeaponUpdateRequest) => void;
}

const useWowCharWeaponModalStore = create<WowCharWeaponModalState>((set, get) => ({
  isOpen: false,
  items: undefined,

  open: (params: {items?: IWowCharItem, onConfirm?: (updateWeapons: IWowCharWeaponUpdateRequest) => void}) => {
    set({
      isOpen: true,
      items: params.items,
      onConfirm: params.onConfirm,
    });
  },
  onConfirm: (updateWeapons: IWowCharWeaponUpdateRequest) => {
    set({
      isOpen: false,
      items: undefined,
    });
  },
}));

export default useWowCharWeaponModalStore;