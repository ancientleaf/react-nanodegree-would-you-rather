import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { submitQuestionAnswerAction } from '../../actions/QuestionsAction';

import './PollQuestion.css';

class PollQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      toHome: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);

  }

  handleQuestionSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(submitQuestionAnswerAction(this.props.question.id, this.state.selectedOption));
    this.setState({
      selectedOption: null,
      toHome: true
    })
  };

  handleInputChange = (event) => {
    this.setState({
      selectedOption: event.target.value
    })
  };

  render() {
    if (this.state.toHome === true) {
      return <Redirect to={`/question/${this.props.question.id}`}></Redirect>
    }

    const { question } = this.props;

    return (
      <div className='poll-question-container'>
        <div className='title'>Would you rather...</div>

        <form className='options-group-form' onSubmit={this.handleQuestionSubmit}>
          <div className='option'>
            <input
              type="radio"
              id="optionOne"
              name="option"
              value="optionOne"
              checked={this.state.selectedOption === "optionOne"}
              onChange={this.handleInputChange} ></input>
            <label>{question.optionOne.text}</label>
          </div>
          <div className='option'>
            <input
              type="radio"
              id="optionTwo"
              name="option"
              value="optionTwo"
              checked={this.state.selectedOption === "optionTwo"}
              onChange={this.handleInputChange} ></input>
            <label>{question.optionTwo.text}</label>
          </div>
          <button className='submit-btn' disabled={this.state.selectedOption === null}>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { questions } = state;
  const { questionId } = ownProps;


  return {
    question: questions[questionId]
  }
};

export default connect(mapStateToProps)(PollQuestion);