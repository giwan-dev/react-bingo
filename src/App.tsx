import React from 'react';
import Player from './Player';
import styled from 'styled-components';
import { State } from './reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setNewGame } from './actions';

interface AppPropsFromState {
  turn: 1|2|null;
}

interface AppPropsFromDispatch {
  setNewGame: () => any;
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

const App: React.FC<AppProps> = ({ turn, setNewGame }) => {
  return (
    <AppContainer>
      <Header>
        <h1>React + Redux = Bingo</h1>
        <button
          type="button"
          onClick={setNewGame}
        >
          게임 시작
        </button>
      </Header>

      <PlayerContainer>
        <Player
          name="Player 1"
          isActive={turn === 1}
        />
        <Player
          name="Player 2"
          isActive={turn === 2}
        />
      </PlayerContainer>
    </AppContainer>
  );
};

function mapStateToProps(state: State): AppPropsFromState {
  return {
    turn: state.turn,
  };
}

function mapDispatchToProps(dispatch: Dispatch): AppPropsFromDispatch {
  return {
    setNewGame: () => dispatch(setNewGame()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(App);
