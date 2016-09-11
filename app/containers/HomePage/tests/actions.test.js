import expect from 'expect';

import {
  AMOUNT_CHANGE,
} from '../constants';

import {
  amountChange,
} from '../actions';

describe('Home Actions', () => {
  describe('amountChange', () => {
    it('should return the correct result', () => {
      const data = '3';
      const rowIndex = '0';
      const betType = 'w';
      const expectedResult = {
        type: AMOUNT_CHANGE,
        data,
        rowIndex,
        betType,
      };
      expect(amountChange(data, rowIndex, betType)).toEqual(expectedResult);
    });
  });
});
