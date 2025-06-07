import { useQuery } from "react-query";
import { IWowAccountProfileParams } from "../_models/wowMaster";
import axios from "axios";


export const useWowAccountProfileQuery = (accessToken: string, params?: IWowAccountProfileParams) => {
  return useQuery<any>(generateQueryKey(params), async () => {

    const url = "https://kr.api.blizzard.com/profile/user/wow";

    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

export const generateQueryKey = (params?: IWowAccountProfileParams) => {
  return [
    "wow",
    "account",
    "profile",
    params,
  ];
}

export default useWowAccountProfileQuery;