const LOAD_ALL_USERS = 'LOAD_ALL_USERS';
const SAVE_QUESTION_TO_USER = 'SAVE_QUESTION_TO_USER';

function loadAllUsersAction(users) {
  return {
    type: LOAD_ALL_USERS,
    users
  };
}

function saveQuestionToUserAction(questionId, authedUser) {
  return {
    type: SAVE_QUESTION_TO_USER,
    questionId,
    authedUser
  };
}

export {
  loadAllUsersAction,
  LOAD_ALL_USERS,
  saveQuestionToUserAction,
  SAVE_QUESTION_TO_USER
};