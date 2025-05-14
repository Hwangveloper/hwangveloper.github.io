import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { ESheetValueInputOption, WOW_KEYSTONE_SHEET_UPDATE_DATETIME_RANGE, WOW_KEYSTONE_SHEET_UPDATE_RANGE, WOW_KEYSTONE_SHEET_UPDATE_START_COLUMN, WOW_KEYSTONE_SHEET_UPDATE_START_ROW } from "../../../../../common/_constants/sheets";
import { DATETIME_FORMAT } from "../../../../../common/_constants/common";
import { IWowKeystone } from "../_models/wowKeystone";
import { IUpdateListResponse } from "../../../../../common/_models/sheets";
import dayjs from "dayjs";

interface IWowKeystoneFavoriteUpdatePayload {
  list: IWowKeystone[];
  charId: string;
  dungeonId: string;
  isFavorite: boolean;
}

const wowKeystoneFavoriteUpdate = async (payload: IWowKeystoneFavoriteUpdatePayload): Promise<IUpdateListResponse | undefined> => {

  const range = WOW_KEYSTONE_SHEET_UPDATE_RANGE;

  const updateRows = payload.list.filter((keystone) => keystone.charId === payload.charId && (keystone.dungeonId === '' || keystone.dungeonId === payload.dungeonId) && keystone.masterId === "WOW5");

  const updateValues = updateRows.map((data) => {
    let value = `${payload.isFavorite ? 1 : 0}`;
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

export const useWowKeystoneFavoriteUpdateMutation = (): UseMutationResult<
  IUpdateListResponse | undefined,
  Error,
  IWowKeystoneFavoriteUpdatePayload
> => {
  return useMutation(wowKeystoneFavoriteUpdate);
}

export default useWowKeystoneFavoriteUpdateMutation;