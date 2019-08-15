import gameStatusReducer, { GameStatusState } from './gameStatus/reducer';
import playersReducer, { PlayersState } from './players/reducer';
import { combineReducers } from 'redux';

export interface RootState {
  gameStatus: GameStatusState;
  players: PlayersState;
}

const reducers = {
  gameStatus: gameStatusReducer,
  players: playersReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
