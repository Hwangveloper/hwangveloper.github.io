import { create } from 'zustand';
import { IWowCharacter, IWowCharacterMemoUpdateRequest } from '../_apis/_models/wowCharacter';

interface WowCharMemoModalState {
  isOpen: boolean;
  char?: IWowCharacter;

  open: (params: {char?: IWowCharacter, onConfirm?: (updateMemo: IWowCharacterMemoUpdateRequest) => void}) => void;
  onConfirm: (updateMemo: IWowCharacterMemoUpdateRequest) => void;
}

const useWowCharMemoModalStore = create<WowCharMemoModalState>((set, get) => ({
  isOpen: false,
  char: undefined,

  open: (params: {char?: IWowCharacter, onConfirm?: (updateMemo: IWowCharacterMemoUpdateRequest) => void}) => {
    set({
      isOpen: true,
      char: params.char,
      onConfirm: params.onConfirm,
    });
  },
  onConfirm: (updateMemo: IWowCharacterMemoUpdateRequest) => {
    set({
      isOpen: false,
      char: undefined,
    });
  },
}));

export default useWowCharMemoModalStore;