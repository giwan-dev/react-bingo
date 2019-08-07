import { Action, ADD_NUMBER } from './actions';
import { uniq as _uniq } from 'lodash';

export interface State {
  selectedNumberList: number[];
}

const initialState: State = {
  selectedNumberList: [],
};

export default function rootReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ADD_NUMBER:
      return {
        ...state,
        selectedNumberList: _uniq([
          ...state.selectedNumberList,
          action.num,
        ]),
      };
    default:
      return state;
  }
}
