import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { IWowItemLevel, IWowItemLevelParams } from "../../characterItems/_apis/_models/wowCharacterItem";
import { WOW_ITEM_LEVEL_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";


export const useWowItemLevelQuery = (params?: IWowItemLevelParams) => {
  return useQuery<IWowItemLevel[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: WOW_ITEM_LEVEL_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IWowItemLevel>(response.result.values));
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IWowItemLevel[] | undefined) => {
  return res?.sort((left, right) => left.level - right.level) as IWowItemLevel[];
}

export const generateQueryKey = (params?: IWowItemLevelParams) => {
  return [
    "wow",
    "item",
    "level",
    params,
  ];
}

export default useWowItemLevelQuery;