import { create } from 'zustand';
import { IWowCharTierTransmog } from '../_apis/_models/wowTierTransmog';

interface WowTierTransmogState {
  charTierTransmogList: IWowCharTierTransmog[];
}

const useWowTierTransmogStore = create<WowTierTransmogState>((set, get) => ({
  charTierTransmogList: [],
}));

export default useWowTierTransmogStore;