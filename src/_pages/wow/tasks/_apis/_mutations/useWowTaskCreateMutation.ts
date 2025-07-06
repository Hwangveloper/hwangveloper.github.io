import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { ESheetValueInputOption, WOW_TASK_SHEET_UPDATE_RANGE, WOW_TASK_SHEET_UPDATE_START_ROW } from "../../../../../common/_constants/sheets";
import { ECommonYN } from "../../../../../common/_constants/common";
import { IUpdateListResponse } from "../../../../../common/_models/sheets";
import { IWowTaskSaveRequest } from "../_models/wowTask";

interface IWowTaskCreatePayload {
  item: IWowTaskSaveRequest;
}

const useWowTaskCreate = async (payload: IWowTaskCreatePayload): Promise<IUpdateListResponse | undefined> => {

  const range = WOW_TASK_SHEET_UPDATE_RANGE;
  const data = payload.item;
  const rowIndex = data.rowIndex ?? 0;
  const updateValues = [[
    data.id,
    data.charId,
    "none",
    "normal",
    data.category,
    data.blizzardId,
    ECommonYN.N,
  ]];

  try {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
      range: range.replaceAll("##", `${WOW_TASK_SHEET_UPDATE_START_ROW + rowIndex}`),
      valueInputOption: ESheetValueInputOption.USER_ENTERED,
      resource: {
        values: updateValues,
      },
    });
    console.log("Sheet updated successfully:", response.result);
    return response.result;
  } catch (error) {
    console.error("Error updating sheet:", error);
  }
};

export const useWowTaskCreateMutation = (): UseMutationResult<
  IUpdateListResponse | undefined,
  Error,
  IWowTaskCreatePayload
> => {
  return useMutation(useWowTaskCreate);
}

export default useWowTaskCreateMutation;