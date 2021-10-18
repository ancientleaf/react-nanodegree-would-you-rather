import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PollResult.css'

const MAX_PROGRESS_BAR_SIZE = 230;

class PollResult extends Component {
  render() {
    const { question, optionOneVotes, optionTwoVotes, selfVotedOption } = this.props
    const totalVotes = optionOneVotes + optionTwoVotes;

    return (
      <div className='poll-result-container'>
        <div className='option-vote-container'>
          <div className='option-vote-container-content'>
            <div className='option-text'>{question.optionOne.text}</div>
            <div className='progress-container'>
              <div className='progress-bar'>
                <div className='progress-bar-base'>
                  <p className='progress-bar-text'>{ ( optionOneVotes / totalVotes * 100 ).toFixed(2) }%</p>
                  <span className='progress-bar-filled' style={{ width: optionOneVotes / totalVotes * MAX_PROGRESS_BAR_SIZE }}></span>
                </div>
              </div>
              <div className='progress-text'>{`${optionOneVotes} out of ${totalVotes} votes`}</div>
            </div>
          </div>
          {
            selfVotedOption === 'optionOne' &&
            <div className='voted'><span>Your Vote</span></div>
          }
        </div>
        <div className='option-vote-container'>
          <div className='option-vote-container-content'>
            <div className='option-text'>{question.optionTwo.text}</div>
            <div className='progress-container'>
              <div className='progress-bar'>
                <div className='progress-bar-base'>
                  <p className='progress-bar-text'>{ ( optionTwoVotes / totalVotes * 100 ).toFixed(2) }%</p>
                  <span className='progress-bar-filled' style={{ width: optionTwoVotes / totalVotes * MAX_PROGRESS_BAR_SIZE }}></span>
                </div>
              </div>
              <div className='progress-text'>{`${optionTwoVotes} out of ${totalVotes} votes`}</div>
            </div>
          </div>
          {
            selfVotedOption === 'optionTwo' &&
            <div className='voted'><span>Your Vote</span></div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { questions, users, authedUser } = state;
  const { questionId } = ownProps;

  const currentQuestion = questions[questionId];

  let selfVotedOption = null;
  if (currentQuestion.optionOne.votes.includes(authedUser)) {
    selfVotedOption = 'optionOne';
  } else if (currentQuestion.optionTwo.votes.includes(authedUser)) {
    selfVotedOption = 'optionTwo'
  }

  return {
    question: currentQuestion,
    selfVotedOption,
    optionOneVotes: currentQuestion.optionOne.votes.length,
    optionTwoVotes: currentQuestion.optionTwo.votes.length,
    currentUser: users[authedUser]
  }
}

export default connect(mapStateToProps)(PollResult);