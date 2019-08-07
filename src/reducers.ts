const initialState = {};

export default function rootReducer(state = initialState, action: any) { // FIXME: 액션 타입 가져오기
  switch(action.type) {
    default:
      return state;
  }
}
