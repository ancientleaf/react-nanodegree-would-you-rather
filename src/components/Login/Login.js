import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import './Login.css';
import logo from './../NavigationBar/logo.svg';
import { authenticateUserAction } from '../../actions/AuthUserAction';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedUser: 'none',
      toHome: false
    };

    this.loginSubmitHandle = this.loginSubmitHandle.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.dispatch = props.dispatch.bind(this);
  }

  handleSelectChange(event) {
    this.setState({
      selectedUser: event.target.value
    });
  }

  loginSubmitHandle(event) {
    event.preventDefault();

    if (this.state.selectedUser === 'none') {
      return;
    }

    this.dispatch(authenticateUserAction(this.state.selectedUser));

    this.setState({
      toHome: true
    });
  }

  render() {
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }

    const { users } = this.props;

    return (
      <div className='signin-container'>
        <div className='signin-header'>
          <h3>Welcome to the Would You Rather App</h3>
          <p>Please sign in to continue</p>
        </div>

        <img src={logo} className='signin-logo' alt="logo" />

        <form className='signin-dropdown' onSubmit={this.loginSubmitHandle}>
          <label >Sign In</label>

          <select onChange={this.handleSelectChange} defaultValue='none'>
            <option key='none' value='none' disabled> Select User </option>
            {
              Object.keys(users).map((userId) => (
                <option key={userId} value={userId}> {users[userId].name} </option>
              ))
            }
          </select>

          <button type='submit' className='signin-btn' disabled={this.state.selectedUser === 'none'}>Sign In</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

export default connect(mapStateToProps)(Login);