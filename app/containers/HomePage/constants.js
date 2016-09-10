/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

export const AMOUNT_CHANGE = 'AMOUNT_CHANGE';
export const HORSE_CHANGE = 'HORSE_CHANGE';
export const COMMISSION_CHANGE = 'COMMISSION_CHANGE';
export const RESULT_CHANGE = 'RESULT_CHANGE';

export const ADD_ROW = 'ADD_ROW';
export const CALCULATE_DIVIDENDS = 'CALCULATE_DIVIDENDS';
