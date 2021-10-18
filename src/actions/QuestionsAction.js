import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { saveQuestionAnswer, saveQuestion } from './../util/api';
import { saveQuestionToUserAction, saveVoteByUserAction } from './UsersAction';

const LOAD_ALL_QUESTIONS = 'LOAD_ALL_QUESTIONS';
const SAVE_QUESTION_ANSWER = 'SAVE_QUESTIONS_ANSWER';
const ADD_QUESTION = 'ADD_QUESTION';


function submitQuestionAnswerAction(questionId, selectedOption) {
  return (dispatch, getstate) => {
    dispatch(showLoading());

    return saveQuestionAnswer({
      qid: questionId,
      answer: selectedOption,
      authedUser: getstate().authedUser
    }).then(() => {
      dispatch(saveQuestionAnswerAction(questionId, selectedOption, getstate().authedUser));
      dispatch(saveVoteByUserAction(questionId, selectedOption, getstate().authedUser))
    }
    ).then(
      () => {
        dispatch(hideLoading());
      }
    )
  };

}

function loadAllQuestionsAction(questions) {
  return {
    type: LOAD_ALL_QUESTIONS,
    questions
  };
}

function saveQuestionAnswerAction(questionId, selectedOption, authedUser) {
  return {
    type: SAVE_QUESTION_ANSWER,
    questionId,
    selectedOption,
    authedUser
  };
}

function saveQuestionAction(optionOneText, optionTwoText) {
  return (dispatch, getstate) => {
    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: getstate().authedUser
    }).then(formattedQuestion => {
      dispatch(addQuestionAction(formattedQuestion));
      dispatch(saveQuestionToUserAction(formattedQuestion.id, getstate().authedUser));
    }).then(
      dispatch(hideLoading())
    )
  };
}

function addQuestionAction(newQuestion) {
  return {
    type: ADD_QUESTION,
    newQuestion
  };
}

export {
  LOAD_ALL_QUESTIONS,
  loadAllQuestionsAction,
  SAVE_QUESTION_ANSWER,
  submitQuestionAnswerAction,
  ADD_QUESTION,
  saveQuestionAction
};