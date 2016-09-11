import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectHome,
  selectBetData,
  selectDividends,
  selectIsInputValid,
} from '../selectors';

describe('selectHome', () => {
  const homeSelector = selectHome();
  it('should select the home state', () => {
    const homeState = fromJS({
      state: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(homeSelector(mockedState)).toEqual(homeState);
  });
});

describe('selectBetData', () => {
  const betDataSelector = selectBetData();
  it('should select betData', () => {
    const betData = fromJS({
      loading: false,
      data: false,
      error: false,
    });
    const mockedState = fromJS({
      home: {
        betData,
      },
    });
    expect(betDataSelector(mockedState)).toEqual(betData);
  });
});

describe('selectDividends', () => {
  const dividendsSelector = selectDividends();
  it('should select dividends', () => {
    const dividends = fromJS({
      w: false,
      p: false,
      e: false,
      q: false,
    });
    const mockedState = fromJS({
      home: {
        dividends,
      },
    });
    expect(dividendsSelector(mockedState)).toEqual(dividends);
  });
});

describe('selectIsInputValid', () => {
  const isInputValidSelector = selectIsInputValid();
  it('should select isInputValid', () => {
    const isInputValid = fromJS({
      loading: false,
      data: false,
      error: false,
    });
    const mockedState = fromJS({
      home: {
        isInputValid,
      },
    });
    expect(isInputValidSelector(mockedState)).toEqual(isInputValid);
  });
});
