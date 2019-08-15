import { createSelector } from 'reselect';
import { RootState } from '../reducer';
import { initialPlayersState } from './reducer';
import { selectSelectedNumbers } from 'store/gameStatus/selectors';
import { makePlayerData, makeMatchedIndexList } from 'helpers';
import { map as _map, filter as _filter } from 'lodash';

const selectPlayersState = (state: RootState) => state.players || initialPlayersState;

const selectByIds = createSelector(selectPlayersState, state => state.byIds);
const selectAllIds = createSelector(selectPlayersState, state => state.allIds);

const selectWinners = createSelector(selectByIds, selectSelectedNumbers, (byIds, selectedNumbers) => _map(
  _filter(
    byIds,
    (player) => {
      return makeMatchedIndexList(player.table, selectedNumbers).length >= 5;
    },
  ),
  player => player,
));

const makeSelectEveryPlayerData = () => createSelector(selectByIds, selectSelectedNumbers, (players, numbers) => _map(players, player => makePlayerData(player, numbers)));

const makeSelectWinnerExist = () => createSelector(selectWinners, winners => winners.length > 0);
const makeSelectWinnerName = () => createSelector(selectWinners, (winners) => {
  if (winners.length === 1) {
    return winners[0].name;
  }
  return null;
});

export {
  selectAllIds,
  makeSelectEveryPlayerData,
  makeSelectWinnerExist,
  makeSelectWinnerName,
};
