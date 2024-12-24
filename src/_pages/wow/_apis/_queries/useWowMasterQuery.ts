import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { WOW_MASTER_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import { IWowMaster, IWowMasterResponse, IWowMasterParams } from "../_models/wowMaster";
import { EWowMasterCategory, EWowMasterResetType, EWowMasterSubcategory } from "../../_constants/wowMaster";


export const useWowMasterQuery = (params?: IWowMasterParams) => {
  return useQuery<IWowMaster[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: WOW_MASTER_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IWowMasterResponse>(response.result.values));
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IWowMasterResponse[] | undefined) => {
  return res?.map((data) => ({
    ...data,
    category: data.category as EWowMasterCategory,
    subcategory: data.subcategory as EWowMasterSubcategory,
    resetType: data.resetType as EWowMasterResetType,
  }));
}

export const generateQueryKey = (params?: IWowMasterParams) => {
  return [
    "wow",
    "master",
    params,
  ];
}

export default useWowMasterQuery;