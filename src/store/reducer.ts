import gameStatusReducer, { GameStatusState } from './gameStatus/reducer';
import playersReducer, { PlayersState } from './players/reducer';
import { combineReducers } from 'redux';
import matchedCombinationReducer, { MatchedCombinationState } from './matchedCombination/reducer';

export interface RootState {
  gameStatus: GameStatusState;
  players: PlayersState;
  matchedCombination: MatchedCombinationState;
}

const reducers = {
  gameStatus: gameStatusReducer,
  players: playersReducer,
  matchedCombination: matchedCombinationReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
