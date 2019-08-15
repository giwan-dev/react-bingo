import React from 'react';
import { RootState } from 'store/reducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from 'components/Button';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsGameStarted } from 'store/gameStatus/selectors';
import { startGame } from 'store/gameStatus/actions';

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

const mapStateToProps = createStructuredSelector<RootState, StartButtonPropsFromState>({
  isGameStarted: makeSelectIsGameStarted(),
});

function mapDispatchToProps(dispatch: Dispatch): StartButtonPropsFromDispatch {
  return {
    onClick: () => dispatch(startGame()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(StartButton);
