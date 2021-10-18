import { AUTH_USER, LOGOUT_USER } from './../actions/AuthUserAction';

function authUserReducer(state='', action) {
  switch(action.type) {
    case AUTH_USER:
      return action.id
    case LOGOUT_USER:
      return ''
    default:
      return state
  }
}

export {authUserReducer};