import { PlayerData, BingoEntityData, BingoTable } from 'typing';
import {
  range as _range,
  map as _map,
  findIndex as _findIndex,
  shuffle as _shuffle,
  chunk as _chunk,
  every as _every,
} from 'lodash';

const NULL_ENTITY_ERROR_MESSAGE = '빙고 테이블에 null인 entity가 존재합니다.';

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
export const makeNewTable = () => _map(_shuffle(_range(25)), num => ({
  key: num + 1,
  isSelected: false,
}));

/**
 * 새로운 플레이어 목록을 만드는 함수
 */
export function initializePlayers(tables: BingoEntityData[][]): PlayerData[] {
  return tables.map((table, index) => ({
    table,
    name: `Player ${index + 1}`,
    matchedIndexList: [],
    isWin: false,
  }));
}

/**
 * 주어진 목록에서 선택한 숫자를 selected로 마킹한 새로운 어레이를 반환합니다.
 * @param table
 * @param selectedKey
 */
function markNewSelected(table: BingoTable, selectedKey: number): BingoTable {
  return _map(table, (entity) => {
    if (entity === null) {
      throw new Error(NULL_ENTITY_ERROR_MESSAGE);
    }

    if (entity.key === selectedKey) {
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
 * @param table
 * @param selectd
 */
function makeMatchedIndexList(table: BingoTable, selectedKey: number): number[][] {
  const selectedIndex = _findIndex(table, (entity) => {
    if (entity === null) {
      throw new Error(NULL_ENTITY_ERROR_MESSAGE);
    }
    return entity.key === selectedKey;
  });

  return BINGO_INDEX_COMBINATION
    .filter(combination => combination.includes(selectedIndex)) // 선택한 인덱스가 존재하는 조합만 필터링
    .filter(combination => _every(_map(combination, (index) => { // 모든 인덱스가 선택된 조합만 필터링
      const target = table[index];

      if (target === null) {
        throw new Error(NULL_ENTITY_ERROR_MESSAGE);
      }
      return target.isSelected;
    })));
}

/**
 * 선택한 숫자를 선택했다고 마킹한 Player 데이터를 반환합니다.
 * @param player
 * @param selected
 */
export function makeNewPlayerMapper(selected: number): (player: PlayerData) => PlayerData {
  return (player) => {
    const newTable = markNewSelected(player.table, selected);
    const newMatchedIndexList = [
      ...player.matchedIndexList,
      ...makeMatchedIndexList(newTable, selected),
    ];

    return {
      ...player,
      table: newTable,
      matchedIndexList: newMatchedIndexList,
      isWin: newMatchedIndexList.length >= 5,
    };
  };
}
