import React from 'react';
import Player from './Player';
import styled from 'styled-components';
import { State } from './reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { startGame, resetGame } from './actions';
import { PlayerData } from './typing';

interface AppPropsFromState {
  currentPlayerIndex: number|null;
  players: PlayerData[];
}

interface AppPropsFromDispatch {
  onStart: () => any;
  onReset: () => any;
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

const App: React.FC<AppProps> = ({ currentPlayerIndex, players, onStart, onReset }) => {
  const isNew = currentPlayerIndex === null;
  const playserNodeList = players.map((player, index) => (
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
        <button
          type="button"
          onClick={isNew ? onStart : onReset}
        >
          게임 {isNew ? '' : '재'}시작
        </button>
      </Header>

      <PlayerContainer>
        {playserNodeList}
      </PlayerContainer>
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
    onStart: () => dispatch(startGame()),
    onReset: () => dispatch(resetGame()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(App);
