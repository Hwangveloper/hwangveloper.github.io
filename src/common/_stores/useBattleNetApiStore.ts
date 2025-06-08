import { create } from 'zustand';

const BNET_CLIENT_ID = process.env.REACT_APP_BATTLE_NET_ID;  // Google OAuth 2.0 클라이언트 ID
const BNET_REDIRECT_URL = process.env.REACT_APP_BATTLE_NET_REDIRECT_URL;  // API 키 (필요한 경우)
const uuid = crypto.randomUUID();

interface BattleNetApiStore {
  accessToken: string; // 엑세스 토큰
  getAuthURL: () => string;
}

const useBattleNetApiStore = create<BattleNetApiStore>((set) => ({
  accessToken: '', // 초기 상태
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