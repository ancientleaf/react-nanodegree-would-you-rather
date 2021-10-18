import { combineReducers } from "redux";
import { authUserReducer } from "./AuthUserReducer";
import { usersReducer } from "./UsersReducer";
import { questionsReducer } from "./QuestionsReducer";
import { loadingBarReducer } from 'react-redux-loading-bar'

export const combinedReducers = combineReducers({
  questions: questionsReducer,
  users: usersReducer,
  authedUser: authUserReducer,
  loadingBar: loadingBarReducer
});