import React from 'react';
import Alert, { stopPropagation } from '../Alert';
import { shallow } from 'enzyme';
import Button from 'components/Button';
import AlertOverlay from '../Overlay';
import AlertWrapper from '../Wrapper';

describe('stopPropagation function', () => {
  it('should call stopPropagation property of input argument', () => {
    const property = jest.fn();
    const event = {
      stopPropagation: property,
    } as any;
    stopPropagation(event);
    expect(property).toHaveBeenCalled();
  });
});

describe('Alert component', () => {
  it('should render without crashing', () => {
    const alert = shallow((
      <Alert
        isVisible={true}
        message="hello, world"
        onConfirm={jest.fn()}
      />
    ));

    expect(alert).toMatchSnapshot();
  });

  it('should render message', () => {
    const message = 'hello, world';
    const alert = shallow((
      <Alert
        isVisible={true}
        message={message}
        onConfirm={jest.fn()}
      />
    ));

    expect(alert.contains(message)).toEqual(true);
  });

  it('should render Button component', () => {
    const alert = shallow((
      <Alert
        isVisible={true}
        message="hello, world"
        onConfirm={jest.fn()}
      />
    ));

    expect(alert.find(Button).exists()).toEqual(true);
  });

  it('should not render when isVisible is false', () => {
    const alert = shallow((
      <Alert
        isVisible={false}
        message="hello, world"
        onConfirm={jest.fn()}
      />
    ));

    expect(alert).toMatchSnapshot();
    expect(alert.children().exists()).toEqual(false);
  });

  it('should call onConfirm prop when click button', () => {
    const handleConfirm = jest.fn();
    const alert = shallow((
      <Alert
        isVisible={true}
        message="hello, world"
        onConfirm={handleConfirm}
      />
    ));

    alert.find(Button).simulate('click');
    expect(handleConfirm).toBeCalled();
  });

  it('should call onConfirm prop when click Overlay', () => {
    const handleConfirm = jest.fn();
    const alert = shallow((
      <Alert
        isVisible={true}
        message="hello, world"
        onConfirm={handleConfirm}
      />
    ));

    alert.find(AlertOverlay).simulate('click');
    expect(handleConfirm).toBeCalled();
  });

  it('should not call onConfirm prop when click Wrapper', () => {
    const handleConfirm = jest.fn();
    const alert = shallow((
      <Alert
        isVisible={true}
        message="hello, world"
        onConfirm={handleConfirm}
      />
    ));

    alert.find(AlertWrapper).simulate('click', new Event('click'));
    expect(handleConfirm).toHaveBeenCalledTimes(0);
  });
});
