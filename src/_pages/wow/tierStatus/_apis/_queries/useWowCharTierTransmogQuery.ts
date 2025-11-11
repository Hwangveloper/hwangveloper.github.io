import { useQuery } from "@tanstack/react-query";
import { gapi } from 'gapi-script';
import { WOW_CHAR_TIER_TRANSMOG_SHEET_RANGE } from "../../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../../common/_utils/sheets";
import { ECommonYN } from "../../../../../common/_constants/common";
import { IWowCharTierTransmog, IWowCharTierTransmogParams, IWowCharTierTransmogResponse, IWowTierTransmog } from "../_models/wowTierTransmog";
import { EWowCollectionStatus, EWowRaidType } from "../../_constants/wowTierTransmog";


export const useWowCharTierTransmogQuery = (params?: IWowCharTierTransmogParams) => {
  return useQuery<IWowCharTierTransmog[] | undefined>({
    queryKey: generateQueryKey(params),
    queryFn: async () => {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        const response = await gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
          range: WOW_CHAR_TIER_TRANSMOG_SHEET_RANGE,
        });

        return covertResponseData(fnConvertTableData<IWowCharTierTransmogResponse>(response.result.values), params);
      } else {
        return undefined;
      }
    },
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IWowCharTierTransmogResponse[] | undefined, params?: IWowCharTierTransmogParams) => {

  const mainChars = params?.characterList.filter((char) => char.isMain === ECommonYN.Y);

  let list: IWowCharTierTransmog[] = [];

  mainChars?.forEach((char) => {

    const raidFinderTiers = res?.find((data) => data.charId === char.id && data.raidType === EWowRaidType.RAID_FINDER);
    const normalTiers = res?.find((data) => data.charId === char.id && data.raidType === EWowRaidType.NORMAL);
    const heroicTiers = res?.find((data) => data.charId === char.id && data.raidType === EWowRaidType.HEROIC);
    const mythicTiers = res?.find((data) => data.charId === char.id && data.raidType === EWowRaidType.MYTHIC);

    const tierTransmogs: IWowCharTierTransmog = {
      charId: char.id,
      charName: char.name,
      charJob: char.job,
      raidTierTransmog: new Map<EWowRaidType, IWowTierTransmog>(),
    };

    if (raidFinderTiers)
      tierTransmogs.raidTierTransmog.set(EWowRaidType.RAID_FINDER, convertRaidTierTransmogs(raidFinderTiers));
    if (normalTiers)
      tierTransmogs.raidTierTransmog.set(EWowRaidType.NORMAL, convertRaidTierTransmogs(normalTiers));
    if (heroicTiers)
      tierTransmogs.raidTierTransmog.set(EWowRaidType.HEROIC, convertRaidTierTransmogs(heroicTiers));
    if (mythicTiers)
      tierTransmogs.raidTierTransmog.set(EWowRaidType.MYTHIC, convertRaidTierTransmogs(mythicTiers));

    list.push(tierTransmogs);
  });

  return list;
}

const convertRaidTierTransmogs = (res: IWowCharTierTransmogResponse) => {
  return {
    rowIndex: res.rowIndex,

    head: res.head as EWowCollectionStatus ?? EWowCollectionStatus.NOT_FIND,
    shoulders: res.shoulders as EWowCollectionStatus ?? EWowCollectionStatus.NOT_FIND,
    back: res.back as EWowCollectionStatus ?? EWowCollectionStatus.NOT_FIND,
    chest: res.chest as EWowCollectionStatus ?? EWowCollectionStatus.NOT_FIND,
    wrist: res.wrist as EWowCollectionStatus ?? EWowCollectionStatus.NOT_FIND,
    hands: res.hands as EWowCollectionStatus ?? EWowCollectionStatus.NOT_FIND,
    waist: res.waist as EWowCollectionStatus ?? EWowCollectionStatus.NOT_FIND,
    legs: res.legs as EWowCollectionStatus ?? EWowCollectionStatus.NOT_FIND,
    feet: res.feet as EWowCollectionStatus ?? EWowCollectionStatus.NOT_FIND,
  } as IWowTierTransmog;
}

export const generateQueryKey = (params?: IWowCharTierTransmogParams) => {
  return [
    "wow",
    "character",
    "tier",
    "transmog",
    params,
  ];
}

export default useWowCharTierTransmogQuery;