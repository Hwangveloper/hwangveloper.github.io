import { create } from 'zustand';
import { IWowKeystone, IWowCharacterMythicRecord } from '../_apis/_models/wowKeystone';

interface WowKeystoneState {
  isInit: boolean;
  keystoneTaskList: IWowKeystone[];
  keystoneRecordList: IWowCharacterMythicRecord[];
  addCharRecord: (record: IWowCharacterMythicRecord) => void;
}

const useWowKeystoneStore = create<WowKeystoneState>((set, get) => ({
  isInit: false,
  keystoneTaskList: [],
  keystoneRecordList: [],
  addCharRecord: (newRec: IWowCharacterMythicRecord) => {
    const { keystoneRecordList } = get();

    const recordList = keystoneRecordList.filter((record) => record.charName !== newRec.charName);
    set({
      keystoneRecordList: recordList.concat(newRec),
    });
  },
}));

export default useWowKeystoneStore;