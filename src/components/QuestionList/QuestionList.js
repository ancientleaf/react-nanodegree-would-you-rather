import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './QuestionList.css';

const DISPLAY_ANSWERED = 'DISPLAY_ANSWERED';
const DISPLAY_UNANSWERED = 'DISPLAY_UNANSWERED';

class QuestionList extends Component {
  
  state = {
    displayQuestionsOption: DISPLAY_UNANSWERED
  }

  getDisplayQuestionIds = () => {
    if( this.state.displayQuestionsOption === DISPLAY_ANSWERED) {
      return this.props.answeredQuestionsIds
    } else {
      return this.props.unansweredQuestionsIds
    }
  }

  getQuestionSelectorClass = (classOption) => {
    if( this.state.displayQuestionsOption === classOption) {
      return 'question-selector-btn-selected'
    } else {
      return 'question-selector-btn'
    }
  }

  setDisplayQuestionOption = (displayOption) => {
    this.setState( {
      displayQuestionsOption: displayOption
    });
  }

  render() {
    const { questions, users } = this.props;
    let displayQuestionIds = this.getDisplayQuestionIds();
  
    return (
      <div className='question-list-container'>
        <div className='question-selector-btn-group'>
          <button className={this.getQuestionSelectorClass(DISPLAY_ANSWERED)} onClick={(e) => {this.setDisplayQuestionOption(DISPLAY_ANSWERED)}}>Answered Questions</button>
          <button className={this.getQuestionSelectorClass(DISPLAY_UNANSWERED)} onClick={(e) => {this.setDisplayQuestionOption(DISPLAY_UNANSWERED)}}>Unanswered Questions</button>
        </div>
        <ul>
          {
            displayQuestionIds.map( questionId => (
              <li key={questionId}>
                <div className='question-summary-container'>
                  <div className='question-summary-container-header'>
                    { users[questions[questionId].author].name } asks: 
                  </div>
                  <div className='question-summary-block'>
                    <img className='question-avatar' src={users[questions[questionId].author].avatarURL} alt="logo" />
                    <div className='question-summary-block-divider'></div>
                    <div className='question-summary'>  
                      <div className='question-summary-question '><span>Would you rather ...</span></div>
                      <div className='question-summary-answer'> ... { questions[questionId].optionOne.text.substring(0, 100) } ...</div>
                      <NavLink className='view-poll-btn' id={ questionId } to={`/question/${questionId}`}>View Poll</NavLink>
                    </div>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

}

function mapStateToProps( { questions, users, authedUser }) {
  let user = users[authedUser];

  return {
    answeredQuestionsIds: user ? Object.keys(questions)
                                  .filter( qId => user.answers.hasOwnProperty(qId) )
                                  . sort((a, b) => questions[b].timestamp - questions[a].timestamp ) : [],
    unansweredQuestionsIds: user ? Object.keys(questions)
                                    .filter( qId => ! user.answers.hasOwnProperty(qId) )
                                    .sort((a, b) => questions[b].timestamp - questions[a].timestamp ) : [],
    questions,
    users
  }
}

export default connect(mapStateToProps)(QuestionList);