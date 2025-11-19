import { create } from 'zustand';



interface BattleNetApiStore {
  isInit: boolean;
  accessToken: string; // 엑세스 토큰
  setAccessToken: (token: string) => void;
  initBattleNetToken: () => void;
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
}));

export default useBattleNetApiStore;