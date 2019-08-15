import { PlayerStateValue } from 'store/players/reducer';
import { select, put, all, takeEvery } from 'redux-saga/effects';
import { makeSelectPlayerTable } from 'store/players/selectors';
import { selectSelectedNumbers } from 'store/gameStatus/selectors';
import { BINGO_INDEX_COMBINATION } from 'helpers';
import { addMatchedCombination, updateMatchedCombination, UPDATE_MATCHED_COMBINATION } from './actions';
import {
  map as _map,
  every as _every,
} from 'lodash';

function* updateMatchedCombinationSaga({ playerId, selectedNumber }: ReturnType<typeof updateMatchedCombination>) {
  const table: PlayerStateValue['table'] = yield select(makeSelectPlayerTable(playerId));
  const selectedNumbers: number[] = yield select(selectSelectedNumbers);

  yield all(
    BINGO_INDEX_COMBINATION
      .filter(combination => combination.includes(table.findIndex(value => value === selectedNumber)))
      .filter(combination => _every(_map(combination, index => table[index] === selectedNumber || selectedNumbers.includes(table[index]))))
      .map(combination => put(addMatchedCombination(playerId, combination))),
  );
}

export default function* matchedCombinationSaga() {
  yield takeEvery(UPDATE_MATCHED_COMBINATION, updateMatchedCombinationSaga);
}
