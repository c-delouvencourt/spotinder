import * as types from '../../actions/ActionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isAuthenticated: false,
  user: undefined
});

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTH_LOGIN_USER:
      return state.merge({
        isAuthenticated: true,
        user: action.payload,
      });
    case types.AUTH_LOGOUT_USER:
      return state.merge({
        isAuthenticated: false,
        user: undefined,
      });
    default:
      return state;
  }
}
