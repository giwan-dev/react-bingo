export const ADD_NUMBER = 'ADD_NUMBER';

export type Action = ReturnType<
  typeof addNumber
>;

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
