import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import useLoader from '../_stores/useLoader';
import { useShallow } from 'zustand/shallow';

const Loader: React.FC = () => {
  const isLoading = useLoader(
    useShallow((state) => state.isLoading)
  );

  return (
    <>
      {isLoading && <Box 
        sx={{
          position: 'fixed', // 화면 전체를 덮도록 고정
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // 반투명 검정 배경
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1300, // MUI 기본 zIndex보다 높게 설정
        }}
      >
        <CircularProgress />
      </Box> }
    </>
    
  );
};

export default Loader;