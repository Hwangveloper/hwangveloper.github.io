import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { IUpdateResponse } from "../../../../../common/_models/sheets";
import { IWowCharItemUpdateRequest } from "../_models/wowCharacterItem";
import { ESheetValueInputOption, WOW_CHAR_ITEM_SHEET_UPDATE_RANGE, WOW_CHAR_ITEM_SHEET_UPDATE_START_ROW } from "../../../../../common/_constants/sheets";

interface IWowCharItemUpdatePayload {
  item: IWowCharItemUpdateRequest;
}

const wowCharItemUpdate = async (payload: IWowCharItemUpdatePayload): Promise<IUpdateResponse | undefined> => {

  const range = WOW_CHAR_ITEM_SHEET_UPDATE_RANGE;
  const data = payload.item;
  const levelRowIndex = data.items?.levelRowIndex ?? 0;
  const typeRowIndex = data.items?.typeRowIndex ?? 0;
  const items = {
    ...data.items,
    [data.part]: {
      level: data.level,
      type: data.type,
    },
  };
  const updateValues = [{
    range: range.replaceAll("##", `${WOW_CHAR_ITEM_SHEET_UPDATE_START_ROW + levelRowIndex}`),
    values: [[
      items.thWeapon1?.level ?? '',
      items.thWeapon2?.level ?? '',
      items.ohWeapon1?.level ?? '',
      items.ohWeapon2?.level ?? '',
      items.ohWeapon3?.level ?? '',
      items.ohWeapon4?.level ?? '',
      items.head?.level ?? '',
      items.neck?.level ?? '',
      items.shoulders?.level ?? '',
      items.back?.level ?? '',
      items.chest?.level ?? '',
      items.wrist?.level ?? '',
      items.hands?.level ?? '',
      items.waist?.level ?? '',
      items.legs?.level ?? '',
      items.feet?.level ?? '',
      items.ring1?.level ?? '',
      items.ring2?.level ?? '',
      items.trinket1?.level ?? '',
      items.trinket2?.level ?? '',
    ]],
  },
  {
    range: range.replaceAll("##", `${WOW_CHAR_ITEM_SHEET_UPDATE_START_ROW + typeRowIndex}`),
    values: [[
      items.thWeapon1?.type ?? '',
      items.thWeapon2?.type ?? '',
      items.ohWeapon1?.type ?? '',
      items.ohWeapon2?.type ?? '',
      items.ohWeapon3?.type ?? '',
      items.ohWeapon4?.type ?? '',
      items.head?.type ?? '',
      items.neck?.type ?? '',
      items.shoulders?.type ?? '',
      items.back?.type ?? '',
      items.chest?.type ?? '',
      items.wrist?.type ?? '',
      items.hands?.type ?? '',
      items.waist?.type ?? '',
      items.legs?.type ?? '',
      items.feet?.type ?? '',
      items.ring1?.type ?? '',
      items.ring2?.type ?? '',
      items.trinket1?.type ?? '',
      items.trinket2?.type ?? '',
    ]],
  }];

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

export const useWowCharItemUpdateMutation = (): UseMutationResult<
  IUpdateResponse | undefined,
  Error,
  IWowCharItemUpdatePayload
> => {
  return useMutation(wowCharItemUpdate);
}

export default useWowCharItemUpdateMutation;