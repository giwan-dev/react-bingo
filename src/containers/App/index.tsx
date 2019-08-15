import React from 'react';
import Player from 'containers/Player';
import styled from 'styled-components';
import { RootState } from 'store/reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PlayerData } from 'typing';
import WinnerAlert from 'containers/WinnerAlert';
import StartButton from 'containers/StartButton';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentPlayerId } from 'store/gameStatus/selectors';
import { makeSelectEveryPlayerData } from 'store/players/selectors';
import { map as _map } from 'lodash';

interface AppPropsFromState {
  currentPlayerId: string|null;
  players: PlayerData[];
}

interface AppPropsFromDispatch {
}

type AppProps = AppPropsFromState & AppPropsFromDispatch;

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const Header = styled.header`
  margin-bottom: 30px;
`;

const PlayerContainer = styled.main`
  display: flex;
  justify-content: space-between;
`;

const playersPlaceholder = Array<null>(2).fill(null);
const tablePlaceholder = Array<null>(25).fill(null);

const App: React.FC<AppProps> = ({ currentPlayerId, players }) => {
  const playerNodeList = _map(
    players.length > 0 ? players : playersPlaceholder,
    (player, index) => player === null ? (
      <Player
        key={index}
        name=""
        table={tablePlaceholder}
        matchedIndexList={[]}
        isActive={false}
      />
    ) : (
      <Player
        key={player.id}
        name={player.name}
        table={player.table}
        matchedIndexList={player.matchedIndexList}
        isActive={player.id === currentPlayerId}
      />
    ),
  );

  return (
    <AppContainer>
      <Header>
        <h1>React + Redux = Bingo</h1>
        <StartButton />
      </Header>

      <PlayerContainer>
        {playerNodeList}
      </PlayerContainer>

      <WinnerAlert />
    </AppContainer>
  );
};

const mapStateToProps = createStructuredSelector<RootState, AppPropsFromState>({
  currentPlayerId: makeSelectCurrentPlayerId(),
  players: makeSelectEveryPlayerData(),
});

function mapDispatchToProps(dispatch: Dispatch): AppPropsFromDispatch {
  return {
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(App);
