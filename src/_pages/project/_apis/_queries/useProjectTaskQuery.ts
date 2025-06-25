import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { PROJECT_TASK_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import dayjs from "dayjs";
import { IProjectSprint, IProjectSprintTask, IProjectTask, IProjectTaskParams, IProjectTaskResponse } from "../_models/projectTask";
import { ECommonYN } from "../../../../common/_constants/common";


export const useProjectTaskQuery = (params?: IProjectTaskParams) => {
  return useQuery<IProjectSprintTask | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: PROJECT_TASK_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IProjectTaskResponse>(response.result.values), params);
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IProjectTaskResponse[] | undefined, params?: IProjectTaskParams) => {

  let taskList = res?.map((data) => ({
    ...data,
    startDatetime: data.startDatetime ? dayjs(data.startDatetime) : undefined,
    endDatetime: data.endDatetime ? dayjs(data.endDatetime) : undefined,
    sprintStartDate: data.sprintStartDate ? dayjs(data.sprintStartDate) : undefined,
    sprintEndDate: data.sprintEndDate ? dayjs(data.sprintEndDate) : undefined,

    projectTitle: params?.projectList.find((proj) => proj.id === data.projectId)?.title,
  })) as IProjectTask[];

  if (params?.ignoreDelete === true) {
    taskList = taskList.filter((data) => data.isDelete !== ECommonYN.Y);
  }

  const sprintList = taskList.map((task) => ({
    startDate: task.sprintStartDate,
    endDate: task.sprintEndDate,
  })) as IProjectSprint[];

  return {
    sprintList: sprintList
      .filter((sprint) => sprint.startDate && sprint.endDate)
      .filter((sprint, idx, self) => idx === self.findIndex((s) => s.startDate.isSame(sprint.startDate, 'day') && s.endDate.isSame(sprint.endDate, 'day')))
      .sort((lSprint, rSprint) => lSprint.startDate.isBefore(rSprint.startDate) ? -1 : 0),
    taskList,
  } as IProjectSprintTask;
}

export const generateQueryKey = (params?: IProjectTaskParams) => {
  return [
    "project",
    "task",
    params,
  ];
}

export default useProjectTaskQuery;