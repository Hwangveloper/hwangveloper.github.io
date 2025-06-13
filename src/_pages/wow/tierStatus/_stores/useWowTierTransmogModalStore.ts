import { create } from 'zustand';
import { IWowTierTransmog, IWowTierTransmogUpdateRequest } from '../_apis/_models/wowTierTransmog';
import { EWowRaidType, EWowTransmogPartType } from '../_constants/wowTierTransmog';

interface WowTierTransmogModalState {
  isOpen: boolean;
  transmogs?: IWowTierTransmog;
  partType: EWowTransmogPartType;
  raidType: EWowRaidType;

  open: (params: {transmogs?: IWowTierTransmog, raidType: EWowRaidType, partType: EWowTransmogPartType, onConfirm?: (updateTransmog: IWowTierTransmogUpdateRequest) => void}) => void;
  onConfirm: (updateTransmog: IWowTierTransmogUpdateRequest) => void;
}

const useWowTierTransmogModalStore = create<WowTierTransmogModalState>((set, get) => ({
  isOpen: false,
  transmogs: undefined,
  partType: EWowTransmogPartType.HEAD,
  raidType: EWowRaidType.RAID_FINDER,

  open: (params: {transmogs?: IWowTierTransmog, raidType: EWowRaidType, partType: EWowTransmogPartType, onConfirm?: (updateTransmog: IWowTierTransmogUpdateRequest) => void}) => {
    set({
      isOpen: true,
      transmogs: params.transmogs,
      partType: params.partType,
      raidType: params.raidType,
      onConfirm: params.onConfirm,
    });
  },
  onConfirm: (updateTransmog: IWowTierTransmogUpdateRequest) => {
    set({
      isOpen: false,
      transmogs: undefined,
      partType: EWowTransmogPartType.HEAD,
      raidType: EWowRaidType.RAID_FINDER,
    });
  },
}));

export default useWowTierTransmogModalStore;