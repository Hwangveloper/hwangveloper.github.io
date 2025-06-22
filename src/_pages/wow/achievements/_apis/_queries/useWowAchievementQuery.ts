import { useQuery } from "react-query";
import axios from "axios";
import { IWowAchievement, IWowAchievementParams, IWowAchievementResponse } from "../_models/wowAchievement";


export const useWowAchievementQuery = (accessToken?: string, params?: IWowAchievementParams) => {
  return useQuery<IWowAchievement[]>(generateQueryKey(params), async () => {

    const url = `https://kr.api.blizzard.com/profile/wow/character/${params?.realm}/${params?.charName}/achievements`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: "profile-kr",
        locale: "ko_KR",
      },
    });

    return convertResponseData(response.data.achievements);
  }, {
    enabled: !!accessToken,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const convertResponseData = (res?: IWowAchievementResponse[]) => {
  return res?.map((data) => ({
    id: data?.id,
    link: data?.achievement.key.href,
    name: data?.achievement.name,
    isCompleted: data?.criteria?.is_completed ?? false,
  })) as IWowAchievement[];
}

export const generateQueryKey = (params?: IWowAchievementParams) => {
  return [
    "wow",
    "achievement",
    params,
  ];
}

export default useWowAchievementQuery;