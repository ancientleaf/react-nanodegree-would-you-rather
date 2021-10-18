import { SAVE_QUESTION_ANSWER } from '../actions/QuestionsAction';
import { LOAD_ALL_USERS, SAVE_QUESTION_TO_USER } from './../actions/UsersAction';
import produce from 'immer';

// Reducer with initial state
const INITIAL_STATE = {};

const usersReducer = produce( (draft, action) => {
  switch(action.type) {
    case LOAD_ALL_USERS: {
      return action.users;
    }
    case SAVE_QUESTION_ANSWER: {
      draft[action.authedUser].answers[action.questionId] = action.selectedOption
      break;
    }
    case SAVE_QUESTION_TO_USER:
      draft[action.authedUser].questions.push(action.questionId);
      break;
    default:
      break;
  }
}, INITIAL_STATE);

export {usersReducer};