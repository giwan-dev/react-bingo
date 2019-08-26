import { createSelector } from 'reselect';
import { RootState } from '../reducer';
import { initialPlayersState } from './reducer';
import { selectSelectedNumbers } from 'store/gameStatus/selectors';
import { makeBingoTable } from 'helpers';
import { map as _map, filter as _filter } from 'lodash';
import { selectMatchedCombinationById } from 'store/matchedCombination/selectors';

const selectPlayersState = (state: RootState) => state.players || initialPlayersState;

const selectByIds = createSelector(selectPlayersState, state => state.byIds);
const selectAllIds = createSelector(selectPlayersState, state => state.allIds);

const selectWinners = createSelector(selectByIds, selectMatchedCombinationById, (byIds, combinations) => _map(
  _filter(
    byIds,
    player => _filter(combinations, combination => combination.playerId === player.id).length >= 5,
  ),
  player => player,
));

const makeSelectPlayer = (id: string) => createSelector(selectByIds, players => players[id]);
const makeSelectPlayerTable = (id: string) => createSelector(makeSelectPlayer(id), player => player.table);

const makeSelectEveryPlayerData = () => createSelector(selectByIds, selectSelectedNumbers, selectMatchedCombinationById, (players, numbers, combinations) => _map(players, player => ({
  id: player.id,
  name: player.name,
  table: makeBingoTable(player.table, numbers),
  matchedIndexList: _map(
    _filter(combinations, combination => combination.playerId === player.id),
    combination => combination.combination,
  ),
})));

const makeSelectWinnerExist = () => createSelector(selectWinners, winners => winners.length > 0);
const makeSelectWinnerName = () => createSelector(selectWinners, (winners) => {
  if (winners.length === 1) {
    return winners[0].name;
  }
  return null;
});

export {
  selectAllIds,
  makeSelectPlayerTable,
  makeSelectEveryPlayerData,
  makeSelectWinnerExist,
  makeSelectWinnerName,
};
