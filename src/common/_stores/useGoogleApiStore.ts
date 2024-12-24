import { create } from 'zustand';
import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;  // Google OAuth 2.0 클라이언트 ID
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;  // API 키 (필요한 경우)

interface GoogleApiState {
  authStatus: boolean; // 상태
  init: () => void; // 초기화
  signIn: () => void;
  signOut: () => void;
}

const useGoogleApiStore = create<GoogleApiState>((set) => ({
  authStatus: false, // 초기 상태
  init: () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        set((state) => ({ authStatus: authInstance.isSignedIn.get() }));
        authInstance.isSignedIn.listen((status: boolean) => {
          set((state) => ({ authStatus: status}));
        });  // 로그인 상태 변경 리스닝
      });
    });
  },
  signIn: () => {
    gapi.auth2.getAuthInstance().signIn();
  },
  signOut: () => {
    gapi.auth2.getAuthInstance().signOut();
  }
}));

export default useGoogleApiStore;