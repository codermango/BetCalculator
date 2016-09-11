import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { HomePage } from '../index';
import {
  fetchData,
  amountChange,
  horseChange,
  commissionChange,
  resultChange,
  calculateDividends,
  addRow,
  removeRow,
} from '../actions';


describe('<HomePage />', () => {
  it('should render HomePage', () => {
    const betData = fromJS({
      loading: false,
      error: false,
      data: false,
    });
    const dividends = fromJS({
      w: false,
      p: false,
      e: false,
      q: false,
    });
    const isInputValid = fromJS({
      data: true,
    });

    const wrapper = shallow(
      <MuiThemeProvider>
        <HomePage
          betData={betData}
          dividendsData={dividends}
          isInputValid={isInputValid}
          fetchBetData={fetchData}
          amountChange={amountChange}
          horseChange={horseChange}
          commissionChange={commissionChange}
          resultChange={resultChange}
          calculateDividends={calculateDividends}
          addRow={addRow}
          removeRow={removeRow}
        />
      </MuiThemeProvider>
    );
    expect(wrapper.find(HomePage)).toExist();
  });
});
