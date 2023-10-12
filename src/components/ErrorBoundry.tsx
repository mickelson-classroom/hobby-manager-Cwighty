import React, { Component, } from "react";
import { ErrorPage } from "./ErrorPage";

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
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}
