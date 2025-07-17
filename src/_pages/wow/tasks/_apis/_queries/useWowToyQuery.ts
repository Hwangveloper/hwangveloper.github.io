import { useQuery } from "react-query";
import axios from "axios";
import { IWowToy, IWowToyInfoResponse, IWowToyResponse } from "../_models/wowToy";


export const useWowToyQuery = (accessToken?: string) => {
  return useQuery<IWowToy[]>(generateQueryKey(), async () => {

    // 장난감 전체 목록
    const response = await axios.get("https://kr.api.blizzard.com/data/wow/toy/index", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: "static-kr",
        locale: "ko_KR",
      },
    });

    // 수집한 장난감 목록
    const collectResp = await axios.get("https://kr.api.blizzard.com/profile/user/wow/collections/toys", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: "profile-kr",
        locale: "ko_KR",
      },
    });

    // 장난감 전체 목록
    // https://kr.api.blizzard.com/data/wow/toy/index?namespace=static-kr&locale=ko_KR
    // 특정 장난감의 수집방법
    // https://kr.api.blizzard.com/data/wow/toy/${toyId}?namespace=static-kr&locale=ko_KR
    // 수집한 장난감 목록
    // https://kr.api.blizzard.com/profile/user/wow/collections/toys?namespace=profile-kr&locale=ko_KR

    return convertResponseData(response.data, collectResp.data);
  }, {
    enabled: !!accessToken,
    refetchOnWindowFocus: false, // 화면 포커스 시 다시 가져오지 않음
  });
}

const convertResponseData = (res?: IWowToyInfoResponse, collectResp?: IWowToyResponse) => {
  return res?.toys.map((data) => ({
    id: data?.id,
    name: data?.name,
    is_collected: collectResp?.toys.find((coll) => coll.toy.id === data.id) !== null ? true : false,
  })) as IWowToy[];
}

export const generateQueryKey = () => {
  return [
    "wow",
    "toy"
  ];
}

export default useWowToyQuery;