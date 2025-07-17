import { useQuery } from "react-query";
import axios from "axios";
import { IWowAchievementCriteria, IWowAchievementCriteriaResponse, IWowAchievementInfo, IWowAchievementInfoParams, IWowAchievementInfoResponse } from "../_models/wowAchievement";


export const useWowAchievementInfoQuery = (accessToken?: string, params?: IWowAchievementInfoParams) => {
  return useQuery<IWowAchievementInfo>(generateQueryKey(params), async () => {

    // 펫 전체 목록
    // https://kr.api.blizzard.com/data/wow/pet/index?namespace=static-kr&locale=ko_KR
    // 특정 펫의 정보
    // https://kr.api.blizzard.com/data/wow/pet/${petId}?namespace=static-kr&locale=ko_KR
    // 수집한 펫 목록
    // https://kr.api.blizzard.com/profile/user/wow/collections/pets?namespace=profile-kr&locale=ko_KR
    
    const response = await axios.get(`https://kr.api.blizzard.com/data/wow/achievement/${params?.achievementId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: "static-11.1.7_61131-kr",
        locale: "ko_KR",
      },
    });

    return convertResponseData(response.data);
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const convertResponseData = (res?: IWowAchievementInfoResponse) => {
  return {
    id: res?.id,
    name: res?.name,
    description: res?.description,
    criteria: convertCriteriaData(res?.criteria),
  } as IWowAchievementInfo;
}

const convertCriteriaData = (data?: IWowAchievementCriteriaResponse) => {
  return !!data ? {
    id: data.id,
    description: data.description,
    amount: data.amount,
    childCriteria: data.child_criteria?.map((child) => ({
      id: child.id,
      description: child.description,
      amount: child.amount,
    })),
  } as IWowAchievementCriteria : undefined;
}

export const generateQueryKey = (params?: IWowAchievementInfoParams) => {
  return [
    "wow",
    "achievement",
    "info",
    params,
  ];
}

export default useWowAchievementInfoQuery;