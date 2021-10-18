import { SAVE_QUESTION_ANSWER } from '../actions/QuestionsAction';
import { LOAD_ALL_USERS, SAVE_QUESTION_TO_USER } from './../actions/UsersAction';

function usersReducer(state = {}, action) {
  switch(action.type) {
    case LOAD_ALL_USERS:
      return action.users
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.questionId]: action.selectedOption
          }
        }
      }
    case SAVE_QUESTION_TO_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([action.questionId])
        }
      }
    default:
      return state
  }
}

export {usersReducer};