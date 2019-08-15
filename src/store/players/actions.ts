export type PlayersAction = ReturnType<
  typeof addPlayer |
  typeof resetPlayers
>;

export const ADD_PLAYER = 'ADD_PLAYER';
export const RESET_PLAYERS = 'RESET_PLAYERS';

export function addPlayer(id: string, name: string, table: number[]) {
  return {
    id,
    name,
    table,
    type: ADD_PLAYER,
  } as const;
}

export function resetPlayers() {
  return {
    type: RESET_PLAYERS,
  } as const;
}
