import { Action, ADD_NUMBER, START_GAME, RESTART_GAME, RESET_GAME } from './actions';
import { PlayerData } from './typing';
import {
  fill as _fill,
  map as _map,
  some as _some,
} from 'lodash';
import { initializePlayers, makeNewPlayerMapper } from './helpers';

export interface State {
  gameStarted: boolean;
  currentPlayerIndex: number|null;
  players: PlayerData[];
}

const initialState: State = {
  gameStarted: false,
  currentPlayerIndex: null,
  players: [
    {
      name: 'Player 1',
      table: _fill(Array(25), null),
      matchedIndexList: [],
      isWin: false,
    },
    {
      name: 'Player 2',
      table: _fill(Array(25), null),
      matchedIndexList: [],
      isWin: false,
    },
  ],
};

export default function rootReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        gameStarted: true,
        currentPlayerIndex: 0,
        players: initializePlayers(),
      };

    case RESTART_GAME:
      return {
        ...initialState,
        currentPlayerIndex: 0,
        players: initializePlayers(),
      };

    case ADD_NUMBER:
      if (state.currentPlayerIndex === null) {
        return {
          ...state,
          currentPlayerIndex: 0,
        };
      }

      const nextPlayerIndex = state.currentPlayerIndex + 1 === state.players.length
        ? 0
        : state.currentPlayerIndex + 1;
      const newPlayers = _map(state.players, makeNewPlayerMapper(action.num));

      return {
        ...state,
        currentPlayerIndex: _some(newPlayers, player => player.isWin)
          ? null
          : nextPlayerIndex,
        players: newPlayers,
      };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
}
