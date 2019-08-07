import React from 'react';
import Player from './Player';
import styled from 'styled-components';

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

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header>
        <h1>React + Redux = Bingo</h1>
        <button type="button">
          게임 시작
        </button>
      </Header>

      <PlayerContainer>
        <Player name="Player 1" />
        <Player name="Player 2" />
      </PlayerContainer>
    </AppContainer>
  );
};

export default App;
