import { useQuery } from "react-query";
import axios from "axios";
import { IWowMountInfo, IWowMountInfoParams, IWowMountInfoResponse } from "../_models/wowMount";


export const useWowMountInfoQuery = (accessToken?: string, params?: IWowMountInfoParams) => {
  return useQuery<IWowMountInfo>(generateQueryKey(params), async () => {

    // 특정 탈것 정보
    const response = await axios.get(`https://kr.api.blizzard.com/data/wow/mount/${params?.mountId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: "static-kr",
        locale: "ko_KR",
      },
    });

    return convertResponseData(response.data);
  }, {
    enabled: !!accessToken && !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const convertResponseData = (res?: IWowMountInfoResponse) => {
  return {
    id: res?.id,
    name: res?.name,
    description: res?.description,
    source: res?.source.name,
  } as IWowMountInfo;
}

export const generateQueryKey = (params?: IWowMountInfoParams) => {
  return [
    "wow",
    "mount",
    "info",
    params,
  ];
}

export default useWowMountInfoQuery;