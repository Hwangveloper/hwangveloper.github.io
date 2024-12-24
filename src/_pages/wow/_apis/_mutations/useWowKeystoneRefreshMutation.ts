import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { ESheetValueInputOption, WOW_KEYSTONE_SHEET_REFRESH_RANGE, WOW_KEYSTONE_SHEET_UPDATE_START_ROW } from "../../../../common/_constants/sheets";
import { DATETIME_FORMAT } from "../../../../common/_constants/common";
import { IWowKeystoneInitResponse } from "../_models/wowKeystone";
import { IUpdateListResponse } from "../../../../common/_models/sheets";
import dayjs from "dayjs";

interface IWowKeystoneRefreshPayload {
  list: IWowKeystoneInitResponse[];
}

const wowKeystoneRefresh = async (payload: IWowKeystoneRefreshPayload): Promise<IUpdateListResponse | undefined> => {

  const range = WOW_KEYSTONE_SHEET_REFRESH_RANGE;

  const updateRows = payload.list;

  const updateValues = updateRows.map((data) => ({
    range: range.replaceAll("##", `${WOW_KEYSTONE_SHEET_UPDATE_START_ROW + data.rowIndex}`),
    values: [[ dayjs().format(DATETIME_FORMAT), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]],
  }));

  try {
    const response = await gapi.client.sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
      resource: {
        valueInputOption: ESheetValueInputOption.USER_ENTERED,
        data: updateValues,
      },
    });
    console.log("Sheet updated successfully:", response.result);
    return response.result;
  } catch (error) {
    console.error("Error updating sheet:", error);
  }
};

export const useWowKeystoneRefreshMutation = (): UseMutationResult<
  IUpdateListResponse | undefined,
  Error,
  IWowKeystoneRefreshPayload
> => {
  return useMutation(wowKeystoneRefresh);
}

export default useWowKeystoneRefreshMutation;