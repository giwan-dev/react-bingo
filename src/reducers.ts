import { Action, ADD_NUMBER, SET_NEW_GAME, UPDATE_TURN } from './actions';
import { uniq as _uniq } from 'lodash';

export interface State {
  selectedNumberList: number[];
  turn: 1|2|null;
}

const initialState: State = {
  selectedNumberList: [],
  turn: null,
};

export default function rootReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case SET_NEW_GAME:
      return {
        ...state,
        turn: 1,
      };
    case UPDATE_TURN:
      return {
        ...state,
        turn: action.turn,
      };
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
