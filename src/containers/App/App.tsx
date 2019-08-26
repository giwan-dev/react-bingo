import React from 'react';
import { PlayerData } from 'typing';
import { map as _map } from 'lodash';
import Player from 'containers/Player';
import StartButton from 'containers/StartButton';
import WinnerAlert from 'containers/WinnerAlert';
import AppWrapper from './Wrapper';
import AppHeader from './Header';
import PlayerListWrapper from './PlayerListWrapper';

export interface AppProps {
  currentPlayerId: string|null;
  players: PlayerData[];
}

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
    <AppWrapper>
      <AppHeader>
        <h1>React + Redux = Bingo</h1>
        <StartButton />
      </AppHeader>

      <PlayerListWrapper>
        {playerNodeList}
      </PlayerListWrapper>

      <WinnerAlert />
    </AppWrapper>
  );
};
export default App;
