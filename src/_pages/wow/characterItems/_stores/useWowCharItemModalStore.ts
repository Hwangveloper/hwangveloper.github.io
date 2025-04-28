import { create } from 'zustand';
import { EWowItemPartType } from '../_constants/wowCharacterItem';
import { IWowCharItem, IWowCharItemUpdateRequest } from '../_apis/_models/wowCharacterItem';

interface WowCharItemModalState {
  isOpen: boolean;
  items?: IWowCharItem;
  itemPartType: EWowItemPartType;

  open: (params: {items?: IWowCharItem, itemPartType: EWowItemPartType, onConfirm?: (updateItem: IWowCharItemUpdateRequest) => void}) => void;
  onConfirm: (updateItem: IWowCharItemUpdateRequest) => void;
}

const useWowCharItemModalStore = create<WowCharItemModalState>((set, get) => ({
  isOpen: false,
  charId: '',
  items: undefined,
  itemPartType: EWowItemPartType.UNDEFINED,

  open: (params: {items?: IWowCharItem, itemPartType: EWowItemPartType, onConfirm?: (updateItem: IWowCharItemUpdateRequest) => void}) => {
    set({
      isOpen: true,
      items: params.items,
      itemPartType: params.itemPartType,
      onConfirm: params.onConfirm,
    });
  },
  onConfirm: (updateItem: IWowCharItemUpdateRequest) => {
    set({
      isOpen: false,
      items: undefined,
      itemPartType: EWowItemPartType.UNDEFINED,
    });
  },
}));

export default useWowCharItemModalStore;