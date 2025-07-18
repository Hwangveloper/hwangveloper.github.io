import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { WOW_TASK_SHEET_RANGE } from "../../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../../common/_utils/sheets";
import { IWowTask, IWowTaskParams, IWowTaskResponse } from "../_models/wowTask";
import { ECommonYN } from "../../../../../common/_constants/common";


export const useWowTaskQuery = (params?: IWowTaskParams) => {
  return useQuery<IWowTask[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: WOW_TASK_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IWowTaskResponse>(response.result.values), params);
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IWowTaskResponse[] | undefined, params?: IWowTaskParams) => {
  return res?.filter((data) => !(params?.ignoreDelete) || data.isDeleted === ECommonYN.N) as IWowTask[];
}

export const generateQueryKey = (params?: IWowTaskParams) => {
  return [
    "wow",
    "task",
    params,
  ];
}

export default useWowTaskQuery;