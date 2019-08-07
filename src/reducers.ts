import { Action, ADD_NUMBER, START_GAME, RESET_GAME } from './actions';
import { PlayerData } from './typing';
import {
  fill as _fill,
  map as _map,
} from 'lodash';
import { makeNewPlayers, markNewSelected, makeMatchedIndexList } from './helpers';

export interface State {
  currentPlayerIndex: number|null;
  players: PlayerData[];
}

const initialState: State = {
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
        currentPlayerIndex: 0,
        players: makeNewPlayers(),
      };
    case RESET_GAME:
      return {
        ...initialState,
        currentPlayerIndex: 0,
        players: makeNewPlayers(),
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
      const newPlayers = _map(state.players, (player) => {
        const newTable = markNewSelected(player.table, action.num);
        const newMatchedIndexList = [
          ...player.matchedIndexList,
          ...makeMatchedIndexList(newTable, action.num),
        ];

        return {
          ...player,
          table: newTable,
          matchedIndexList: newMatchedIndexList,
          isWin: newMatchedIndexList.length >= 5,
        };
      });

      return {
        ...state,
        currentPlayerIndex: newPlayers.filter(player => player.isWin).length > 0
          ? null
          : nextPlayerIndex,
        players: newPlayers,
      };
    default:
      return state;
  }
}
