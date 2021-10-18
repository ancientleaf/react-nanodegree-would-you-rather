import React, { Component, Fragment } from 'react'
import './App.css';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { initialiseAppAction } from './../../actions/SharedAction'

import NavigationBar from './../NavigationBar/NavigationBar';
import Login from '../Login/Login';
import QuestionList from '../QuestionList/QuestionList';
import PollQuestionCard from '../PollQuestionCard/PollQuestionCard';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import CreateQuestion from '../CreateQuestion/CreateQuestion';
import NotFound from '../NotFound/NotFound';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(initialiseAppAction());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div className="App">
            <NavigationBar ></NavigationBar>
            <LoadingBar className="loading"></LoadingBar>
            {
              this.props.authedUser ?
                <div className='app-content-container'>
                  <Route path='/' exact component={QuestionList} ></Route>
                  <Route path='/question/:id' exact component={PollQuestionCard} ></Route>
                  <Route path='/leaderboard' exact component={LeaderBoard} ></Route>
                  <Route path='/add' exact component={CreateQuestion} ></Route>
                  <Route path='/not-found' exact component={NotFound}></Route>
                </div>

                : <Login></Login>
            }
          </div>
        </Fragment>
      </Router>


    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  };
}

export default connect(mapStateToProps)(App);