import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actionTypes from './constants';
import overviewReducer from './overview/search-results-overview-reducer';
import typeReducer from './type/search-results-type-reducer';

export const searchValue = handleActions({
  [actionTypes.SEARCH_REQUEST]: (state, action) => action.payload.searchValue,
  [actionTypes.SEARCH_BY_TYPE_REQUEST]: (state, action) => action.payload.searchValue,
  [actionTypes.CLEAR_SEARCH]: () => '',
}, '');

export default combineReducers({
  searchValue,
  overview: overviewReducer,
  type: typeReducer,
});
