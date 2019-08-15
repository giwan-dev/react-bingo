import gameStatusSaga from './gameStatus/saga';
import { all } from 'redux-saga/effects';
import matchedCombinationSaga from './matchedCombination/saga';

export default function* rootSaga() {
  yield all([
    gameStatusSaga(),
    matchedCombinationSaga(),
  ]);
}
