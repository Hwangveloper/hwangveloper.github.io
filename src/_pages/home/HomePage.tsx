import React, { useEffect } from 'react';
import TodoList from './_components/TodoList';
import { useNavigate } from 'react-router-dom';
import useBattleNetApiStore from '../../common/_stores/useBattleNetApiStore';
import { useShallow } from 'zustand/shallow';
import axios from 'axios';


const HomePage: React.FC = () => {

  const navigate = useNavigate();

  const { accessToken } = useBattleNetApiStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  useEffect(() => {
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

        navigate("/wow");
      } catch (error) {
        console.error('Access token 요청 실패:', error);
      }
    };

    if (code) fetchToken();
  }, [accessToken, navigate]);

  return (
    <TodoList />
  );
};

export default HomePage;
