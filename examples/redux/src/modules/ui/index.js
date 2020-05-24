import ErrorBoundary from './error-boundary';
import ErrorHandler from './error-handler';
import Spinner from './spinner';

// we need to manually export the imports again
// an ECMAScript proposal is coming, currently: stage 1
// https://github.com/tc39/proposal-export-default-from
export { ErrorBoundary, ErrorHandler, Spinner };
