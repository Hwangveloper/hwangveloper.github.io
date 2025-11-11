import React from 'react';
import './App.css';
import ErrorBoundary from './common/_components/ErrorBoundary';
import Router from './_router';
import { QueryClientProvider } from '@tanstack/react-query';
import Loader from './common/_components/Loader';
import SimpleDialog from './common/_components/SimpleDialog';
import ConfirmDialog from './common/_components/ConfirmDialog';
import { queryClient } from './common/_libs/queryClient/queryClient';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Loader />
        <Router />
        <SimpleDialog />
        <ConfirmDialog />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
