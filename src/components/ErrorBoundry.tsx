import React, { Component } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: new Error() };
  }

  static getDerivedStateFromError(error: Error) {
    console.log("hasError", error);
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h1>Something went wrong. So soory bout that!</h1>
          <h2>Here are the details:</h2>
          <div className="border border-danger p-3">
            <p className="text-info">{this.state.error.message}</p>
            <p className="text-info">{this.state.error.stack}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
