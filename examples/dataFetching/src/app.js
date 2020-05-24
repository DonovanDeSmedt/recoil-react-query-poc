import React from 'react';
import TodoExample from './modules/todos/TodoExample';
import { ErrorBoundary } from './modules/ui';

const Apps = () => {
  // Adding an error boundary on the highest level,
  // to catch unexpected JS errors.
  // Because this is the highest level, we put another
  return (
    <ErrorBoundary
      message={
        'The application crashed. Please refresh your browser to proceed.'
      }
    >
      <TodoExample />
    </ErrorBoundary>
  );
};

export default Apps;
