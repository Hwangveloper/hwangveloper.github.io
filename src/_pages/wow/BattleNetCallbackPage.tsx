import React, { useEffect } from 'react';
import axios from 'axios';
import useBattleNetApiStore from '../../common/_stores/useBattleNetApiStore';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

const BattleNetCallbackPage: React.FC = () => {

  const navigate = useNavigate();

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  useEffect(() => {
    if (accessToken) {
      navigate("/wow");
      return;
    }

    const code = new URLSearchParams(window.location.search).get('code') ?? '';

    const fetchToken = async () => {
      try {
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', process.env.REACT_APP_BATTLE_NET_REDIRECT_URL ?? '');

        const auth = btoa(`${process.env.REACT_APP_BATTLE_NET_ID}:${process.env.REACT_APP_BATTLE_NET_SECRET}`);

        const response = await axios.post(
          'https://kr.battle.net/oauth/token',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${auth}`,
            },
          }
        );

        useBattleNetApiStore.setState({
          accessToken: response.data.access_token,
        });
      } catch (error) {
        console.error('Access token 요청 실패:', error);
      }
    };

    if (code) fetchToken();
  }, [accessToken, navigate]);

  return (
    <div className="p-8 text-center">
      {accessToken ? (
        <p className="text-green-600">Access Token: {accessToken}</p>
      ) : (
        <p>토큰 요청 중...</p>
      )}
    </div>
  );
};

export default BattleNetCallbackPage;
