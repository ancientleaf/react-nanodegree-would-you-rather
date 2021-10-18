import React, { Component } from "react";
import { connect } from 'react-redux';
import { saveQuestionAction } from "../../actions/QuestionsAction";
import { Redirect } from "react-router";

import './CreateQuestion.css';

class CreateQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionOne: '',
      optionTwo: '',
      submitDisabled: true,
      toHome: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleSubmitBtn = this.toggleSubmitBtn.bind(this);
    
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(saveQuestionAction(
      this.state.optionOne,
      this.state.optionTwo
    ));
    this.setState({
      toHome: true
    })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })

    this.toggleSubmitBtn();
  }

  toggleSubmitBtn() {
    this.setState({
      submitDisabled: this.state.optionOne.length > 0 
        && this.state.optionOne.length > 0 ? false : true
    });
  }

  render() {
    if (this.state.toHome === true) {
      return <Redirect to='/'></Redirect>
    }
    return (
      <div className='create-question-container'>
        <h2 className='create-question-header'>Create New Question</h2>
        <div className='create-question-content-container'>
          <p>Complete the question:</p>
          <h3>Would you rather...</h3>

          <form className='create-question-form' onSubmit={ this.handleSubmit }>
            <input type='text' id='optionOne' name='optionOne' value={ this.state.optionOne } onChange={ this.handleInputChange }></input>
            <h3>OR</h3>
            <input type='text' id='optionTwo' name='optionTwo' value={ this.state.optionTwo } onChange={ this.handleInputChange }></input>
            <button type='submit' className={ this.state.submitDisabled ? 'create-submit-btn-disabled' : 'create-submit-btn' }>Submit</button>
          </form>
        </div>
      </div>
    )
  }
  
}

function mapStateToProps(state, ownProps) {
  return state
}

export default connect(mapStateToProps)(CreateQuestion);