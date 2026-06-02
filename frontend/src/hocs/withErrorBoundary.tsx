/**
 * Higher Order Component: withErrorBoundary
 * Wraps a component with error boundary functionality
 * Logs errors to console and handles fallback UI
 */

import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log to console in development
    console.error('Error caught by boundary:', error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, you could log to Sentry or other service:
    // Sentry.captureException(error, { contexts: { errorInfo } });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * HOC that wraps a component with ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void,
): React.ComponentType<P> {
  const WrappedComponent = (props: P): React.ReactElement => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}

export default ErrorBoundary;
