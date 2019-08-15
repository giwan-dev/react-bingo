import gameStatusSaga from './gameStatus/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    gameStatusSaga(),
  ]);
}
