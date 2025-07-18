import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { WOW_CHARACTER_SHEET_RANGE } from "../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../common/_utils/sheets";
import { IWowCharacter, IWowCharacterParams, IWowCharacterResponse, IWowUserInfoCharacterResponse, IWowUserInfoResponse } from "../../characters/_apis/_models/wowCharacter";
import axios from "axios";


export const useWowCharacterQuery = (accessToken?: string, params?: IWowCharacterParams) => {
  return useQuery<IWowCharacter[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: WOW_CHARACTER_SHEET_RANGE,
      });

      const res = fnConvertTableData<IWowCharacterResponse>(response.result.values);
      
      const infoUrl = `https://kr.api.blizzard.com/profile/user/wow`;

      const charInfoResp = await axios.get(infoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          namespace: "profile-kr",
          locale: "ko_KR",
        },
      });

      return convertResponseData(res, charInfoResp.data)
    } else {
      return undefined;
    }
  }, {
    enabled: !!accessToken && !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const convertResponseData = (res: IWowCharacterResponse[] | undefined, infoRes?: IWowUserInfoResponse) => {
  return res?.map((data) => {
    const idSplit = data.id.split("@");
    const charName = idSplit[0];
    var serverName = "azshara";
    if (idSplit.length === 2) {
      serverName = idSplit[1];
    }
    var accountCharacters: IWowUserInfoCharacterResponse[] = [];
    infoRes?.wow_accounts.forEach((account) => {
      accountCharacters.concat(account.characters)
    })
    const info = infoRes?.wow_accounts[0].characters.find((info) => info.name === charName && info.realm.slug === serverName);
    return {
      ...data,
      order: Number(data.order),
      blizzardId: info?.id ?? 0,
      name: info?.name ?? '',
      job: info?.playable_class.name ?? '',
      tribe: info?.playable_race.name ?? '',
      server: info?.realm.slug ?? '',
    }
  }).sort((left, right) => left.order - right.order) as IWowCharacter[];
}

export const generateQueryKey = (params?: IWowCharacterParams) => {
  return [
    "wow",
    "character",
    params,
  ];
}

export default useWowCharacterQuery;