import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useWowAccountProfileQuery = (accessToken?: string) => {
  return useQuery<any>({
    queryKey: generateQueryKey(),
    queryFn: async () => {

      const url = "https://kr.api.blizzard.com/profile/user/wow";

      return await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          namespace: "profile-kr",
          locale: "ko_KR",
        },
      });
    },
    enabled: !!accessToken,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

export const generateQueryKey = () => {
  return [
    "wow",
    "account",
    "profile",
  ];
}

export default useWowAccountProfileQuery;