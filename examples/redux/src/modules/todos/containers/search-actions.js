import { createAction } from 'redux-actions';
import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from './constants';

export const search = createAction(SEARCH_REQUEST);
export const searchSuccess = createAction(SEARCH_SUCCESS);
export const searchFailure = createAction(SEARCH_FAILURE);
