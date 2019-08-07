import { PlayerData, BingoEntityData, BingoTable } from './typing';
import {
  range as _range,
  map as _map,
  findIndex as _findIndex,
  shuffle as _shuffle,
  chunk as _chunk,
  sample as _sample,
  every as _every,
} from 'lodash';

/**
 * 수열을 만듧니다.
 * @param multiplier 차수
 * @param count 수열의 개수
 * @param offset 상수항
 */
function makeSequence(multiplier: number, count: number, offset: number = 0): number[] {
  return _map(_range(count), num => num * multiplier + offset);
}

const BINGO_INDEX_COMBINATION = [
  ..._chunk(_range(25), 5), // 가로줄
  ..._map(_range(5), remainder => makeSequence(5, 5, remainder)), // 세로줄
  makeSequence(6, 5), // 왼쪽 대각선
  makeSequence(4, 5, 4), // 오른쪽 대각선
];

/**
 * 새로운 빙고판을 준비하는 함수
 */
const makeNewBingo = () => _map(_shuffle(_range(25)), num => ({
  key: num + 1,
  isSelected: false,
}));

/**
 * 새로운 플레이어 목록을 만드는 함수
 */
export function makeNewPlayers(): PlayerData[] {
  return [
    {
      name: 'Player 1',
      table: makeNewBingo(),
      matchedIndexList: [],
    },
    {
      name: 'Player 2',
      table: makeNewBingo(),
      matchedIndexList: [],
    },
  ];
}

/**
 * 주어진 목록에서 선택한 숫자를 selected로 마킹한 새로운 어레이를 반환합니다.
 * @param list
 * @param selected
 */
export function markNewSelected(
  list: BingoTable,
  selected: number,
): BingoTable {
  if (_sample(list) === null) {
    return list;
  }

  return _map(list as BingoEntityData[], (entity) => { // HACK: entity가 null인 케이스 예외 처리 했다
    if (entity !== null && entity.key === selected) {
      return {
        key: entity.key,
        isSelected: true,
      } as BingoEntityData;
    }
    return entity;
  });
}

/**
 * 주어진 목록에서 선택한 숫자가 selected가 되었을 때 빙고가 이뤄진 조합의 목록을 반환한다.
 * 빙고 되는 index의 조합 목록에서 선택한 숫자의 index가 포함된 경우만 필터링하고, 해당 조합만 확인한다.
 * @param list
 * @param selectd
 */
export function makeMatchedIndexList(list: BingoTable, selected: number): number[][] {
  if (_sample(list) === null) {
    return [];
  }

  const targetList = list as BingoEntityData[];

  const selectedIndex = _findIndex(targetList, entity => entity.key === selected);

  return BINGO_INDEX_COMBINATION
  .filter(value => value.includes(selectedIndex))
  .filter(combination => _every(_map(combination, index => targetList[index].isSelected)));
}
