import * as React from 'react';
import { RootState } from 'store/reducer';
import Alert from 'components/Alert';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { resetGame } from 'store/gameStatus/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectWinnerName, makeSelectWinnerExist } from 'store/players/selectors';

interface WinnerAlertPropsFromState {
  isVisible: boolean;
  winnerName: string|null; // null이면 승자가 없음
}

interface WinnerAlertPropsFromDispatch {
  onConfirm: () => any;
}

type WinnerAlertProps = WinnerAlertPropsFromState & WinnerAlertPropsFromDispatch;

const WinnerAlert: React.FunctionComponent<WinnerAlertProps> = ({ isVisible, winnerName, onConfirm }) => {
  return (
    <Alert
      isVisible={isVisible}
      message={winnerName === null ? '무승부입니다.' : `${winnerName} 승리입니다.`}
      onConfirm={onConfirm}
    />
  );
};

const mapStateToProps = createStructuredSelector<RootState, WinnerAlertPropsFromState>({
  isVisible: makeSelectWinnerExist(),
  winnerName: makeSelectWinnerName(),
});

function mapDispatchToProps(dispatch: Dispatch): WinnerAlertPropsFromDispatch {
  return {
    onConfirm: () => dispatch(resetGame()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(WinnerAlert);
