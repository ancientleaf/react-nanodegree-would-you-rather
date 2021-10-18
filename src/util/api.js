import {
  _getUsers,
  _saveQuestion,
  _getQuestions,
  _saveQuestionAnswer
} from './../data-source/_DATA';

function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions()
  ]).then( ([users, questions]) => ({
    users,
    questions
  }));
}

function saveQuestion(question) {
  return _saveQuestion(question);
}

function saveQuestionAnswer({ authedUser, qid, answer }) {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}

export {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer
};