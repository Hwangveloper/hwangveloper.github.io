import React from 'react';
import ErrorBoundary from './layout/components/ErrorBoundary';
import Router from './router';

function App() {
  return (
    <ErrorBoundary>
        <Router />
    </ErrorBoundary>
  );
}

export default App;
