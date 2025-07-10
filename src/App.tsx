import React from 'react';
import './App.css';
import ErrorBoundary from './common/_components/ErrorBoundary';
import Router from './_router';
import { QueryClient, QueryClientProvider } from 'react-query';
import Loader from './common/_components/Loader';
import SimpleDialog from './common/_components/SimpleDialog';
import ConfirmDialog from './common/_components/ConfirmDialog';

const queryClient = new QueryClient();

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
