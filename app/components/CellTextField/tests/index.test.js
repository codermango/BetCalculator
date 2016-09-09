import CellTextField from '../index';

import expect from 'expect';
import { render } from 'enzyme';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('<CellTextField />', () => {
  it('should render CellTextField component', () => {
    const renderedComponent = render(
      <MuiThemeProvider>
        <CellTextField
          label="test"
          width="50%"
          defaultValue="test"
          rowIndex={0}
          index={0}
          betType="w"
          field="amount"
        />
      </MuiThemeProvider>
    );
    expect(renderedComponent.find(CellTextField)).toExist();
  });
});
