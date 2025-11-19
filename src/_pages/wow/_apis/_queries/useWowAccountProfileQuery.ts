import { useQuery } from "@tanstack/react-query";
import battleNetClient from "../../../../common/_libs/axios/battleNetClient";


export const useWowAccountProfileQuery = () => {
  return useQuery<any>({
    queryKey: generateQueryKey(),
    queryFn: async () => {

      const url = "/profile/user/wow";

      return await battleNetClient.get(url);
    },
    enabled: true,
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