import { ADD_QUESTION, LOAD_ALL_QUESTIONS, SAVE_QUESTION_ANSWER } from "../actions/QuestionsAction";

function questionsReducer(state = {}, action) {
  switch(action.type) {
    case LOAD_ALL_QUESTIONS:
      return action.questions
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.selectedOption]: {
            ...state[action.questionId][action.selectedOption],
            votes: state[action.questionId][action.selectedOption].votes.concat([action.authedUser])
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.newQuestion.id]: action.newQuestion 
      }
    default:
      return state
  }
}

export { questionsReducer }