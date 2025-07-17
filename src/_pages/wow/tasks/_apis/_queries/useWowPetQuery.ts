import { useQuery } from "react-query";
import axios from "axios";
import { IWowPet, IWowPetInfoResponse, IWowPetResponse } from "../_models/wowPet";


export const useWowPetQuery = (accessToken?: string) => {
  return useQuery<IWowPet[]>(generateQueryKey(), async () => {

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

    // 펫 전체 목록
    // https://kr.api.blizzard.com/data/wow/pet/index?namespace=static-kr&locale=ko_KR
    // 특정 펫의 정보
    // https://kr.api.blizzard.com/data/wow/pet/${petId}?namespace=static-kr&locale=ko_KR
    // 수집한 펫 목록
    // https://kr.api.blizzard.com/profile/user/wow/collections/pets?namespace=profile-kr&locale=ko_KR
    
    return convertResponseData(response.data, collectResp.data);
  }, {
    enabled: !!accessToken,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const convertResponseData = (res?: IWowPetInfoResponse, collectResp?: IWowPetResponse) => {
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