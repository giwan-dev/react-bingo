import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface AlertProps {
  isVisible: boolean;
  message: string;
  onConfirm: React.MouseEventHandler<HTMLElement>;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const AlertContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: auto;
  width: 500px;
  height: 80px;
  border-radius: 5px;
  padding: 20px;
  background-color: white;
  transform: translate(-50%, -50%);
`;

const alertPortal = document.getElementById('alert-portal');
const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

export default class Alert extends React.Component<AlertProps> {
  el: HTMLElement|null = null;

  constructor(props: AlertProps) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (alertPortal !== null && this.el !== null) {
      alertPortal.appendChild(this.el);
    }

  }

  componentWillUnmount() {
    if (alertPortal !== null && this.el !== null) {
      alertPortal.removeChild(this.el);
    }
  }

  private renderAlert() {
    const { isVisible, message, onConfirm } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <Overlay onClick={onConfirm}>
        <AlertContainer onClick={stopPropagation}>
          {message}
          <button
            type="button"
            onClick={onConfirm}
          >
            확인
          </button>
        </AlertContainer>
      </Overlay>
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
