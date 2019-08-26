import { RESET_PLAYERS } from './../actions';
import reducer, { PlayersState } from '../reducer';
import { ADD_PLAYER } from '../actions';

describe('Players reducer', () => {
  it('should return intial state.', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      byIds: {},
      allIds: [],
    });
  });

  it('should handle ADD_PLAYER', () => {
    const prevState: PlayersState = {
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          name: 'Player 1',
          table: [1, 2, 4],
        },
      },
      allIds: ['1'],
    };
    const id = '2';
    const name = 'Player 2';
    const table = [1, 3, 4];
    const action = {
      id,
      name,
      table,
      type: ADD_PLAYER,
    } as const;
    const expectedState: PlayersState = {
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          name: 'Player 1',
          table: [1, 2, 4],
        },
        [id]: {
          id,
          name,
          table,
        },
      },
      allIds: ['1', id],
    };

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PLAYERS', () => {
    const prevState: PlayersState = {
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          name: 'Player 1',
          table: [1, 2, 4],
        },
        // tslint:disable-next-line: object-literal-key-quotes
        '2': {
          id: '2',
          name: 'Player 2',
          table: [1, 2, 3],
        },
      },
      allIds: ['1', '2'],
    };
    const action = {
      type: RESET_PLAYERS,
    } as const;
    const expectedState = {
      byIds: {},
      allIds: [],
    };

    expect(reducer(prevState, action)).toEqual(expectedState);
  });
});
