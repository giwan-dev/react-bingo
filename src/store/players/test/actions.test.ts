import { ADD_PLAYER, RESET_PLAYERS, addPlayer, resetPlayers } from '../actions';

describe('Players actions', () => {
  it('should create an action to add player.', () => {
    const id = '1';
    const name = 'Player 1';
    const table = [1, 3, 4];
    const expectedAction = {
      id,
      name,
      table,
      type: ADD_PLAYER,
    };

    expect(addPlayer(id, name, table)).toEqual(expectedAction);
  });

  it('should create an action to reset players.', () => {
    const expectedAction = {
      type: RESET_PLAYERS,
    };

    expect(resetPlayers()).toEqual(expectedAction);
  });
});
