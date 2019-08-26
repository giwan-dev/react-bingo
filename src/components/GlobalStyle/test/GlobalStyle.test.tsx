import React from 'react';
import { shallow } from 'enzyme';
import GlobalStyle from '..';

it('should render without crashing', () => {
  const style = shallow((
    <GlobalStyle />
  ));
  expect(style).toMatchSnapshot();
});
