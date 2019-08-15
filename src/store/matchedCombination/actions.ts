export type MatchedCombinationAction = ReturnType<
  typeof updateMatchedCombination |
  typeof addMatchedCombination |
  typeof resetMatchedCombination
>;

export const UPDATE_MATCHED_COMBINATION = 'UPDATE_MATCHED_COMBINATION';
export const ADD_MATCHED_COMBINATION = 'ADD_MATCHED_COMBINATION';
export const RESET_MATCHED_COMBINATION = 'RESET_MATCHED_COMBINATION';

export function updateMatchedCombination(playerId: string, selectedNumber: number) {
  return {
    playerId,
    selectedNumber,
    type: UPDATE_MATCHED_COMBINATION,
  } as const;
}

export function addMatchedCombination(playerId: string, combination: number[]) {
  return {
    playerId,
    combination,
    type: ADD_MATCHED_COMBINATION,
  } as const;
}

export function resetMatchedCombination() {
  return {
    type: RESET_MATCHED_COMBINATION,
  } as const;
}
