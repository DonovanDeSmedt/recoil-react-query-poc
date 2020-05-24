import { takeLatest, put, call, fork } from 'redux-saga/effects';
import callApi from 'utils/api';
import * as actionTypes from './constants';

import {
  searchSuccess,
  searchFailure,
  searchByTypeSuccess,
  searchByTypeFailure,
} from './search-actions';

export function* doSearch(action) {
  try {
    const { searchValue } = action.payload;
    const pageSize = 6;
    const options = {
      endpoint: `search?pageSize=${pageSize}`,
      options: {
        method: 'POST',
        body: JSON.stringify({
          query: searchValue,
        }),
        errorMessage: `Could not fetch search results for ${searchValue}`,
        retryAction: action,
      },
    };
    const results = yield call(callApi, options);
    yield put(searchSuccess(results));
  } catch (err) {
    yield put(searchFailure(err));
  }
}

export function* doSearchByType(action) {
  try {
    const { type, searchValue, page } = action.payload;
    const pageSize = 24;
    const options = {
      endpoint: `search/${type}?pageSize=${pageSize}&page=${page}`,
      options: {
        method: 'POST',
        body: JSON.stringify({
          query: searchValue,
        }),
        errorMessage: `Could not fetch search results for ${searchValue}`,
        retryAction: action,
      },
    };
    const results = yield call(callApi, options);
    yield put(searchByTypeSuccess({ results, activePage: action.payload.page }));
  } catch (err) {
    yield put(searchByTypeFailure(err));
  }
}

function* watchSearch() {
  yield takeLatest(actionTypes.SEARCH_REQUEST, doSearch);
}

function* watchSearchByType() {
  yield takeLatest(actionTypes.SEARCH_BY_TYPE_REQUEST, doSearchByType);
}

export default function* searchFlow() {
  yield [fork(watchSearch), fork(watchSearchByType)];
}
