const LOAD_ALL_USERS = 'LOAD_ALL_USERS';
const SAVE_USER_VOTE = 'SAVE_USER_VOTE';
const SAVE_QUESTION_TO_USER = 'SAVE_QUESTION_TO_USER';

function loadAllUsersAction(users) {
  return {
    type: LOAD_ALL_USERS,
    users
  };
}

function saveVoteByUserAction(questionId, selectedOption, authedUser) {
  return {
    type: SAVE_USER_VOTE,
    questionId,
    selectedOption,
    authedUser
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
  saveVoteByUserAction,
  SAVE_USER_VOTE,
  saveQuestionToUserAction,
  SAVE_QUESTION_TO_USER
};