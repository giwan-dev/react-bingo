export type GameStatusAction = ReturnType<
  typeof startGame |
  typeof resetGame |
  typeof updateCurrentPlayerId |
  typeof selectNumber
>;

export const START_GAME = 'START_GAME';
export const RESET_GAME = 'RESET_GAME';
export const UPDATE_CURRENT_PLAYER_ID = 'UPDATE_CURRENT_PLAYER_ID';
export const SELECT_NUMBER = 'SELECT_NUMBER';

export function startGame() {
  return {
    type: START_GAME,
  } as const;
}

export function resetGame() {
  return {
    type: RESET_GAME,
  } as const;
}

export function updateCurrentPlayerId(id: string) {
  return {
    id,
    type: UPDATE_CURRENT_PLAYER_ID,
  } as const;
}

export function selectNumber(num: number) {
  return {
    num,
    type: SELECT_NUMBER,
  } as const;
}
