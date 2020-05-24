import React from 'react';
// import Pokedex from './modules/pokemon/Pokedex';
// import Todos from './modules/todos/Todos';

import SearchContainer from './modules/todos/containers/search-container';
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
      <SearchContainer />
    </ErrorBoundary>
  );
};

export default Apps;
