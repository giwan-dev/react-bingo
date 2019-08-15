import { GameStatusAction, UPDATE_CURRENT_PLAYER_ID, RESET_GAME, SELECT_NUMBER, START_GAME } from './actions';

export interface GameStatusState {
  currentPlayerId: string|null;
  selectedNumbers: number[];
}

const initialState: GameStatusState = {
  currentPlayerId: null,
  selectedNumbers: [],
};

export default function gameStatusReducer(state: GameStatusState = initialState, action: GameStatusAction): GameStatusState {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        selectedNumbers: [],
      };
    case UPDATE_CURRENT_PLAYER_ID:
      return {
        ...state,
        currentPlayerId: action.id,
      };
    case SELECT_NUMBER:
      return {
        ...state,
        selectedNumbers: [
          ...state.selectedNumbers,
          action.num,
        ],
      };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
}
