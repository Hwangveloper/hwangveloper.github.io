import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { WOW_KEYSTONE_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import { IWowKeystoneCharacterValuesResponse, IWowKeystoneInitParams, IWowKeystoneInitResponse, IWowKeystoneResponse } from "../_models/wowKeystone";
import { EWowMasterCategory, EWowMasterResetType } from "../../_constants/wowMaster";
import dayjs from "dayjs";


export const useWowKeystoneInitQuery = (params?: IWowKeystoneInitParams) => {
  return useQuery<IWowKeystoneInitResponse[] | undefined>(generateQueryKey(params), async () => {
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

const covertResponseData = (res: (IWowKeystoneResponse & IWowKeystoneCharacterValuesResponse)[] | undefined, params?: IWowKeystoneInitParams) => {

  const masters = params?.masterList.filter((master) => master.category === EWowMasterCategory.KEYSTONE);

  return res?.filter((data) => {

    const master = masters?.find((master) => master.id === data.masterId);
    const lastRefreshDatetime = data.lastRefreshDatetime ? dayjs(data.lastRefreshDatetime) : dayjs();

    if (master?.resetType && master.resetType !== EWowMasterResetType.manual) {
      const diffUnit = master.resetType as Exclude<EWowMasterResetType, EWowMasterResetType.manual>;
      let stdDay = dayjs();

      if (diffUnit === EWowMasterResetType.week) {
        stdDay = dayjs().startOf('week').add(4, 'day').add(8, 'hour');
      } else if (diffUnit === EWowMasterResetType.month) {
        stdDay = dayjs().startOf('month');
      }console.log(stdDay);
      console.log(lastRefreshDatetime.add(1, diffUnit));

      if (lastRefreshDatetime.diff(stdDay) < 0) {
        return true;
      }
    }
    
    return false;
  }).map((data) => ({
    ...data,
    lastRefreshDatetime: data.lastRefreshDatetime ? dayjs(data.lastRefreshDatetime) : dayjs(),
  }));
}

export const generateQueryKey = (params?: IWowKeystoneInitParams) => {
  return [
    "wow",
    "keystone",
    "init",
    params,
  ];
}

export default useWowKeystoneInitQuery;