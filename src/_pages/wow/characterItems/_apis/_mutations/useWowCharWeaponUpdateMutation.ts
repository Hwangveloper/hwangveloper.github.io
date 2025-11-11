import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IUpdateResponse } from "../../../../../common/_models/sheets";
import { IWowCharWeaponUpdateRequest } from "../_models/wowCharacterItem";
import { ESheetValueInputOption, WOW_CHAR_ITEM_SHEET_UPDATE_RANGE, WOW_CHAR_ITEM_SHEET_UPDATE_START_ROW } from "../../../../../common/_constants/sheets";

interface IWowCharWeaponUpdatePayload {
  item: IWowCharWeaponUpdateRequest;
}

const wowCharWeaponUpdate = async (payload: IWowCharWeaponUpdatePayload): Promise<IUpdateResponse | undefined> => {

  const range = WOW_CHAR_ITEM_SHEET_UPDATE_RANGE;
  const data = payload.item;
  const levelRowIndex = data.items?.levelRowIndex ?? 0;
  const typeRowIndex = data.items?.typeRowIndex ?? 0;
  const items = {
    ...data.items,
    thWeapon1: {
      level: data.thWeapon1Level,
      type: data.thWeapon1Type,
    },
    thWeapon2: {
      level: data.thWeapon2Level,
      type: data.thWeapon2Type,
    },
    ohWeapon1: {
      level: data.ohWeapon1Level,
      type: data.ohWeapon1Type,
    },
    ohWeapon2: {
      level: data.ohWeapon2Level,
      type: data.ohWeapon2Type,
    },
    ohWeapon3: {
      level: data.ohWeapon3Level,
      type: data.ohWeapon3Type,
    },
    ohWeapon4: {
      level: data.ohWeapon4Level,
      type: data.ohWeapon4Type,
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

export const useWowCharWeaponUpdateMutation = (): UseMutationResult<
  IUpdateResponse | undefined,
  Error,
  IWowCharWeaponUpdatePayload
> => {
  return useMutation({
    mutationFn: wowCharWeaponUpdate,
  });
}

export default useWowCharWeaponUpdateMutation;