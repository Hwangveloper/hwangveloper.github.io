import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ESheetValueInputOption, WOW_CHARACTER_SHEET_MEMO_UPDATE_RANGE, WOW_CHARACTER_SHEET_UPDATE_START_ROW } from "../../../../../common/_constants/sheets";
import { IUpdateListResponse } from "../../../../../common/_models/sheets";
import { IWowCharacterMemoUpdateRequest } from "../_models/wowCharacter";

interface IWowCharacterMemoUpdatePayload {
  list: IWowCharacterMemoUpdateRequest[];
}

const wowCharacterMemoUpdate = async (payload: IWowCharacterMemoUpdatePayload): Promise<IUpdateListResponse | undefined> => {

  const range = WOW_CHARACTER_SHEET_MEMO_UPDATE_RANGE;

  const updateRows = payload.list;

  const updateValues = updateRows.map((data) => ({
    range: range.replaceAll("##", `${WOW_CHARACTER_SHEET_UPDATE_START_ROW}${data.rowIndex}`),
    values: [[ data.memo ]],
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

export const useWowCharacterMemoUpdateMutation = (): UseMutationResult<
  IUpdateListResponse | undefined,
  Error,
  IWowCharacterMemoUpdatePayload
> => {
  return useMutation({
    mutationFn: wowCharacterMemoUpdate,
  });
}

export default useWowCharacterMemoUpdateMutation;