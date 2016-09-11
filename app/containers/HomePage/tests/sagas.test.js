import expect from 'expect';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getDefaultData, getBetDataWatcher, betData } from '../sagas';
import { fetchDataSuccess } from '../actions';
import { FETCH_DATA } from '../constants';


describe('getDefaultData Saga', () => {
  const getDefaultDataGenerator = getDefaultData();

  it('should dispatch the fetchDataSuccess action if it requests the data successfully', () => {
    const response = {
      commission: {
        w: 0.15,
        p: 0.12,
        e: 0.18,
        q: 0.18,
      },
      rowData: [
        { w: { horse: ['1'], amount: 3 }, p: { horse: ['1'], amount: 31 }, e: { horse: ['1', '2'], amount: 13 }, q: { horse: ['1', '2'], amount: 19 } },
      ],
      resultData: ['2', '3', '1'],
    };
    const putDescriptor = getDefaultDataGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(fetchDataSuccess(response)));
  });
});

describe('getBetDataWatcher Saga', () => {
  const getBetDataWatcherGenerator = getBetDataWatcher();

  it('should watch for FETCH_DATA action', () => {
    const takeDescriptor = getBetDataWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(take(FETCH_DATA));
  });

  it('should invoke getDefaultData saga on actions', () => {
    const callDescriptor = getBetDataWatcherGenerator.next(put(FETCH_DATA)).value;
    expect(callDescriptor).toEqual(call(getDefaultData));
  });
});

describe('betData Saga', () => {
  const betDataSaga = betData();

  let forkDescriptor;

  it('should asyncronously fork getBetDataWatcher saga', () => {
    forkDescriptor = betDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getBetDataWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = betDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getBetDataWatcher saga',
    function* betDataSagaCancellable() {
      // reuse open fork for more integrated approach
      forkDescriptor = betDataSaga.next(put(LOCATION_CHANGE));
      expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
    }
  );
});
