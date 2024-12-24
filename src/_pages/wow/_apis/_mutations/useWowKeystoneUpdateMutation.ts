import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { ESheetValueInputOption, WOW_KEYSTONE_SHEET_UPDATE_DATETIME_RANGE, WOW_KEYSTONE_SHEET_UPDATE_RANGE, WOW_KEYSTONE_SHEET_UPDATE_START_COLUMN, WOW_KEYSTONE_SHEET_UPDATE_START_ROW } from "../../../../common/_constants/sheets";
import { DATETIME_FORMAT, ECommonYN } from "../../../../common/_constants/common";
import { IWowKeystone } from "../_models/wowKeystone";
import { IUpdateListResponse } from "../../../../common/_models/sheets";
import dayjs from "dayjs";

interface IWowKeystoneUpdatePayload {
  list: IWowKeystone[];
  charId: string;
  dungeonId: string;
  level: number;
  clearYn: ECommonYN;
  score: number;
}

const wowKeystoneUpdate = async (payload: IWowKeystoneUpdatePayload): Promise<IUpdateListResponse | undefined> => {

  const range = WOW_KEYSTONE_SHEET_UPDATE_RANGE;

  const updateRows = payload.list.filter((keystone) => keystone.charId === payload.charId && (keystone.dungeonId === '' || keystone.dungeonId === payload.dungeonId));

  const updateValues = updateRows.map((data) => {
    let value = '';
    if (data.masterId === 'WOW0') {
      value = `${data.value + 1}`;
    } else if (data.masterId === 'WOW1' || data.masterId === 'WOW3') {
      value = `${data.value > payload.level ? data.value : payload.level}`;
    } else if (data.masterId === 'WOW2') {
      value = `${payload.score}`;
    } else if (data.masterId === 'WOW4') {
      value = `${(data.value < payload.level && payload.clearYn === ECommonYN.Y) ? payload.level : data.value}`;
    }
    return {
      range: range.replaceAll(/([A-Z]*##)/g, `${String.fromCharCode(WOW_KEYSTONE_SHEET_UPDATE_START_COLUMN.charCodeAt(0) + (data.charRowIndex ?? 0))}${WOW_KEYSTONE_SHEET_UPDATE_START_ROW + data.rowIndex}`),
      values: [[ value ]],
    };
  }).concat(updateRows.map((data) => ({
    range: WOW_KEYSTONE_SHEET_UPDATE_DATETIME_RANGE.replaceAll("##", `${WOW_KEYSTONE_SHEET_UPDATE_START_ROW + data.rowIndex}`),
    values: [[ dayjs().format(DATETIME_FORMAT) ]],
  })));

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

export const useWowKeystoneUpdateMutation = (): UseMutationResult<
  IUpdateListResponse | undefined,
  Error,
  IWowKeystoneUpdatePayload
> => {
  return useMutation(wowKeystoneUpdate);
}

export default useWowKeystoneUpdateMutation;