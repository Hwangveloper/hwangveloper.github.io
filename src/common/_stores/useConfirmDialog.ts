import { create } from 'zustand';

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const useConfirmDialog = create<ConfirmDialogState>((set) => ({
  isOpen: false, // 초기 상태
  title: '',
  message: '',
  onConfirm: () => {
    set({isOpen: false});
  },
  onClose: () => {
    set({isOpen: false});
  },
}));

export default useConfirmDialog;