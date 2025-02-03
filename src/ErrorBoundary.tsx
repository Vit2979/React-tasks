import React, { Component, ReactNode } from 'react';


interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    
    return { hasError: true, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {

    this.setState({
      error,
      errorInfo,
    });
    console.error('Error caught in ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Что-то пошло не так.</h2>
          <button onClick={() => this.setState({ hasError: false })}>Попробовать снова</button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
