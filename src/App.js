import React from 'react';
import { ErrorBoundary } from './modules/ui';
import { ThemeSelector } from './modules/ui/themeSelector';
import { TodoModule } from './modules/todo';

const Apps = () => {
  // Adding an error boundary on the highest level,
  // to catch unexpected JS errors.
  // Because this is the highest level, we put another
  return (
    <ErrorBoundary
      message={
        'The application crashed. Please refresh your browser to proceed.'
      }>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <TodoModule />
        <ThemeSelector />
      </div>
    </ErrorBoundary>
  );
};

export default Apps;
