import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IWowCharacterMythicRecord, IWowCharacterMythicRecordResponse, IWowCharacterSeasonRecord, IWowCharacterSeasonRecordResponse, IWowMythicDungeonRecordParams } from "../_models/wowKeystone";
import { IWowDungeon } from "../_models/wowDungeon";


export const useWowMythicDungeonRecordQuery = (accessToken?: string, params?: IWowMythicDungeonRecordParams) => {
  return useQuery<IWowCharacterMythicRecord>({
    queryKey: generateQueryKey(params),
    queryFn: async () => {

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

      const seasonUrl = `https://kr.api.blizzard.com/profile/wow/character/${params?.realm}/${params?.charName}/mythic-keystone-profile/season/${params?.seasonNo}`;

      const seasonResp = await axios.get(seasonUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          namespace: "profile-kr",
          locale: "ko_KR",
        },
      });

      return convertResponseData(response.data, seasonResp.data, params?.charJob, params?.dungeonList);
    },
    enabled: !!accessToken,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const convertResponseData = (res?: IWowCharacterMythicRecordResponse, seasonRes?: IWowCharacterSeasonRecordResponse, charJob?: string, dungeonList?: IWowDungeon[]) => {

  const seasonRecords = dungeonList?.map((dungeon) => {
    const seasonRec = seasonRes?.best_runs?.filter((run) => run.dungeon.id === dungeon.blizzardId)
      .sort((left, right) => {
        if (left.keystone_level !== right.keystone_level) {
          return right.keystone_level - left.keystone_level;
        }
        return right.is_completed_within_time ? 1 : -1; 
      }) ?? [];
    
    return {
      dungeonId: dungeon.id,
      blizzardDungeonId: dungeon.blizzardId,
      dungeonName: dungeon.name,
      clearLevel: seasonRec.find((rec) => rec.is_completed_within_time)?.keystone_level ?? 0,
      completeLevel: (seasonRec.length ?? 0) > 0 ? seasonRec[0].keystone_level : 0,
    } as IWowCharacterSeasonRecord;
  });
  
  return {
    charId: res?.character.name,
    charName: res?.character.name,
    charJob: charJob,
    charRealm: res?.character.realm.slug,
    mythicRating: Math.round(res?.current_mythic_rating?.rating ?? 0),
    currRuns: res?.current_period.best_runs?.map((run) => ({
      dungeonName: run.dungeon.name,
      isClear: run.is_completed_within_time,
      level: run.keystone_level,
    })) ?? [],
    seasonRecords,
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