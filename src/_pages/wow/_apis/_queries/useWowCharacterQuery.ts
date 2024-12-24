import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { WOW_CHARACTER_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import { IWowCharacter, IWowCharacterParams, IWowCharacterResponse } from "../_models/wowCharacter";


export const useWowCharacterQuery = (params?: IWowCharacterParams) => {
  return useQuery<IWowCharacter[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: WOW_CHARACTER_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IWowCharacterResponse>(response.result.values));
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IWowCharacterResponse[] | undefined) => {
  return res?.map((data) => ({
    ...data,
    order: Number(data.order),
  })).sort((left, right) => left.order - right.order) as IWowCharacter[];
}

export const generateQueryKey = (params?: IWowCharacterParams) => {
  return [
    "wow",
    "character",
    params,
  ];
}

export default useWowCharacterQuery;