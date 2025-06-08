import { useQuery } from "react-query";
import { IWowMythicDungeonRecordParams } from "../../../_apis/_models/wowMaster";
import axios from "axios";
import { IWowCharacterMythicRecord, IWowCharacterMythicRecordResponse } from "../_models/wowKeystone";


export const useWowMythicDungeonRecordQuery = (accessToken?: string, params?: IWowMythicDungeonRecordParams) => {
  return useQuery<IWowCharacterMythicRecord>(generateQueryKey(params), async () => {

    const url = `https://kr.api.blizzard.com/profile/wow/character/${params?.realm}/${params?.charName}/mythic-keystone-profile`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: "profile-kr",
        locale: "ko_KR",
      },
    });

    return convertResponseData(response.data);
  }, {
    enabled: !!accessToken,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const convertResponseData = (res?: IWowCharacterMythicRecordResponse) => {
  return {
    charName: res?.character.name,
    charRealm: res?.character.realm.slug,
    mythicRating: res?.current_mythic_rating.rating,
    currRuns: res?.current_period.best_runs?.map((run) => ({
      dungeonName: run.dungeon.name,
      isClear: run.is_completed_within_time,
      level: run.keystone_level,
    })) ?? [],
  } as IWowCharacterMythicRecord;
}

export const generateQueryKey = (params?: IWowMythicDungeonRecordParams) => {
  return [
    "wow",
    "mythic",
    "dungeon",
    "record",
    params,
  ];
}

export default useWowMythicDungeonRecordQuery;