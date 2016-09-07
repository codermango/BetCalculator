/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  betData: fromJS({
    loading: false,
    data: false,
    error: false,
  }),
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return state
        .setIn(['betData', 'loading'], true)
        .setIn(['betData', 'error'], false);
    case FETCH_DATA_SUCCESS:
      return state
        .setIn(['betData', 'loading'], false)
        .setIn(['betData', 'data'], action.data)
        .setIn(['betData', 'error'], false);
    case FETCH_DATA_ERROR:
      return state
        .setIn(['betData', 'loading'], false)
        .setIn(['betData', 'data'], false)
        .setIn(['betData', 'error'], action.error);
    default:
      return state;
  }
}

export default homeReducer;
