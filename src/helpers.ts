import { PlayerData, BingoTable } from 'typing';
import {
  range as _range,
  map as _map,
  shuffle as _shuffle,
  chunk as _chunk,
  every as _every,
} from 'lodash';
import { PlayerStateValue } from 'store/players/reducer';

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
export const makeNewTable = () => _map(_shuffle(_range(25)), num => num + 1);

export function makeBingoTable(table: number[], selectedNumbers: number[]): BingoTable {
  return table.map(value => ({
    key: value,
    isSelected: selectedNumbers.includes(value),
  }));
}

export function makeMatchedIndexList(table: number[], selectedNumbers: number[]): number[][] {
  return BINGO_INDEX_COMBINATION
    .filter(combination => _every(_map(combination, index => selectedNumbers.includes(table[index])))); // 모든 인덱스가 선택된 조합만 필터링
}

export function makePlayerData(player: PlayerStateValue, selectedNumbers: number[]): PlayerData {
  const bingoTable = makeBingoTable(player.table, selectedNumbers);
  const matchedIndexList = makeMatchedIndexList(player.table, selectedNumbers);

  return {
    matchedIndexList,
    id: player.id,
    name: player.name,
    table: bingoTable,
  };
}
