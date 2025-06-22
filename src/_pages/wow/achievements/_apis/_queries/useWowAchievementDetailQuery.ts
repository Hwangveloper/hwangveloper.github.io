import { useQuery } from "react-query";
import axios from "axios";
import { IWowAchievement, IWowAchievementResponse } from "../_models/wowAchievement";


export const useWowAchievementDetailQuery = (accessToken?: string, href?: string) => {
  return useQuery<IWowAchievement[]>(generateQueryKey(href), async () => {

    const response = await axios.get(href ?? '', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: "profile-kr",
        locale: "ko_KR",
      },
    });

    console.log(response.data);

    return response.data;
  }, {
    enabled: !!href,
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

export const generateQueryKey = (href?: string) => {
  return [
    "wow",
    "achievement",
    "detail",
    href,
  ];
}

export default useWowAchievementDetailQuery;