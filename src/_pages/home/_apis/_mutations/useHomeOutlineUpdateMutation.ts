import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { IHomeOutlineUpdateRequest } from "../_models/home";
import { ESheetValueInputOption, OUTLINE_SHEET_UPDATE_RANGE, OUTLINE_SHEET_UPDATE_START_ROW } from "../../../../common/_constants/sheets";
import { DATETIME_FORMAT, ECommonTimeUnit, ECommonYN } from "../../../../common/_constants/common";
import dayjs from "dayjs";
import { IUpdateResponse } from "../../../../common/_models/sheets";

interface IHomeOutlineUpdatePayload {
  item: IHomeOutlineUpdateRequest;
}

const outlineUpdate = async (payload: IHomeOutlineUpdatePayload): Promise<IUpdateResponse | undefined> => {

  const range = OUTLINE_SHEET_UPDATE_RANGE;
  const data = payload.item;
  const rowIndex = data.rowIndex ?? 0;
  const updateValues = [[
    data.id,
    data.category,
    data.name,
    `${data.periodCount}${data.periodUnit}`,
    `${data.maxPeriodCount}${data.maxPeriodUnit}`,
    data.baseDatetime?.format(DATETIME_FORMAT) ?? '',
    data.lastDoneDatetime?.format(DATETIME_FORMAT) ?? dayjs().subtract(data.periodCount, data.periodUnit as ECommonTimeUnit).format(DATETIME_FORMAT),
    ECommonYN.N,
  ]];

  try {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
      range: range.replaceAll("##", `${OUTLINE_SHEET_UPDATE_START_ROW + rowIndex}`),
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

export const useHomeOutlineUpdateMutation = (): UseMutationResult<
  IUpdateResponse | undefined,
  Error,
  IHomeOutlineUpdatePayload
> => {
  return useMutation(outlineUpdate);
}

export default useHomeOutlineUpdateMutation;