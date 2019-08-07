export const START_GAME = 'START_GAME';
export const RESET_GAME = 'RESET_GAME';
export const ADD_NUMBER = 'ADD_NUMBER';

export type Action = ReturnType<
  typeof startGame |
  typeof resetGame |
  typeof addNumber
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
 * 다시 게임을 시작하는 액션을 반환합니다.ㄴ
 */
export function resetGame() {
  return {
    type: RESET_GAME,
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
