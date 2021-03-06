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
  AMOUNT_CHANGE,
  HORSE_CHANGE,
  COMMISSION_CHANGE,
  CALCULATE_DIVIDENDS,
  RESULT_CHANGE,
  ADD_ROW,
  REMOVE_ROW,
} from './constants';
import { fromJS } from 'immutable';
import {
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
  isInputValid: fromJS({
    data: true,
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

    case AMOUNT_CHANGE: {
      newState.rowData[action.rowIndex][action.betType].amount = action.data;
      return state
        .setIn(['betData', 'loading'], false)
        .update(['betData', 'data'], s => s)
        .setIn(['betData', 'error'], false);
    }
    case HORSE_CHANGE: {
      newState.rowData[action.rowIndex][action.betType].horse[action.horseIndex] = action.data;
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
        .setIn(['betData', 'data'], newState)
        .setIn(['betData', 'error'], false);
    }
    case CALCULATE_DIVIDENDS: {
      for (const bet of newState.rowData) {
        for (const rule in bet) {
          if (Number.isNaN(Number(bet[rule].amount))
            || bet[rule].amount === ''
            || bet[rule].horse.includes('')
          ) {
            return state
              .setIn(['isInputValid', 'data'], false);
          }
        }
      }
      return state
        .setIn(['dividends', 'w'], calcWinDividend(newState.rowData, newState.resultData, newState.commission.w, 'w'))
        .setIn(['dividends', 'p'], calcPlaceDividend(newState.rowData, newState.resultData, newState.commission.p, 'p'))
        .setIn(['dividends', 'e'], calcExactDividend(newState.rowData, newState.resultData, newState.commission.e, 'e'))
        .setIn(['dividends', 'q'], calcQuinellaDividend(newState.rowData, newState.resultData, newState.commission.q, 'q'))
        .setIn(['isInputValid', 'data'], true);
    }
    case ADD_ROW: {
      const newRow = {
        w: { horse: [''], amount: '' },
        p: { horse: [''], amount: '' },
        e: { horse: ['', ''], amount: '' },
        q: { horse: ['', ''], amount: '' },
      };
      newState.rowData.push(newRow);
      return state
        .setIn(['betData', 'loading'], false)
        .setIn(['betData', 'data'], newState)
        .setIn(['betData', 'error'], false);
    }
    case REMOVE_ROW: {
      if (newState.rowData.length > 1) {
        newState.rowData.pop();
      }
      return state
        .setIn(['betData', 'loading'], false)
        .setIn(['betData', 'data'], newState)
        .setIn(['betData', 'error'], false);
    }
    default:
      return state;
  }
}

export default homeReducer;
