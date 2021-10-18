import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { getInitialData } from "../util/api";
import { loadAllUsersAction } from './UsersAction';
import { loadAllQuestionsAction } from './QuestionsAction'
import { authenticateUserAction } from './AuthUserAction';

function initialiseAppAction() {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return getInitialData().then((res) => {
      dispatch(loadAllUsersAction(res.users));
      dispatch(loadAllQuestionsAction(res.questions));
      dispatch(authenticateUserAction(null));
      dispatch(hideLoading());
    })
  }
}

export { initialiseAppAction };