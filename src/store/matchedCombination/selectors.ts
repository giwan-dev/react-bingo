import { RootState } from 'store/reducer';
import { initialMatchedCombinationState } from './reducer';
import { createSelector } from 'reselect';

const selectMatchedCombinationState = (state: RootState) => state.matchedCombination || initialMatchedCombinationState;

const selectMatchedCombinationById = createSelector(selectMatchedCombinationState, state => state.byIds);

export {
  selectMatchedCombinationState,
  selectMatchedCombinationById,
};
