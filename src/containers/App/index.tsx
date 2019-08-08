import React from 'react';
import Player from 'containers/Player';
import styled from 'styled-components';
import { State } from 'reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { startGame, resetGame } from 'actions';
import { PlayerData } from 'typing';
import Alert from 'components/Alert';

interface AppPropsFromState {
  isGameStarted: boolean;
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

function makeAlertMessage(winners: PlayerData[]): string {
  if (winners.length === 0) {
    return '';
  }

  return winners.length > 1 ? '무승부입니다.' : `${winners[0].name} 승리입니다.`;
}

const App: React.FC<AppProps> = ({ isGameStarted, currentPlayerIndex, players, onStart, onReset }) => {
  const playerNodeList = players.map((player, index) => (
    <Player
      key={player.name}
      player={player}
      isActive={index === currentPlayerIndex}
    />
  ));
  const winners = players.filter(player => player.isWin);

  return (
    <AppContainer>
      <Header>
        <h1>React + Redux = Bingo</h1>
        <button
          type="button"
          onClick={onStart}
        >
          게임 {isGameStarted ? '재' : ''}시작
        </button>
      </Header>

      <PlayerContainer>
        {playerNodeList}
      </PlayerContainer>

      <Alert
        isVisible={winners.length > 0}
        message={makeAlertMessage(winners)}
        onConfirm={onReset}
      />
    </AppContainer>
  );
};

function mapStateToProps(state: State): AppPropsFromState {
  return {
    isGameStarted: state.isGameStarted,
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
