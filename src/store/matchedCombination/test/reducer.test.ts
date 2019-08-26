import { MatchedCombinationState } from './../reducer';
import { ADD_MATCHED_COMBINATION, RESET_MATCHED_COMBINATION } from './../actions';
import reducer from '../reducer';

describe('Matched combination reducer', () => {
  it('should return initial state.', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      byIds: {},
      allIds: [],
    });
  });

  it('should handle ADD_MATCHED_COMBINATION', () => {
    const prevState: MatchedCombinationState = {
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          playerId: '1',
          combination: [12, 13, 3, 4, 5],
        },
      },
      allIds: ['1'],
    };
    const playerId = '1';
    const combination = [1, 2, 3, 4, 5];
    const action = {
      playerId,
      combination,
      type: ADD_MATCHED_COMBINATION,
    } as const;
    const expectedState: MatchedCombinationState = {
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          playerId: '1',
          combination: [12, 13, 3, 4, 5],
        },
        // tslint:disable-next-line: object-literal-key-quotes
        '2': {
          playerId,
          combination,
          id: '2',
        },
      },
      allIds: ['1', '2'],
    };

    expect(reducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle RESET_MATCHED_COMBINATION', () => {
    const prevState: MatchedCombinationState = {
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          playerId: '1',
          combination: [12, 13, 3, 4, 5],
        },
      },
      allIds: ['1'],
    };
    const action = {
      type: RESET_MATCHED_COMBINATION,
    } as const;
    const expectedState = {
      byIds: {},
      allIds: [],
    };

    expect(reducer(prevState, action)).toEqual(expectedState);
  });
});
