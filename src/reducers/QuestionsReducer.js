import { ADD_QUESTION, LOAD_ALL_QUESTIONS, SAVE_QUESTION_ANSWER } from "../actions/QuestionsAction";
import produce from 'immer';

// Reducer with initial state
const INITIAL_STATE = {};

const questionsReducer = produce( (draft, action) => {
  switch(action.type) {
    case LOAD_ALL_QUESTIONS:
      return action.questions;
    case SAVE_QUESTION_ANSWER:
      draft[action.questionId][action.selectedOption].votes.push(action.authedUser);
      break;
    case ADD_QUESTION:
      draft[action.newQuestion.id] = action.newQuestion 
      break;
    default:
      break;
  }
}, INITIAL_STATE);

export { questionsReducer }