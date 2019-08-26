import { RESET_GAME, resetGame, SELECT_NUMBER, selectNumber, updateCurrentPlayerId, UPDATE_CURRENT_PLAYER_ID } from './../actions';
import { START_GAME, startGame } from '../actions';

describe('Game status actions', () => {
  it('should create an action to start game.', () => {
    const expectedAction = {
      type: START_GAME,
    };
    expect(startGame()).toEqual(expectedAction);
  });

  it('should create an action to reset game.', () => {
    const expectedAction = {
      type: RESET_GAME,
    };
    expect(resetGame()).toEqual(expectedAction);
  });

  it('should create an action to update current player ID', () => {
    const id = 'test-id';
    const expectedAction = {
      id,
      type: UPDATE_CURRENT_PLAYER_ID,
    };
    expect(updateCurrentPlayerId(id)).toEqual(expectedAction);
  });

  it('should create an action to select number.', () => {
    const num = 42;
    const expectedAction = {
      num,
      type: SELECT_NUMBER,
    };
    expect(selectNumber(num)).toEqual(expectedAction);
  });
});
