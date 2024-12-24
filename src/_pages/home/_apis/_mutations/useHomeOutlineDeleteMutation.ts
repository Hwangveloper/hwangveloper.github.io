import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { IHomeOutline } from "../_models/home";
import { ESheetValueInputOption, OUTLINE_SHEET_DELETE_RANGE, OUTLINE_SHEET_UPDATE_START_ROW } from "../../../../common/_constants/sheets";
import { ECommonYN } from "../../../../common/_constants/common";
import { IUpdateResponse } from "../../../../common/_models/sheets";

interface IHomeOutlineDeletePayload {
  deleteItem?: IHomeOutline;
}

const outlineDelete = async (payload: IHomeOutlineDeletePayload): Promise<IUpdateResponse | undefined> => {

  const range = OUTLINE_SHEET_DELETE_RANGE;
  const data = payload.deleteItem;
  if (!data) return;
  const rowIndex = data.rowIndex;
  const deleteValues = [[ ECommonYN.Y ]];

  try {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
      range: range.replaceAll("##", `${OUTLINE_SHEET_UPDATE_START_ROW + rowIndex}`),
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

export const useHomeOutlineDeleteMutation = (): UseMutationResult<
  IUpdateResponse | undefined,
  Error,
  IHomeOutlineDeletePayload
> => {
  return useMutation(outlineDelete);
}

export default useHomeOutlineDeleteMutation;