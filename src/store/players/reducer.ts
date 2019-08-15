import { PlayersAction, ADD_PLAYER, RESET_PLAYERS } from './actions';
import { PlayersState } from './reducer';

export interface PlayerStateValue {
  id: string;
  name: string;
  table: number[];
}

export interface PlayersState {
  byIds: {
    [id: string]: PlayerStateValue;
  };
  allIds: string[];
}

export const initialPlayersState: PlayersState = {
  byIds: {},
  allIds: [],
};

export default function playersReducer(state: PlayersState = initialPlayersState, action: PlayersAction): PlayersState {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        byIds: {
          ...state.byIds,
          [action.id]: {
            id: action.id,
            name: action.name,
            table: action.table,
          },
        },
        allIds: [...state.allIds, action.id],
      };
    case RESET_PLAYERS:
      return initialPlayersState;
    default:
      return state;
  }
}
