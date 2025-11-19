import axios, { AxiosInstance } from 'axios';

const BNET_CLIENT_ID = process.env.REACT_APP_BATTLE_NET_ID;  // Google OAuth 2.0 클라이언트 ID
const BNET_REDIRECT_URL = process.env.REACT_APP_BATTLE_NET_REDIRECT_URL;  // API 키 (필요한 경우)
const uuid = crypto.randomUUID();

export const battleNetClient: AxiosInstance = axios.create({
  baseURL: 'https://kr.api.blizzard.com',
  params: {
    namespace: "profile-kr",
    locale: "ko_KR",
  },
});

export const getLocalAccessToken = () => {
  return localStorage.getItem("battleNetToken");
}

export const getAuthURL = () => {
  const params = new URLSearchParams({
      client_id: BNET_CLIENT_ID ?? '',
      redirect_uri: BNET_REDIRECT_URL ?? '',
      response_type: 'code',
      scope: 'wow.profile',
      state: uuid,
    });
    return `https://oauth.battle.net/authorize?${params.toString()}`;
}

battleNetClient.interceptors.request.use((config) => {
  const token = getLocalAccessToken();

  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    } as any;
  }
  return config;
});

battleNetClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    const originalRequest = error?.config ?? {};
    if (originalRequest.__bnetAuthTried) {
      return Promise.reject(error);
    }

    const token = getLocalAccessToken();
    const needsAuth = status === 401 || !token;

    if (needsAuth && typeof window !== 'undefined') {
      try {
        originalRequest.__bnetAuthTried = true;
        const authUrl = getAuthURL();

        window.location.href = authUrl;

        return new Promise(() => {});
      } catch (_) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default battleNetClient;