import { create } from 'zustand';
import { IHomeOutline } from '../_apis/_models/home';
import { EDataState } from '../_constants/homeOutline';

interface HomeState {
  outlineList: IHomeOutline[];
  setCheck: (id: string, check: boolean) => void;
}

const useHomeStore = create<HomeState>((set, get) => ({
  outlineList: [],
  setCheck: (id: string, check: boolean) => {
    const { outlineList } = get();
    set({
      outlineList: outlineList.map((row) => ({
        ...row,
        isChecked: row.id === id ? check : row.isChecked,
        dataState: (row.id === id && row.dataState === EDataState.NONE) ? EDataState.UPDATED : row.dataState,
      }))
    });
  },
}));

export default useHomeStore;