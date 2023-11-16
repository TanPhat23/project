import React, { ReactNode } from "react";

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};
class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.fallback;
  }
}
export default ErrorBoundary;
