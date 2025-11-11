import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IWowCharToyResponse, IWowToy, IWowToyResponse } from "../_models/wowToy";


export const useWowToyQuery = (accessToken?: string) => {
  return useQuery<IWowToy[]>({
    queryKey: generateQueryKey(),
    queryFn: async () => {

      // 장난감 전체 목록
      const response = await axios.get("https://kr.api.blizzard.com/data/wow/toy/index", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          namespace: "static-kr",
          locale: "ko_KR",
        },
      });

      // 수집한 장난감 목록
      const collectResp = await axios.get("https://kr.api.blizzard.com/profile/user/wow/collections/toys", {
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

const convertResponseData = (res?: IWowToyResponse, collectResp?: IWowCharToyResponse) => {
  return res?.toys.map((data) => ({
    id: data?.id,
    name: data?.name,
    is_collected: !!collectResp?.toys.find((coll) => coll.toy.id === data.id) ? true : false,
  })) as IWowToy[];
}

export const generateQueryKey = () => {
  return [
    "wow",
    "toy"
  ];
}

export default useWowToyQuery;