import { USER_LOGIN, USER_LOGOUT, LOGIN_STATE } from './consts';

export default function userProfile(
  state = {
    isFetching: false,
    didInvalidate: false,
    user: {},
    state: {},
    auth: {},
    data: {},
    status: false
  },
  action
) {
  switch (action.type) {
    case LOGIN_STATE:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
        state: action.state
      });
    case USER_LOGIN:
      console.log('USER_LOGIN: ', action);
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        auth: action.auth,
        data: action.data
      });
    case USER_LOGOUT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        status: action.state
      });
    default:
      return state;
  }
}
