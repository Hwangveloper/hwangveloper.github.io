import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { PROJECT_TASK_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import dayjs from "dayjs";
import { IProjectTask, IProjectTaskParams, IProjectTaskResponse } from "../_models/projectTask";
import { ECommonYN } from "../../../../common/_constants/common";


export const useProjectTaskQuery = (params?: IProjectTaskParams) => {
  return useQuery<IProjectTask[] | undefined>(generateQueryKey(params), async () => {
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
  const list = res?.map((data) => ({
    ...data,
    startDatetime: dayjs(data.startDatetime),
    endDatetime: dayjs(data.endDatetime),

    projectTitle: params?.projectList.find((proj) => proj.id === data.projectId)?.title,
  })) as IProjectTask[];
  
  if (params?.ignoreDelete === true) {
    return list.filter((data) => data.isDelete !== ECommonYN.Y);
  } else {
    return list;
  }
}

export const generateQueryKey = (params?: IProjectTaskParams) => {
  return [
    "project",
    "task",
    params,
  ];
}

export default useProjectTaskQuery;