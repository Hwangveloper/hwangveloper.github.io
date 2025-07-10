import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { ESheetValueInputOption, WOW_TASK_SHEET_UPDATE_START_ROW, WOW_TASK_SHEET_DELETE_RANGE } from "../../../../../common/_constants/sheets";
import { ECommonYN } from "../../../../../common/_constants/common";
import { IUpdateResponse } from "../../../../../common/_models/sheets";
import { IWowTask } from "../_models/wowTask";

interface IWowTaskDeletePayload {
  deleteItem?: IWowTask;
}

const wowTaskDelete = async (payload: IWowTaskDeletePayload): Promise<IUpdateResponse | undefined> => {

  const range = WOW_TASK_SHEET_DELETE_RANGE;
  const data = payload.deleteItem;
  if (!data) return;
  const rowIndex = data.rowIndex;
  const deleteValues = [[ ECommonYN.Y ]];

  try {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
      range: range.replaceAll("##", `${WOW_TASK_SHEET_UPDATE_START_ROW + rowIndex}`),
      valueInputOption: ESheetValueInputOption.USER_ENTERED,
      resource: {
        values: deleteValues,
      },
    });
    console.log("Sheet updated successfully:", response.result);
    return response.result;
  } catch (error) {
    console.error("Error updating sheet:", error);
  }
};

export const useWowTaskDeleteMutation = (): UseMutationResult<
  IUpdateResponse | undefined,
  Error,
  IWowTaskDeletePayload
> => {
  return useMutation(wowTaskDelete);
}

export default useWowTaskDeleteMutation;