import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // 에러 발생 시 보여줄 UI
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
