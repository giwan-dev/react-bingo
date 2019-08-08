export const START_GAME = 'START_GAME';
export const RESTART_GAME = 'RESTART_GAME';
export const ADD_NUMBER = 'ADD_NUMBER';
export const RESET_GAME = 'RESET_GAME';

export type Action = ReturnType<
  typeof startGame |
  typeof restartGame |
  typeof addNumber |
  typeof resetGame
>;

/**
 * 새 게임을 시작하는 액션을 반환합니다.
 */
export function startGame() {
  return {
    type: START_GAME,
  } as const;
}

/**
 * 다시 게임을 시작하는 액션을 반환합니다.
 */
export function restartGame() {
  return {
    type: RESTART_GAME,
  } as const;
}

/**
 * 숫자를 더하는 액션을 반환합니다.
 * @param num
 */
export function addNumber(num: number) {
  return {
    num,
    type: ADD_NUMBER,
  } as const;
}

/**
 * 게임을 완전히 초기화하는 액션을 반환합니다.
 */
export function resetGame() {
  return {
    type: RESET_GAME,
  } as const;
}
