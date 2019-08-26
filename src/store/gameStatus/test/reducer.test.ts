import { UPDATE_CURRENT_PLAYER_ID, SELECT_NUMBER, RESET_GAME } from './../actions';
import { START_GAME } from '../actions';
import reducer from '../reducer';

describe('Game status reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      currentPlayerId: null,
      selectedNumbers: [],
    });
  });

  it('should handle START_GAME', () => {
    const prevState = {
      currentPlayerId: '42',
      selectedNumbers: [1, 2, 3, 4, 5],
    };
    const action = {
      type: START_GAME,
    } as const;
    const expectedState = {
      currentPlayerId: '42',
      selectedNumbers: [],
    };

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_CURRENT_PLAYER_ID', () => {
    const prevState = {
      currentPlayerId: null,
      selectedNumbers: [1, 2, 3, 4, 5],
    };
    const playerId = 'test-id';
    const action = {
      id: playerId,
      type: UPDATE_CURRENT_PLAYER_ID,
    } as const;
    const expectedState = {
      currentPlayerId: playerId,
      selectedNumbers: [1, 2, 3, 4, 5],
    };

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle SELECT_NUMBER', () => {
    const prevState = {
      currentPlayerId: '42',
      selectedNumbers: [1, 2, 3, 4, 5],
    };
    const num = 42;
    const action = {
      num,
      type: SELECT_NUMBER,
    } as const;
    const expectedState = {
      currentPlayerId: '42',
      selectedNumbers: [1, 2, 3, 4, 5, 42],
    };

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle RESET_GAME', () => {
    const prevState = {
      currentPlayerId: '42',
      selectedNumbers: [1, 2, 3, 4, 5],
    };
    const action = {
      type: RESET_GAME,
    } as const;
    const expectedState = {
      currentPlayerId: null,
      selectedNumbers: [],
    };

    expect(reducer(prevState, action)).toEqual(expectedState);
  });
});
