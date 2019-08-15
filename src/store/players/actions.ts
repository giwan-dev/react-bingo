export type PlayersAction = ReturnType<
  typeof addNumber |
  typeof resetPlayers
>;

export const ADD_NUMBER = 'ADD_NUMBER';
export const RESET_PLAYERS = 'RESET_PLAYERS';

export function addNumber(num: number) {
  return {
    num,
    type: ADD_NUMBER,
  } as const;
}

export function resetPlayers() {
  return {
    type: RESET_PLAYERS,
  } as const;
}
