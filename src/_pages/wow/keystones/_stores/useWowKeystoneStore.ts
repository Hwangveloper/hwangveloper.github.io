import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IWowKeystone, IWowCharacterMythicRecord } from '../_apis/_models/wowKeystone';
import { CURR_SEASON_NO } from '../_constants/wowKeystone';

interface WowKeystoneState {
  isInit: boolean;
  currSeasonNo: number;
  keystoneTaskList: IWowKeystone[];
  keystoneRecordList: IWowCharacterMythicRecord[];
  setCurrSeasonNo: (seasonNo: number) => void;
  addCharRecord: (record: IWowCharacterMythicRecord) => void;
}

const useWowKeystoneStore = create<WowKeystoneState>()(
  persist(
    (set, get) => ({
      isInit: false,
      currSeasonNo: CURR_SEASON_NO,
      keystoneTaskList: [],
      keystoneRecordList: [],
      setCurrSeasonNo: (seasonNo: number) => {
        set({
          currSeasonNo: seasonNo
        });
      },
      addCharRecord: (newRec: IWowCharacterMythicRecord) => {
        const { keystoneRecordList } = get();

        const recordList = keystoneRecordList.filter(
          (record) => record.charName !== newRec.charName
        );

        set({
          keystoneRecordList: recordList.concat(newRec),
        });
      },
    }),
    {
      name: 'wow-curr-season-no',

      partialize: (state) => ({
        currSeasonNo: state.currSeasonNo,
      }),
    }
  )
)

export default useWowKeystoneStore;