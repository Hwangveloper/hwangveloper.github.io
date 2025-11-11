import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IWowPetInfo, IWowPetInfoParams, IWowPetInfoResponse } from "../_models/wowPet";


export const useWowPetInfoQuery = (accessToken?: string, params?: IWowPetInfoParams) => {
  return useQuery<IWowPetInfo>({
    queryKey: generateQueryKey(params),
    queryFn: async () => {

      // 특정 펫 정보
      const response = await axios.get(`https://kr.api.blizzard.com/data/wow/pet/${params?.petId}`, {
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
    enabled: !!accessToken && !!params?.petId,
  });
}

const convertResponseData = (res?: IWowPetInfoResponse) => {
  return {
    id: res?.id,
    name: res?.name,
    description: res?.description,
    source: res?.source.name,
  } as IWowPetInfo;
}

export const generateQueryKey = (params?: IWowPetInfoParams) => {
  return [
    "wow",
    "pet",
    "info",
    params,
  ];
}

export default useWowPetInfoQuery;