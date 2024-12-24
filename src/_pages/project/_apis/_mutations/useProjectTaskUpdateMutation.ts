import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { ESheetValueInputOption, PROJECT_TASK_SHEET_UPDATE_RANGE, PROJECT_TASK_SHEET_UPDATE_START_ROW } from "../../../../common/_constants/sheets";
import { IUpdateResponse } from "../../../../common/_models/sheets";
import { IProjectTaskUpdateRequest } from "../_models/projectTask";
import { DATE_FORMAT, ECommonYN } from "../../../../common/_constants/common";

interface IProjectTaskUpdatePayload {
  item: IProjectTaskUpdateRequest;
}

const projectTaskUpdate = async (payload: IProjectTaskUpdatePayload): Promise<IUpdateResponse | undefined> => {

  const range = PROJECT_TASK_SHEET_UPDATE_RANGE;
  const data = payload.item;
  const rowIndex = data.rowIndex ?? 0;
  const updateValues = [[
    data.id,
    data.projectId,
    data.prevTaskId,
    data.type,
    data.label,
    data.priority,
    data.title,
    data.description,
    data.state,
    data.startDatetime ? data.startDatetime.format(DATE_FORMAT) : '',
    data.endDatetime ? data.endDatetime.format(DATE_FORMAT) : '',
    ECommonYN.N,
  ]];

  try {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
      range: range.replaceAll("##", `${PROJECT_TASK_SHEET_UPDATE_START_ROW + rowIndex}`),
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

export const useProjectTaskUpdateMutation = (): UseMutationResult<
  IUpdateResponse | undefined,
  Error,
  IProjectTaskUpdatePayload
> => {
  return useMutation(projectTaskUpdate);
}

export default useProjectTaskUpdateMutation;