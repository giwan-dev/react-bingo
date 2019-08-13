import React from 'react';
import { State } from 'store/reducer';
import { Dispatch } from 'redux';
import { startGame } from 'store/actions';
import { connect } from 'react-redux';
import Button from 'components/Button';

interface StartButtonPropsFromState {
  isGameStarted: boolean;

}
interface StartButtonPropsFromDispatch {
  onClick: () => any;
}

type StartButtonProps = StartButtonPropsFromState & StartButtonPropsFromDispatch;

const StartButton: React.FunctionComponent<StartButtonProps> = ({ isGameStarted, onClick }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
    >
      게임 {isGameStarted ? '재' : ''}시작
    </Button>
  );
};

function mapStateToProps(state: State): StartButtonPropsFromState {
  return {
    isGameStarted: state.isGameStarted,
  };
}

function mapDispatchToProps(dispatch: Dispatch): StartButtonPropsFromDispatch {
  return {
    onClick: () => dispatch(startGame()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(StartButton);
