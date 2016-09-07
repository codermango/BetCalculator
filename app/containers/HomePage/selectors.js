/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectBetData = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('betData')
);

export {
  selectHome,
  selectBetData,
};
