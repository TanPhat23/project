import React, { ReactNode } from "react";

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
    // You can also log the error to a service or perform other actions
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback; // Display the fallback UI when an error occurs
    }
    return this.props.children; // Render the children components as usual
  }
}

export default ErrorBoundary;
