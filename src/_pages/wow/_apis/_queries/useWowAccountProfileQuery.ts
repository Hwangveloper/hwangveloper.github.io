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