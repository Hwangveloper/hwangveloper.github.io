import { useQuery } from "react-query";
import axios from "axios";
import { IWowMount, IWowMountInfoResponse, IWowMountResponse } from "../_models/wowMount";


export const useWowMountQuery = (accessToken?: string) => {
  return useQuery<IWowMount[]>(generateQueryKey(), async () => {

    // 탈것 전체 목록
    const response = await axios.get("https://kr.api.blizzard.com/data/wow/mount/index", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: "static-kr",
        locale: "ko_KR",
      },
    });

    // 수집한 탈것 목록
    const collectResp = await axios.get("https://kr.api.blizzard.com/profile/user/wow/collections/mounts", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: "profile-kr",
        locale: "ko_KR",
      },
    });

    // 탈것 전체 목록
    // https://kr.api.blizzard.com/data/wow/mount/index?namespace=static-kr&locale=ko_KR
    // 특정 탈것의 정보
    // https://kr.api.blizzard.com/data/wow/mount/${mountId}?namespace=static-kr&locale=ko_KR
    // 수집한 탈것 목록
    // https://kr.api.blizzard.com/profile/user/wow/collections/mounts?namespace=profile-kr&locale=ko_KR
    

    return convertResponseData(response.data, collectResp.data);
  }, {
    enabled: !!accessToken,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const convertResponseData = (res?: IWowMountInfoResponse, collectResp?: IWowMountResponse) => {
  return res?.mounts.map((data) => ({
    id: data?.id,
    name: data?.name,
    is_collected: collectResp?.mounts.find((coll) => coll.mount.id === data.id) !== null ? true : false,
  })) as IWowMount[];
}

export const generateQueryKey = () => {
  return [
    "wow",
    "mount"
  ];
}

export default useWowMountQuery;