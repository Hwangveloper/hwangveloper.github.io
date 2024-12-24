import { create } from 'zustand';

interface SimpleDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const useSimpleDialog = create<SimpleDialogState>((set) => ({
  isOpen: false, // 초기 상태
  title: '',
  message: '',
  onClose: () => {
    set({isOpen: false});
  }
}));

export default useSimpleDialog;