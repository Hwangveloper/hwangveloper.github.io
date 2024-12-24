import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { PROJECT_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import { IProject, IProjectParams, IProjectResponse } from "../_models/project";
import { ECommonYN } from "../../../../common/_constants/common";


export const useProjectQuery = (params?: IProjectParams) => {
  return useQuery<IProject[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: PROJECT_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IProjectResponse>(response.result.values), params);
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IProjectResponse[] | undefined, params?: IProjectParams) => {
  return res?.filter((data) => params?.ignoreHide === false || data.showYn === ECommonYN.Y) as IProject[];
}

export const generateQueryKey = (params?: IProjectParams) => {
  return [
    "project",
    params,
  ];
}

export default useProjectQuery;