import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IWowMount, IWowCharMountResponse, IWowMountResponse } from "../_models/wowMount";


export const useWowMountQuery = (accessToken?: string) => {
  return useQuery<IWowMount[]>({
    queryKey: generateQueryKey(),
    queryFn: async () => {

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

      return convertResponseData(response.data, collectResp.data);
    },
    enabled: !!accessToken,
  });
}

const convertResponseData = (res?: IWowMountResponse, collectResp?: IWowCharMountResponse) => {
  return res?.mounts.map((data) => ({
    id: data?.id,
    name: data?.name,
    is_collected: !!collectResp?.mounts.find((coll) => coll.mount.id === data.id) ? true : false,
  })) as IWowMount[];
}

export const generateQueryKey = () => {
  return [
    "wow",
    "mount"
  ];
}

export default useWowMountQuery;