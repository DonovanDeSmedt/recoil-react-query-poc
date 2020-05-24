import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const logger = createLogger({});
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(rootReducer) {
  let createStoreWithMiddleware;
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    createStoreWithMiddleware = composeEnhancers(
      applyMiddleware(sagaMiddleware, thunk, logger),
    )(createStore);
  } else {
    createStoreWithMiddleware = compose(applyMiddleware(sagaMiddleware, thunk))(
      createStore,
    );
  }

  const store = createStoreWithMiddleware(rootReducer);
  sagaMiddleware.run(rootSaga);
  return store;
}
