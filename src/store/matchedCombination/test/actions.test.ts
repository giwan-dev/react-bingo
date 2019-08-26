import { resetMatchedCombination } from 'store/matchedCombination/actions';
import { ADD_MATCHED_COMBINATION, addMatchedCombination, RESET_MATCHED_COMBINATION } from './../actions';
import { UPDATE_MATCHED_COMBINATION, updateMatchedCombination } from '../actions';

describe('Matched combination actions', () => {
  it('should create an action to update matched combination.', () => {
    const playerId = '1';
    const selectedNumber = 1;
    const expectedAction = {
      playerId,
      selectedNumber,
      type: UPDATE_MATCHED_COMBINATION,
    } as const;

    expect(updateMatchedCombination(playerId, selectedNumber)).toEqual(expectedAction);
  });

  it('should create an action to add matched combination.', () => {
    const playerId = '1';
    const combination = [1, 2, 3, 4, 5];
    const expectedAction = {
      playerId,
      combination,
      type: ADD_MATCHED_COMBINATION,
    } as const;

    expect(addMatchedCombination(playerId, combination)).toEqual(expectedAction);
  });

  it('should create an action to reset matched combination.', () => {
    const expectedAction = {
      type: RESET_MATCHED_COMBINATION,
    };

    expect(resetMatchedCombination()).toEqual(expectedAction);
  });
});
