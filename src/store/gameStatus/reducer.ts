import { GameStatusAction, START_GAME, UPDATE_CURRENT_PLAYER_INDEX, RESET_GAME_STATUS } from './actions';

export interface GameStatusState {
  isGameStarted: boolean;
  currentPlayerIndex: number|null;
}

const initialState: GameStatusState = {
  isGameStarted: false,
  currentPlayerIndex: null,
};

export default function gameStatusReducer(state: GameStatusState = initialState, action: GameStatusAction): GameStatusState {
  switch (action.type) {
    case START_GAME:
      return {
        isGameStarted: true,
        currentPlayerIndex: 0,
      };
    case UPDATE_CURRENT_PLAYER_INDEX:
      return {
        ...state,
        currentPlayerIndex: action.index,
      };
    case RESET_GAME_STATUS:
      return initialState;
    default:
      return state;
  }
}
