import { create } from 'zustand';

interface LoaderState {
  isLoading: boolean;
}

const useLoader = create<LoaderState>((set) => ({
  isLoading: false, // 초기 상태
}));

export default useLoader;