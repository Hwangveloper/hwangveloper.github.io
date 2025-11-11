import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IWowCharPetResponse, IWowPet, IWowPetResponse } from "../_models/wowPet";


export const useWowPetQuery = (accessToken?: string) => {
  return useQuery<IWowPet[]>({
    queryKey: generateQueryKey(),
    queryFn: async () => {

      // 펫 전체 목록
      const response = await axios.get("https://kr.api.blizzard.com/data/wow/pet/index", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          namespace: "static-kr",
          locale: "ko_KR",
        },
      });

      // 수집한 펫 목록
      const collectResp = await axios.get("https://kr.api.blizzard.com/profile/user/wow/collections/pets", {
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

const convertResponseData = (res?: IWowPetResponse, collectResp?: IWowCharPetResponse) => {
  return res?.pets.map((data) => {
    const collectList = collectResp?.pets.filter((pet) => pet.species.id === data.id).map((pet) => ({
      level: pet.level,
      qualityName: pet.quality.name,
      isFavorite: pet.is_favorite,
    }));

    return {
      id: data?.id,
      name: data?.name,
      collected: collectList,
    };
  }) as IWowPet[];
}

export const generateQueryKey = () => {
  return [
    "wow",
    "pet"
  ];
}

export default useWowPetQuery;