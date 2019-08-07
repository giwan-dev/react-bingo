import React from 'react';
import Player from './Player';

const App: React.FC = () => {
  return (
    <div>
      <button type="button">게임 시작</button>
      <div>
        <Player name="Player 1" />
        <Player name="Player 2" />
      </div>
    </div>
  );
};

export default App;
