import AlertWrapper from '../Wrapper';
import { shallow } from 'enzyme';
import React from 'react';

describe('AlertWrapper component', () => {
  it('should render withount crashing', () => {
    const wrapper = shallow((
      <AlertWrapper />
    ));

    expect(wrapper).toMatchSnapshot();
  });
});
