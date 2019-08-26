import { RootState } from '../../reducer';
import { GameStatusState } from '../reducer';
import { selectGameStatusState, selectSelectedNumbers, makeSelectCurrentPlayerId, makeSelectIsGameStarted } from '../selectors';

describe('Game status selectors', () => {
  it('should select game status state.', () => {
    const mockState: RootState = {
      gameStatus: {
        currentPlayerId: '1',
        selectedNumbers: [1, 2, 3, 4, 5],
      },
      players: {
        byIds: {},
        allIds: [],
      },
      matchedCombination: {
        byIds: {},
        allIds: [],
      },
    };
    expect(selectGameStatusState(mockState)).toEqual({
      currentPlayerId: '1',
      selectedNumbers: [1, 2, 3, 4, 5],
    });
  });

  it('should return selected numbers.', () => {
    const mockState: GameStatusState = {
      currentPlayerId: null,
      selectedNumbers: [1, 2, 3, 4, 5],
    };

    expect(selectSelectedNumbers.resultFunc(mockState)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return current player ID', () => {
    const state1: GameStatusState = {
      currentPlayerId: 'test-ID',
      selectedNumbers: [],
    };
    const state2: GameStatusState = {
      currentPlayerId: null,
      selectedNumbers: [],
    };
    expect(makeSelectCurrentPlayerId().resultFunc(state1)).toEqual('test-ID');
    expect(makeSelectCurrentPlayerId().resultFunc(state2)).toEqual(null);
  });

  it('should return whether game started.', () => {
    expect(makeSelectIsGameStarted().resultFunc('test-ID')).toEqual(true);
    expect(makeSelectIsGameStarted().resultFunc(null)).toEqual(false);
  });
});
