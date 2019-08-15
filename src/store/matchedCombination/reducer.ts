import { MatchedCombinationAction, ADD_MATCHED_COMBINATION, RESET_MATCHED_COMBINATION } from './actions';
import { last as _last } from 'lodash';

interface MatchedCombinationValue {
  id: string;
  playerId: string;
  combination: number[];
}

export interface MatchedCombinationState {
  byIds: {
    [id: string]: MatchedCombinationValue,
  };
  allIds: string[];
}

export const initialMatchedCombinationState = {
  byIds: {},
  allIds: [],
};

export default function matchedCombinationReducer(state: MatchedCombinationState = initialMatchedCombinationState, action: MatchedCombinationAction): MatchedCombinationState {
  switch (action.type) {
    case ADD_MATCHED_COMBINATION:
      const newId = (Number(_last(state.allIds) || '0') + 1).toString();

      return {
        byIds: {
          ...state.byIds,
          [newId]: {
            id: newId,
            playerId: action.playerId,
            combination: action.combination,
          },
        },
        allIds: [
          ...state.allIds,
          newId,
        ],
      };
    case RESET_MATCHED_COMBINATION:
      return initialMatchedCombinationState;
    default:
      return state;
  }
}
