import { makeSelectCurrentPlayerId } from 'store/gameStatus/selectors';
import { START_GAME, updateCurrentPlayerId, selectNumber, SELECT_NUMBER } from './actions';
import { takeLatest, put, takeEvery, select } from 'redux-saga/effects';
import { addPlayer } from 'store/players/actions';
import { makeNewTable } from 'helpers';
import { selectAllIds } from 'store/players/selectors';

function* startGameSaga() {
  yield put(addPlayer('1', 'Player 1', makeNewTable()));
  yield put(addPlayer('2', 'Player 2', makeNewTable()));
  yield put(updateCurrentPlayerId('1'));
}

function* selectNumberSaga({ num }: ReturnType<typeof selectNumber>) {
  const allIds: string[] = yield select(selectAllIds);
  const currentPlayerId: string = yield select(makeSelectCurrentPlayerId());
  const currentIndex = allIds.findIndex(id => id === currentPlayerId);

  if (currentIndex === allIds.length - 1) {
    // 마지막 인덱스인 경우 첫번째 인덱스의 id에게 턴을 넘김
    yield put(updateCurrentPlayerId(allIds[0]));
  } else {
    // 그 외의 경우 다음 인덱스의 id에게 턴을 넘김
    yield put(updateCurrentPlayerId(allIds[currentIndex + 1]));
  }
}

export default function* gameStatusSaga() {
  yield takeLatest(START_GAME, startGameSaga);
  yield takeEvery(SELECT_NUMBER, selectNumberSaga);
}
