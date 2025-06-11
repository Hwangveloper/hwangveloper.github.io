import { create } from 'zustand';

const BNET_CLIENT_ID = process.env.REACT_APP_BATTLE_NET_ID;  // Google OAuth 2.0 클라이언트 ID
const BNET_REDIRECT_URL = process.env.REACT_APP_BATTLE_NET_REDIRECT_URL;  // API 키 (필요한 경우)
const uuid = crypto.randomUUID();

interface BattleNetApiStore {
  isInit: boolean;
  accessToken: string; // 엑세스 토큰
  setAccessToken: (token: string) => void;
  initBattleNetToken: () => void;
  getAuthURL: () => string;
}

const useBattleNetApiStore = create<BattleNetApiStore>((set, get) => ({
  isInit: false,
  accessToken: '', // 초기 상태
  initBattleNetToken: () => {
    const savedToken = localStorage.getItem("battleNetToken");
    if (savedToken) {
      set({
        isInit: true,
        accessToken: savedToken
      });
    } else {
      set({isInit: true});
    }
  },
  setAccessToken: (token: string) => {
    localStorage.setItem("battleNetToken", token);
    set({accessToken: token});
  },
  getAuthURL: () => {
    const params = new URLSearchParams({
      client_id: BNET_CLIENT_ID ?? '',
      redirect_uri: BNET_REDIRECT_URL ?? '',
      response_type: 'code',
      scope: 'wow.profile',
      state: uuid,
    });
    return `https://oauth.battle.net/authorize?${params.toString()}`;
  },
}));

export default useBattleNetApiStore;