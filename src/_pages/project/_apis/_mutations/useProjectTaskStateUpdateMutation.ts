import { gapi } from "gapi-script";
import { useMutation, UseMutationResult } from "react-query";
import { ESheetValueInputOption, PROJECT_TASK_SHEET_STATE_UPDATE_RANGE, PROJECT_TASK_SHEET_UPDATE_START_ROW } from "../../../../common/_constants/sheets";
import { IUpdateResponse } from "../../../../common/_models/sheets";
import { IProjectTaskStateUpdateRequest } from "../_models/projectTask";
import { EProjectTaskStatus } from "../../_constants/projectTask";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../../../common/_constants/common";

interface IProjectTaskStateUpdatePayload {
  item: IProjectTaskStateUpdateRequest;
}

const projectTaskStateUpdate = async (payload: IProjectTaskStateUpdatePayload): Promise<IUpdateResponse | undefined> => {

  const range = PROJECT_TASK_SHEET_STATE_UPDATE_RANGE;
  const data = payload.item;
  const updateValues = [[
    data.state,
    data.state === EProjectTaskStatus.DOING ? dayjs().format(DATE_FORMAT) : data.startDatetime?.format(DATE_FORMAT),
    data.state === EProjectTaskStatus.DONE ? dayjs().format(DATE_FORMAT) : data.endDatetime?.format(DATE_FORMAT),
  ]];

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
  IProjectTaskStateUpdatePayload
> => {
  return useMutation(projectTaskStateUpdate);
}

export default useProjectTaskStateUpdateMutation;