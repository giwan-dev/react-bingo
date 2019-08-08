import React from 'react';
import Player from 'containers/Player';
import styled from 'styled-components';
import { State } from 'reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PlayerData } from 'typing';
import AlertWinner from 'containers/AlertWinner';
import ButtonStart from 'containers/ButtonStart';

interface AppPropsFromState {
  currentPlayerIndex: number|null;
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

const App: React.FC<AppProps> = ({ currentPlayerIndex, players }) => {
  const playerNodeList = players.map((player, index) => (
    <Player
      key={player.name}
      player={player}
      isActive={index === currentPlayerIndex}
    />
  ));

  return (
    <AppContainer>
      <Header>
        <h1>React + Redux = Bingo</h1>
        <ButtonStart />
      </Header>

      <PlayerContainer>
        {playerNodeList}
      </PlayerContainer>

      <AlertWinner />
    </AppContainer>
  );
};

function mapStateToProps(state: State): AppPropsFromState {
  return {
    currentPlayerIndex: state.currentPlayerIndex,
    players: state.players,
  };
}

function mapDispatchToProps(dispatch: Dispatch): AppPropsFromDispatch {
  return {
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(App);
