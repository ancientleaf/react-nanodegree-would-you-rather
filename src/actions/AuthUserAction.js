const AUTH_USER = 'AUTH_USER';
const LOGOUT_USER = 'LOGOUT_USER';

function authenticateUserAction(userId){
  return {
    type: AUTH_USER,
    id: userId
  };
}

function logoutUserAction(userId){
  return {
    type: LOGOUT_USER,
    id: userId
  };
}

export { 
  authenticateUserAction, 
  AUTH_USER, 
  logoutUserAction, 
  LOGOUT_USER 
};