import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IWowToyInfo, IWowToyInfoParams, IWowToyInfoResponse } from "../_models/wowToy";


export const useWowToyInfoQuery = (accessToken?: string, params?: IWowToyInfoParams) => {
  return useQuery<IWowToyInfo>({
    queryKey: generateQueryKey(params),
    queryFn: async () => {

      // 특정 장난감의 수집방법
      const response = await axios.get(`https://kr.api.blizzard.com/data/wow/toy/${params?.toyId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          namespace: "static-kr",
          locale: "ko_KR",
        },
      });
      
      return convertResponseData(response.data);
    },
    enabled: !!accessToken && !!params?.toyId,
  });
}

const convertResponseData = (res?: IWowToyInfoResponse) => {
  return {
    id: res?.id,
    name: res?.item.name,
    description: res?.source_description,
    source: res?.source.name,
  } as IWowToyInfo;
}

export const generateQueryKey = (params?: IWowToyInfoParams) => {
  return [
    "wow",
    "toy",
    "info",
    params,
  ];
}

export default useWowToyInfoQuery;