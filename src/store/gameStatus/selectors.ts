import { RootState } from '../reducer';
import { GameStatusState } from './reducer';
import { createSelector } from 'reselect';

function selectGameStatusState(state: RootState): GameStatusState {
  return state.gameStatus;
}

const selectSelectedNumbers = createSelector(selectGameStatusState, state => state.selectedNumbers);

const makeSelectCurrentPlayerId = () => createSelector(selectGameStatusState, state => state.currentPlayerId);

const makeSelectIsGameStarted = () => createSelector(makeSelectCurrentPlayerId(), currentPlayerId => currentPlayerId !== null);

export {
  selectSelectedNumbers,

  makeSelectIsGameStarted,
  makeSelectCurrentPlayerId,
};
