import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { error as logError } from '@dlw/dlw-logger';
import uuidv4 from 'uuid/v4';

class ErrorBoundary extends Component {
  static propTypes = {
    error: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      componentDidCatch: false,
      crashId: uuidv4(),
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { componentDidCatch: true };
  }

  componentDidCatch(error, info) {
    logError({
      message: 'A component crashed',
      properties: { error, info, crashId: this.state.crashId },
    });
  }

  renderFallbackMessage = () => {
    // this logic will be executed when an unexpected error occurred.
    // it will be triggered by the error boundary.
    const { componentDidCatch, crashId } = this.state;
    const { message } = this.props;

    // This message will only be shown in the crashed part of the application.
    if (componentDidCatch) {
      return (
        <>
          <h1>{message || 'It seems like something went wrong here.'}</h1>
          <h3>An exception was logged with id {crashId}</h3>
        </>
      );
    }

    return null;
  };

  render() {
    const { componentDidCatch } = this.state;
    if (componentDidCatch) {
      return this.renderFallbackMessage();
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
