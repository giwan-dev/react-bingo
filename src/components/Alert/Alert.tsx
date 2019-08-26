import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import AlertOverlay from './Overlay';
import AlertWrapper from './Wrapper';

interface AlertProps {
  isVisible: boolean;
  message: string;
  onConfirm: React.MouseEventHandler<HTMLElement>;
}

const alertPortal = document.getElementById('alert-portal') || {
  appendChild: () => {},
  removeChild: () => {},
};
export const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

export default class Alert extends React.Component<AlertProps> {
  private el: HTMLElement;

  constructor(props: AlertProps) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    alertPortal.appendChild(this.el);
  }

  componentWillUnmount() {
    alertPortal.removeChild(this.el);
  }

  private renderAlert() {
    const { isVisible, message, onConfirm } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <AlertOverlay onClick={onConfirm}>
        <AlertWrapper onClick={stopPropagation}>
          {message}
          <Button
            type="button"
            onClick={onConfirm}
          >
            확인
          </Button>
        </AlertWrapper>
      </AlertOverlay>
    );
  }

  public render() {
    if (this.el === null) {
      return null;
    }

    return ReactDOM.createPortal(
      this.renderAlert(),
      this.el,
    );
  }
}
