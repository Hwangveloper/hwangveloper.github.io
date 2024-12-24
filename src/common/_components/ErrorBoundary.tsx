import React, { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../_models/errorBoundary';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // 에러 발생 시 상태를 업데이트
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 에러 로깅
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 에러 발생 시 대체 UI 렌더링
      return this.props.fallback ?? <div>ERROR!!</div>;
    }
    // 에러가 없을 때는 자식 컴포넌트 렌더링
    return this.props.children;
  }
}

export default ErrorBoundary;