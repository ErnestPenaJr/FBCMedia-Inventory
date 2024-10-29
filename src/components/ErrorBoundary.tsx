import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong</Alert.Heading>
          <p>{this.state.error?.message}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try again
            </button>
          </div>
        </Alert>
      );
    }

    return this.props.children;
  }
}