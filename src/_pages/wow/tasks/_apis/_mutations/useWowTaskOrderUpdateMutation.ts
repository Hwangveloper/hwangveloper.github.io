import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ESheetValueInputOption, WOW_TASK_SHEET_ORDER_UPDATE_RANGE, WOW_TASK_SHEET_UPDATE_START_ROW } from "../../../../../common/_constants/sheets";
import { IUpdateListResponse } from "../../../../../common/_models/sheets";
import { IWowTaskOrderUpdateRequest } from "../_models/wowTask";

interface IWowTaskOrderUpdatePayload {
  list: IWowTaskOrderUpdateRequest[];
}

const wowTaskOrderUpdate = async (payload: IWowTaskOrderUpdatePayload): Promise<IUpdateListResponse | undefined> => {

  const range = WOW_TASK_SHEET_ORDER_UPDATE_RANGE;

  const updateRows = payload.list;

  const updateValues = updateRows.map((data) => ({
    range: range.replaceAll("##", `${WOW_TASK_SHEET_UPDATE_START_ROW + data.rowIndex}`),
    values: [[ data.order ]],
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

export const useWowTaskOrderUpdateMutation = (): UseMutationResult<
  IUpdateListResponse | undefined,
  Error,
  IWowTaskOrderUpdatePayload
> => {
  return useMutation({
    mutationFn: wowTaskOrderUpdate,
  });
}

export default useWowTaskOrderUpdateMutation;