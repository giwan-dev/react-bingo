import { RootState } from 'store/reducer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentPlayerId } from 'store/gameStatus/selectors';
import { makeSelectEveryPlayerData } from 'store/players/selectors';
import App, { AppProps } from './App';

type AppPropsFromState = Pick<AppProps, 'currentPlayerId'|'players'>;

const mapStateToProps = createStructuredSelector<RootState, AppPropsFromState>({
  currentPlayerId: makeSelectCurrentPlayerId(),
  players: makeSelectEveryPlayerData(),
});

const withConnect = connect(mapStateToProps, null);

export default withConnect(App);
