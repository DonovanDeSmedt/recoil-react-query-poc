import { fork, cancelled, take } from 'redux-saga/effects';
import { error } from '@dlw/dlw-logger';

export default function* rootSaga() {
  try {
    yield [];
    // wait for something catrastophic to happen
    // ==> error to bubble up to here
    yield take('SAGA_CANCELLED');
  } finally {
    if (yield cancelled()) {
      // something catrastophic happened:
      // all sagas stopped.
      // TODO: do something about it.
      error('Sagas have stopped working');
    }
  }
}
