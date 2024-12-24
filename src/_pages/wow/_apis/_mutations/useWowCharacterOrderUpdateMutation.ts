import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { ESheetValueInputOption, WOW_CHARACTER_SHEET_ORDER_UPDATE_RANGE, WOW_CHARACTER_SHEET_UPDATE_START_ROW } from "../../../../common/_constants/sheets";
import { IUpdateListResponse } from "../../../../common/_models/sheets";
import { IWowCharacterOrderUpdateRequest } from "../_models/wowCharacter";

interface IWowCharacterOrderUpdatePayload {
  list: IWowCharacterOrderUpdateRequest[];
}

const wowCharacterOrderUpdate = async (payload: IWowCharacterOrderUpdatePayload): Promise<IUpdateListResponse | undefined> => {

  const range = WOW_CHARACTER_SHEET_ORDER_UPDATE_RANGE;

  const updateRows = payload.list;

  const updateValues = updateRows.map((data) => ({
    range: range.replaceAll("##", `${WOW_CHARACTER_SHEET_UPDATE_START_ROW + data.rowIndex}`),
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

export const useWowCharacterOrderUpdateMutation = (): UseMutationResult<
  IUpdateListResponse | undefined,
  Error,
  IWowCharacterOrderUpdatePayload
> => {
  return useMutation(wowCharacterOrderUpdate);
}

export default useWowCharacterOrderUpdateMutation;