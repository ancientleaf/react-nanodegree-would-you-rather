import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PollQuestion from '../PollQuestion/PollQuestion';
import PollResult from '../PollResult/PollResult';

import './PollQuestionCard.css'

class PollQuestionCard extends Component {
  
  render() {
    const { questionId, author, isQuestionAnswered, validQuestionId } = this.props;

    console.log(this.props)
    if( !validQuestionId ) {
      return <Redirect to='/not-found'></Redirect>
    }

    return (

      <div className='poll-question-card-container'>
        <div className='poll-question-card-container-header'>
          <span> { author.name } asks: </span>
        </div>
        <div className='poll-question-card-content'>
          <img className='poll-question-card-avatar' src={ author.avatarURL } alt="logo" />
          <div className='vertical-divider'></div>
          <div className='poll-question-card-detail-container'>
            {
              isQuestionAnswered ? 
              <PollResult questionId={ questionId }></PollResult>
                : <PollQuestion questionId={ questionId }></PollQuestion>
            }
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps( state, ownProps ){
  const { questions, users, authedUser } = state;
  const questionId  = ownProps.match.params.id;

  return {
    questionId,
    author: questions.hasOwnProperty(questionId) ? users[questions[questionId].author] : null,
    authedUser,
    isQuestionAnswered: users[authedUser].answers[questionId] ? true : false,
    validQuestionId: questions.hasOwnProperty(questionId)
  }
};

export default connect(mapStateToProps)(PollQuestionCard);