import { RootState } from '../../reducer';
import { selectMatchedCombinationState, selectMatchedCombinationById } from '../selectors';
import { MatchedCombinationState } from '../reducer';

describe('Matched combination selectors', () => {
  it('should select matched combination state', () => {
    const rootState: RootState = {
      gameStatus: {
        currentPlayerId: null,
        selectedNumbers: [],
      },
      matchedCombination: {
        byIds: {
          // tslint:disable-next-line: object-literal-key-quotes
          '1': {
            id: '1',
            playerId: '1',
            combination: [1, 2, 3, 4, 5],
          },
        },
        allIds: ['1'],
      },
      players: {
        byIds: {},
        allIds: [],
      },
    };

    expect(selectMatchedCombinationState(rootState)).toEqual({
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          playerId: '1',
          combination: [1, 2, 3, 4, 5],
        },
      },
      allIds: ['1'],
    });
  });

  it('should select Matched combination by ids', () => {
    const state: MatchedCombinationState = {
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

    expect(selectMatchedCombinationById.resultFunc(state)).toEqual({
      // tslint:disable-next-line: object-literal-key-quotes
      '1': {
        id: '1',
        playerId: '1',
        combination: [12, 13, 3, 4, 5],
      },
    });
  });
});
