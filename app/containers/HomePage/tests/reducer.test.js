import expect from 'expect';
import homeReducer from '../reducer';
// import {
//   fetchData,
//   amountChange,
// } from '../actions';
import { fromJS } from 'immutable';

describe('homeReducer', () => {
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

  it('should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual(initialState);
  });
});
