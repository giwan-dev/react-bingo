import * as React from 'react';
import { State } from 'reducers';
import Alert from 'components/Alert';
import { Dispatch } from 'redux';
import { resetGame } from 'actions';
import { connect } from 'react-redux';

interface AlertWinnerPropsFromState {
  isVisible: boolean;
  winnerName: string|null; // null이면 승자가 없음
}

interface AlertWinnerPropsFromDispatch {
  onConfirm: () => any;
}

type AlertWinnerProps = AlertWinnerPropsFromState & AlertWinnerPropsFromDispatch;

const AlertWinner: React.FunctionComponent<AlertWinnerProps> = ({ isVisible, winnerName, onConfirm }) => {
  return (
    <Alert
      isVisible={isVisible}
      message={winnerName === null ? '무승부입니다.' : `${winnerName} 승리입니다.`}
      onConfirm={onConfirm}
    />
  );
};

function mapStateToProps(state: State): AlertWinnerPropsFromState {
  const winners = state.players.filter(player => player.isWin);

  if (winners.length === 0) {
    return {
      isVisible: false,
      winnerName: null,
    };
  }

  return {
    isVisible: true,
    winnerName: winners.length > 1 ? null : winners[0].name,
  };
}

function mapDispatchToProps(dispatch: Dispatch): AlertWinnerPropsFromDispatch {
  return {
    onConfirm: () => dispatch(resetGame()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(AlertWinner);
