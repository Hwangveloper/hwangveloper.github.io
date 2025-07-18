import { create } from 'zustand';

interface SimpleTextInputDialogState {
  isOpen: boolean;
  title: string;
  name: string;
  onConfirm: (value: string) => void;
  onClose: () => void;
}

const useSimpleTextInputDialog = create<SimpleTextInputDialogState>((set) => ({
  isOpen: false, // 초기 상태
  title: '',
  name: '',
  onConfirm: (value: string) => {},
  onClose: () => {
    set({isOpen: false});
  }
}));

export default useSimpleTextInputDialog;