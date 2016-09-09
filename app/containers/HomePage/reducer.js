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
  TEXT_CHANGE,
  COMMISSION_CHANGE,
  CALCULATE_DIVIDENDS,
  RESULT_CHANGE,
} from './constants';
import { fromJS } from 'immutable';
import {
  calculator,
  calcWinDividend,
  calcPlaceDividend,
  calcExactDividend,
  calcQuinellaDividend,
} from './calculator';

// The initial state of the App
const initialState = fromJS({
  betData: fromJS({
    loading: false,
    data: false,
    error: false,
  }),
  dividends: fromJS({
    w: false,
    p: false,
    e: false,
    q: false,
  }),
});

function homeReducer(state = initialState, action) {
  const newState = Object.assign({}, state.get('betData').get('data'));
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

    case TEXT_CHANGE: {
      newState.rowData[action.rowIndex][action.betType][action.field] = action.data;
      return state
        .setIn(['betData', 'loading'], false)
        .update(['betData', 'data'], s => s)
        .setIn(['betData', 'error'], false);
    }
    case COMMISSION_CHANGE: {
      newState.commission[action.betType] = action.data;
      return state
        .setIn(['betData', 'loading'], false)
        .update(['betData', 'data'], s => s)
        .setIn(['betData', 'error'], false);
    }
    case RESULT_CHANGE: {
      newState.resultData[action.index] = action.data;
      return state
        .setIn(['betData', 'loading'], false)
        .update(['betData', 'data'], s => s)
        .setIn(['betData', 'error'], false);
    }
    case CALCULATE_DIVIDENDS: {
      return state
        .setIn(['dividends', 'w'], calculator(newState.rowData, newState.resultData, newState.commission.w, 'w', calcWinDividend))
        .setIn(['dividends', 'p'], calculator(newState.rowData, newState.resultData, newState.commission.p, 'p', calcPlaceDividend))
        .setIn(['dividends', 'e'], calculator(newState.rowData, newState.resultData, newState.commission.e, 'e', calcExactDividend))
        .setIn(['dividends', 'q'], calculator(newState.rowData, newState.resultData, newState.commission.q, 'q', calcQuinellaDividend));
    }
    default:
      return state;
  }
}

export default homeReducer;
