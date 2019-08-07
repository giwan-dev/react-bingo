export type BingoTable = BingoEntityData[] | null[];

/**
 * 플레이어 데이터 형식
 */
export interface PlayerData {
  name: string;
  table: BingoTable;
  matchedIndexList: number[][];
}

/**
 * 빙고 데이터 형식
 */
export interface BingoEntityData {
  key: number;
  isSelected: boolean;
}
