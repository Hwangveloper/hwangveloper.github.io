import { useQuery } from "react-query";
import { gapi } from 'gapi-script';
import { WOW_CHAR_ITEM_SHEET_RANGE } from "../../../../../common/_constants/sheets";
import { fnConvertTableData } from "../../../../../common/_utils/sheets";
import { ECommonYN } from "../../../../../common/_constants/common";
import { IWowCharItem, IWowCharItemParams, IWowCharItemResponse } from "../_models/wowCharacterItem";
import { EWowCharItemDataType, EWowItemType } from "../../_constants/wowCharacterItem";


export const useWowCharItemQuery = (params?: IWowCharItemParams) => {
  return useQuery<IWowCharItem[] | undefined>(generateQueryKey(params), async () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_GOOGLE_PLANNER_SHEET_ID,
        range: WOW_CHAR_ITEM_SHEET_RANGE,
      });

      return covertResponseData(fnConvertTableData<IWowCharItemResponse>(response.result.values), params);
    } else {
      return undefined;
    }
  }, {
    enabled: !!params,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const covertResponseData = (res: IWowCharItemResponse[] | undefined, params?: IWowCharItemParams) => {

  const mainChars = params?.characterList.filter((char) => char.isMain === ECommonYN.Y);

  let list: IWowCharItem[] = [];

  mainChars?.forEach((char) => {

    const charItemLevels = res?.find((data) => data.charId === char.id && data.dataType === EWowCharItemDataType.ITEM_LEVEL);
    const charItemTypes = res?.find((data) => data.charId === char.id && data.dataType === EWowCharItemDataType.ITEM_TYPE);

    list.push({
      charId: charItemLevels?.charId ?? "",
      charName: char.name,
      charJob: char.job,

      levelRowIndex: charItemLevels?.rowIndex ?? 0,
      typeRowIndex: charItemTypes?.rowIndex ?? 0,
      thWeapon1: {
        level: charItemLevels?.thWeapon1 ?? '0',
        type: charItemTypes?.thWeapon1 as EWowItemType ?? EWowItemType.ETC,
      },
      thWeapon2: {
        level: charItemLevels?.thWeapon2 ?? '0',
        type: charItemTypes?.thWeapon2 as EWowItemType ?? EWowItemType.ETC,
      },
      ohWeapon1: {
        level: charItemLevels?.ohWeapon1 ?? '0',
        type: charItemTypes?.ohWeapon1 as EWowItemType ?? EWowItemType.ETC,
      },
      ohWeapon2: {
        level: charItemLevels?.ohWeapon2 ?? '0',
        type: charItemTypes?.ohWeapon2 as EWowItemType ?? EWowItemType.ETC,
      },
      ohWeapon3: {
        level: charItemLevels?.ohWeapon3 ?? '0',
        type: charItemTypes?.ohWeapon3 as EWowItemType ?? EWowItemType.ETC,
      },
      ohWeapon4: {
        level: charItemLevels?.ohWeapon4 ?? '0',
        type: charItemTypes?.ohWeapon4 as EWowItemType ?? EWowItemType.ETC,
      },
      head: {
        level: charItemLevels?.head ?? '0',
        type: charItemTypes?.head as EWowItemType ?? EWowItemType.ETC,
      },
      neck: {
        level: charItemLevels?.neck ?? '0',
        type: charItemTypes?.neck as EWowItemType ?? EWowItemType.ETC,
      },
      shoulders: {
        level: charItemLevels?.shoulders ?? '0',
        type: charItemTypes?.shoulders as EWowItemType ?? EWowItemType.ETC,
      },
      back: {
        level: charItemLevels?.back ?? '0',
        type: charItemTypes?.back as EWowItemType ?? EWowItemType.ETC,
      },
      chest: {
        level: charItemLevels?.chest ?? '0',
        type: charItemTypes?.chest as EWowItemType ?? EWowItemType.ETC,
      },
      wrist: {
        level: charItemLevels?.wrist ?? '0',
        type: charItemTypes?.wrist as EWowItemType ?? EWowItemType.ETC,
      },
      hands: {
        level: charItemLevels?.hands ?? '0',
        type: charItemTypes?.hands as EWowItemType ?? EWowItemType.ETC,
      },
      waist: {
        level: charItemLevels?.waist ?? '0',
        type: charItemTypes?.waist as EWowItemType ?? EWowItemType.ETC,
      },
      legs: {
        level: charItemLevels?.legs ?? '0',
        type: charItemTypes?.legs as EWowItemType ?? EWowItemType.ETC,
      },
      feet: {
        level: charItemLevels?.feet ?? '0',
        type: charItemTypes?.feet as EWowItemType ?? EWowItemType.ETC,
      },
      ring1: {
        level: charItemLevels?.ring1 ?? '0',
        type: charItemTypes?.ring1 as EWowItemType ?? EWowItemType.ETC,
      },
      ring2: {
        level: charItemLevels?.ring2 ?? '0',
        type: charItemTypes?.ring2 as EWowItemType ?? EWowItemType.ETC,
      },
      trinket1: {
        level: charItemLevels?.trinket1 ?? '0',
        type: charItemTypes?.trinket1 as EWowItemType ?? EWowItemType.ETC,
      },
      trinket2: {
        level: charItemLevels?.trinket2 ?? '0',
        type: charItemTypes?.trinket2 as EWowItemType ?? EWowItemType.ETC,
      },
    });
  });

  return list;
}

export const generateQueryKey = (params?: IWowCharItemParams) => {
  return [
    "wow",
    "character",
    "item",
    params,
  ];
}

export default useWowCharItemQuery;