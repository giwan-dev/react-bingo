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
    },
    {
      name: 'Player 2',
      table: _fill(Array(25), null),
      matchedIndexList: [],
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

      return {
        ...state,
        currentPlayerIndex: state.currentPlayerIndex + 1 === state.players.length
          ? 0
          : state.currentPlayerIndex + 1,
        players: _map(state.players, (player) => {
          const newTable = markNewSelected(player.table, action.num);

          return {
            ...player,
            table: newTable,
            matchedIndexList: [
              ...player.matchedIndexList,
              ...makeMatchedIndexList(newTable, action.num),
            ],
          };
        }),
      };
    default:
      return state;
  }
}
