/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
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


export function fetchData() {
  return {
    type: FETCH_DATA,
  };
}

export function fetchDataSuccess(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    data,
  };
}

export function fetchDataError(error) {
  return {
    type: FETCH_DATA_ERROR,
    error,
  };
}

export function amountChange(data, rowIndex, betType) {
  return {
    type: AMOUNT_CHANGE,
    data,
    rowIndex,
    betType,
  };
}

export function horseChange(data, rowIndex, betType, horseIndex) {
  return {
    type: HORSE_CHANGE,
    data,
    rowIndex,
    betType,
    horseIndex,
  };
}

export function commissionChange(data, betType) {
  return {
    type: COMMISSION_CHANGE,
    data,
    betType,
  };
}

export function resultChange(data, index) {
  return {
    type: RESULT_CHANGE,
    data,
    index,
  };
}

export function calculateDividends() {
  return {
    type: CALCULATE_DIVIDENDS,
  };
}

export function addRow() {
  return {
    type: ADD_ROW,
  };
}

export function removeRow() {
  return {
    type: REMOVE_ROW,
  };
}
