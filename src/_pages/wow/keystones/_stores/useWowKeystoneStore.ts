import { create } from 'zustand';
import { IWowKeystone } from '../_apis/_models/wowKeystone';

interface WowKeystoneState {
  isInit: boolean;
  keystoneTaskList: IWowKeystone[];
}

const useWowKeystoneStore = create<WowKeystoneState>((set, get) => ({
  isInit: false,
  keystoneTaskList: [],
}));

export default useWowKeystoneStore;