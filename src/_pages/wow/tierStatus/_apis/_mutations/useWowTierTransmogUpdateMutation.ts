import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IUpdateResponse } from "../../../../../common/_models/sheets";
import { ESheetValueInputOption, WOW_CHAR_TIER_TRANSMOG_SHEET_UPDATE_RANGE, WOW_CHAR_TIER_TRANSMOG_SHEET_UPDATE_START_ROW } from "../../../../../common/_constants/sheets";
import { IWowTierTransmogUpdateRequest } from "../_models/wowTierTransmog";
import { EWowCollectionStatus } from "../../_constants/wowTierTransmog";

interface IWowTierTransmogUpdatePayload {
  item: IWowTierTransmogUpdateRequest;
}

const wowTierTransmogUpdate = async (payload: IWowTierTransmogUpdatePayload): Promise<IUpdateResponse | undefined> => {

  const range = WOW_CHAR_TIER_TRANSMOG_SHEET_UPDATE_RANGE;
  const data = payload.item;
  const rowIndex = data.transmogs?.rowIndex ?? 0;
  const transmogs = {
    ...data.transmogs,
    [data.part]: data.collectionStatus,
  };
  const updateValues = [[
    transmogs.head ?? EWowCollectionStatus.NOT_FIND,
    transmogs.shoulders ?? EWowCollectionStatus.NOT_FIND,
    transmogs.back ?? EWowCollectionStatus.NOT_FIND,
    transmogs.chest ?? EWowCollectionStatus.NOT_FIND,
    transmogs.wrist ?? EWowCollectionStatus.NOT_FIND,
    transmogs.hands ?? EWowCollectionStatus.NOT_FIND,
    transmogs.waist ?? EWowCollectionStatus.NOT_FIND,
    transmogs.legs ?? EWowCollectionStatus.NOT_FIND,
    transmogs.feet ?? EWowCollectionStatus.NOT_FIND,
  ]];

  try {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
      range: range.replaceAll("##", `${WOW_CHAR_TIER_TRANSMOG_SHEET_UPDATE_START_ROW + rowIndex}`),
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

export const useWowTierTransmogUpdateMutation = (): UseMutationResult<
  IUpdateResponse | undefined,
  Error,
  IWowTierTransmogUpdatePayload
> => {
  return useMutation({
    mutationFn: wowTierTransmogUpdate,
  });
}

export default useWowTierTransmogUpdateMutation;