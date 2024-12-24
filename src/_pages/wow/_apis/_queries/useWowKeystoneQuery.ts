import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { WOW_KEYSTONE_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import { IWowKeystone, IWowKeystoneCharacterValuesResponse, IWowKeystoneParams, IWowKeystoneResponse } from "../_models/wowKeystone";
import { EWowMasterCategory, EWowMasterResetType } from "../../_constants/wowMaster";
import dayjs from "dayjs";
import { ECommonYN } from "../../../../common/_constants/common";


export const useWowKeystoneQuery = (params?: IWowKeystoneParams) => {
  return useQuery<IWowKeystone[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: WOW_KEYSTONE_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IWowKeystoneResponse & IWowKeystoneCharacterValuesResponse>(response.result.values), params);
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: (IWowKeystoneResponse & IWowKeystoneCharacterValuesResponse)[] | undefined, params?: IWowKeystoneParams) => {

  const masters = params?.masterList.filter((master) => master.category === EWowMasterCategory.KEYSTONE);
  const dungeons = params?.dungeonList;
  const mainChars = params?.characterList.filter((char) => char.isMain === ECommonYN.Y);

  let list: IWowKeystone[] = [];

  res?.forEach((data) => {

    const master = masters?.find((master) => master.id === data.masterId);
    const dungeon = dungeons?.find((dungeon) => dungeon.id === data.dungeonId);

    mainChars?.forEach((char) => {
      list.push({
        ...data,
        lastRefreshDatetime: data.lastRefreshDatetime ? dayjs(data.lastRefreshDatetime) : dayjs(),
        value: Number(data[char.id]),
        /** Master Info */
        type: master?.type,
        resetType: master?.resetType,
        firstStep: master?.firstStep,
        lastStep: master?.lastStep,

        /** Character Info */
        charRowIndex: char.rowIndex,
        charId: char.id,
        charName: char.name,
        charJob: char.job,
        charLink: char.link,
        charOrder: char.order,

        /** Dungeon Info */
        dungeonName: dungeon?.name,
        dungeonPortal: dungeon?.portal,
      });
    });
  });

  return list.map((data) => {

    if (data.resetType !== EWowMasterResetType.manual) {
      const diffUnit: Exclude<EWowMasterResetType, EWowMasterResetType.manual> = data.resetType ?? EWowMasterResetType.week;

      if (data.lastRefreshDatetime.add(1, diffUnit).diff() < 0) {
        
        return {
          ...data,
          lastRefreshDatetime: dayjs(),
          value: 0,
        };
      }
    }
    
    return data;
  });
}

export const generateQueryKey = (params?: IWowKeystoneParams) => {
  return [
    "wow",
    "keystone",
    params,
  ];
}

export default useWowKeystoneQuery;