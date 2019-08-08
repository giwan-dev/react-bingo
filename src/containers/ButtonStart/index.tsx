import React from 'react';
import { State } from 'reducers';
import { Dispatch } from 'redux';
import { startGame } from 'actions';
import { connect } from 'react-redux';
import Button from 'components/Button';

interface ButtonStartPropsFromState {
  isGameStarted: boolean;

}
interface ButtonStartPropsFromDispatch {
  onClick: () => any;
}

type ButtonStartProps = ButtonStartPropsFromState & ButtonStartPropsFromDispatch;

const ButtonStart: React.FunctionComponent<ButtonStartProps> = ({ isGameStarted, onClick }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
    >
      게임 {isGameStarted ? '재' : ''}시작
    </Button>
  );
};

function mapStateToProps(state: State): ButtonStartPropsFromState {
  return {
    isGameStarted: state.isGameStarted,
  };
}

function mapDispatchToProps(dispatch: Dispatch): ButtonStartPropsFromDispatch {
  return {
    onClick: () => dispatch(startGame()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(ButtonStart);
