import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { WOW_DUNGEON_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import { IWowDungeon, IWowDungeonParams, IWowDungeonResponse } from "../_models/wowDungeon";


export const useWowDungeonQuery = (params?: IWowDungeonParams) => {
  return useQuery<IWowDungeon[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: WOW_DUNGEON_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IWowDungeonResponse>(response.result.values));
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IWowDungeonResponse[] | undefined) => {
  return res?.map((data) => ({
    ...data,
  })) as IWowDungeon[];
}

export const generateQueryKey = (params?: IWowDungeonParams) => {
  return [
    "wow",
    "dungeon",
    params,
  ];
}

export default useWowDungeonQuery;