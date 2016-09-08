/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectBetData = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('betData')
);

const selectDividends = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('dividends')
);

export {
  selectHome,
  selectBetData,
  selectDividends,
};
