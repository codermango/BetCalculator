// import CellTextField from '../index';

import expect from 'expect';
// import { shallow } from 'enzyme';
// import React from 'react';

describe('<CellTextField />', () => {
  it('should render the component if no items are passed', () => {
    const renderedComponent = render(
      <CellTextField />
    );
    expect().toExist();
  });
});
