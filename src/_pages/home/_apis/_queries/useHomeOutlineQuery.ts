import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { IHomeOutline, IHomeOutlineParams, IHomeOutlineResponse } from "../_models/home";
import { OUTLINE_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import { convertToCommonPeriod } from "../../../../common/_utils/common";
import dayjs from "dayjs";
import { EDataState, ETaskStatus } from "../../_constants/homeOutline";
import { ECommonYN } from "../../../../common/_constants/common";


export const useHomeOutlineQuery = (params?: IHomeOutlineParams) => {
  return useQuery<IHomeOutline[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: OUTLINE_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IHomeOutlineResponse>(response.result.values), params);
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IHomeOutlineResponse[] | undefined, params?: IHomeOutlineParams) => {
  const list = res?.map((data) => {

    const period = convertToCommonPeriod(data.period);
    const maxPeriod = convertToCommonPeriod(data.maxPeriod);
    const baseDatetime = data.baseDatetime ? dayjs(data.baseDatetime) : undefined;
    const lastDoneDatetime = data.lastDoneDatetime ? dayjs(data.lastDoneDatetime) : undefined;
    let status = ETaskStatus.TODO;
    if ((baseDatetime || lastDoneDatetime) && period) {
      const diff = dayjs().diff(baseDatetime ?? lastDoneDatetime, period.unit);
      const maxDiff = dayjs().diff(baseDatetime ?? lastDoneDatetime, maxPeriod ? maxPeriod.unit : period.unit);
      if (diff >= period.period) {
        if (maxDiff >= (maxPeriod ? maxPeriod.period : period.period)) {
          status = ETaskStatus.DONOT;
        } else {
          status = ETaskStatus.TODO;
        }
      } else {
        status = ETaskStatus.DONE;
      }
    }
    return {
      isChecked: status === ETaskStatus.DONE,
      taskStatus: status,
      ...data,
      period,
      maxPeriod,
      baseDatetime,
      lastDoneDatetime,
      dataState: data.isDelete === ECommonYN.Y ? EDataState.DELETED : EDataState.NONE,
    };
  }) as IHomeOutline[];

  if (params?.ignoreDelete) {
    return list.filter((item) => item.dataState !== EDataState.DELETED).sort((a, b) => {
      if ((a.taskStatus === ETaskStatus.DONOT && b.taskStatus !== ETaskStatus.DONOT) || (a.taskStatus === ETaskStatus.TODO && b.taskStatus === ETaskStatus.DONE)) {
        return -1;
      } else if ((a.taskStatus === ETaskStatus.DONE && b.taskStatus !== ETaskStatus.DONE) || (a.taskStatus === ETaskStatus.TODO && b.taskStatus === ETaskStatus.DONOT)) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return list.sort((a, b) => {
      if ((a.taskStatus === ETaskStatus.DONOT && b.taskStatus !== ETaskStatus.DONOT) || (a.taskStatus === ETaskStatus.TODO && b.taskStatus === ETaskStatus.DONE)) {
        return -1;
      } else if ((a.taskStatus === ETaskStatus.DONE && b.taskStatus !== ETaskStatus.DONE) || (a.taskStatus === ETaskStatus.TODO && b.taskStatus === ETaskStatus.DONOT)) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

export const generateQueryKey = (params?: IHomeOutlineParams) => {
  return [
    "home",
    "outline",
    params,
  ];
}

export default useHomeOutlineQuery;