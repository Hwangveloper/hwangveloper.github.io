import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { IHomeOutlineCheckUpdateRequest } from "../_models/home";
import { ESheetValueInputOption, OUTLINE_SHEET_CHECK_UPDATE_RANGE, OUTLINE_SHEET_UPDATE_START_ROW } from "../../../../common/_constants/sheets";
import dayjs from "dayjs";
import { DATETIME_FORMAT } from "../../../../common/_constants/common";
import { IUpdateListResponse } from "../../../../common/_models/sheets";

interface IHomeOutlineCheckUpdatePayload {
  updateList: IHomeOutlineCheckUpdateRequest[];
}

const outlineCheckUpdate = async (payload: IHomeOutlineCheckUpdatePayload): Promise<IUpdateListResponse | undefined> => {

  const range = OUTLINE_SHEET_CHECK_UPDATE_RANGE;
  const updateValues = payload.updateList.map((data) => ({
    range: range.replaceAll("##", `${OUTLINE_SHEET_UPDATE_START_ROW + data.rowIndex}`),
    values: [[
      data.nextBaseDatetime?.format(DATETIME_FORMAT) ?? '',
      data.isChecked ? dayjs().format(DATETIME_FORMAT) : '',
    ]]
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

export const useHomeOutlineCheckUpdateMutation = (): UseMutationResult<
  IUpdateListResponse | undefined,
  Error,
  IHomeOutlineCheckUpdatePayload
> => {
  return useMutation(outlineCheckUpdate);
}

export default useHomeOutlineCheckUpdateMutation;