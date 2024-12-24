import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { ESheetValueInputOption, PROJECT_TASK_SHEET_DELETE_UPDATE_RANGE, PROJECT_TASK_SHEET_UPDATE_START_ROW } from "../../../../common/_constants/sheets";
import { IUpdateResponse } from "../../../../common/_models/sheets";
import { IProjectTaskDeleteRequest } from "../_models/projectTask";
import { ECommonYN } from "../../../../common/_constants/common";

interface IProjectTaskDeletePayload {
  item: IProjectTaskDeleteRequest;
}

const projectTaskStateUpdate = async (payload: IProjectTaskDeletePayload): Promise<IUpdateResponse | undefined> => {

  const range = PROJECT_TASK_SHEET_DELETE_UPDATE_RANGE;
  const data = payload.item;
  const updateValues = [[ ECommonYN.Y ]];

  try {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
      range: range.replaceAll("##", `${PROJECT_TASK_SHEET_UPDATE_START_ROW + data.rowIndex}`),
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

export const useProjectTaskStateUpdateMutation = (): UseMutationResult<
  IUpdateResponse | undefined,
  Error,
  IProjectTaskDeletePayload
> => {
  return useMutation(projectTaskStateUpdate);
}

export default useProjectTaskStateUpdateMutation;