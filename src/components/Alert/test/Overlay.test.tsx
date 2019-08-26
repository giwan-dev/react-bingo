import { shallow } from 'enzyme';
import React from 'react';
import AlertOverlay from '../Overlay';

describe('AlertOverlay component', () => {
  it('should render withount crashing', () => {
    const wrapper = shallow((
      <AlertOverlay />
    ));

    expect(wrapper).toMatchSnapshot();
  });
});
