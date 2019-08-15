import { BingoEntityData } from 'typing';

export type GameStatusAction = ReturnType<
  typeof startGame |
  typeof updateCurrentPlayerIndex |
  typeof resetGameStatus
>;

export const START_GAME = 'START_GAME';
export const UPDATE_CURRENT_PLAYER_INDEX = 'UPDATE_CURRENT_PLAYER_INDEX';
export const RESET_GAME_STATUS = 'RESET_GAME_STATUS';

export function startGame(tables: BingoEntityData[][]) {
  return {
    tables,
    type: START_GAME,
  } as const;
}

export function updateCurrentPlayerIndex(index: number) {
  return {
    index,
    type: UPDATE_CURRENT_PLAYER_INDEX,
  } as const;
}

export function resetGameStatus() {
  return {
    type: RESET_GAME_STATUS,
  } as const;
}
