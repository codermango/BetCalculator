import BetTable from '../index';

import expect from 'expect';
import { render } from 'enzyme';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const data = {
  commission: {
    w: 0.15,
    p: 0.12,
    e: 0.18,
    q: 0.18,
  },
  rowData: [
    { w: { horse: ['1'], amount: 3 }, p: { horse: ['1'], amount: 31 }, e: { horse: ['1', '2'], amount: 13 }, q: { horse: ['1', '2'], amount: 19 } },
    { w: { horse: ['2'], amount: 4 }, p: { horse: ['2'], amount: 89 }, e: { horse: ['2', '3'], amount: 98 }, q: { horse: ['2', '3'], amount: 77 } },
    { w: { horse: ['3'], amount: 5 }, p: { horse: ['3'], amount: 28 }, e: { horse: ['1', '3'], amount: 82 }, q: { horse: ['1', '3'], amount: 26 } },
    { w: { horse: ['4'], amount: 5 }, p: { horse: ['4'], amount: 72 }, e: { horse: ['3', '2'], amount: 27 }, q: { horse: ['2', '4'], amount: 63 } },
    { w: { horse: ['1'], amount: 16 }, p: { horse: ['1'], amount: 40 }, e: { horse: ['1', '2'], amount: 5 }, q: { horse: ['1', '2'], amount: 66 } },
    { w: { horse: ['2'], amount: 8 }, p: { horse: ['2'], amount: 16 }, e: { horse: ['2', '3'], amount: 61 }, q: { horse: ['2', '3'], amount: 82 } },
    { w: { horse: ['3'], amount: 22 }, p: { horse: ['3'], amount: 82 }, e: { horse: ['1', '3'], amount: 28 }, q: { horse: ['1', '3'], amount: 90 } },
    { w: { horse: ['4'], amount: 57 }, p: { horse: ['4'], amount: 52 }, e: { horse: ['3', '2'], amount: 25 }, q: { horse: ['2', '4'], amount: 48 } },
    { w: { horse: ['1'], amount: 42 }, p: { horse: ['1'], amount: 18 }, e: { horse: ['1', '2'], amount: 81 }, q: { horse: ['1', '2'], amount: 18 } },
    { w: { horse: ['2'], amount: 98 }, p: { horse: ['2'], amount: 74 }, e: { horse: ['2', '3'], amount: 47 }, q: { horse: ['2', '3'], amount: 93 } },
    { w: { horse: ['3'], amount: 63 }, p: { horse: ['3'], amount: 39 }, e: { horse: ['1', '3'], amount: 93 }, q: { horse: ['1', '3'], amount: 62 } },
    { w: { horse: ['4'], amount: 15 }, p: { horse: ['4'], amount: 105 }, e: { horse: ['3', '2'], amount: 51 }, q: { horse: ['2', '4'], amount: 25 } },
  ],
  resultData: ['2', '3', '1'],
};


describe('<BetTable />', () => {
  it('should render BetTable component', () => {
    const renderedComponent = render(
      <MuiThemeProvider>
        <BetTable data={data} />
      </MuiThemeProvider>
    );
    expect(renderedComponent.find(BetTable)).toExist();
  });
});
