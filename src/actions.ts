export const SET_NEW_GAME = 'SET_NEW_GAME';
export const UPDATE_TURN = 'UPDATE_TURN';
export const ADD_NUMBER = 'ADD_NUMBER';

export type Action = ReturnType<
  typeof setNewGame |
  typeof updateTurn |
  typeof addNumber
>;

/**
 * 새 게임을 시작하는 액션을 반환합니다.
 */
export function setNewGame() {
  return {
    type: SET_NEW_GAME,
  } as const;
}

/**
 * 차례를 스토어에 업데이트합니다.
 * @param turn
 */
export function updateTurn(turn: 1|2|null) {
  return {
    turn,
    type: UPDATE_TURN,
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
