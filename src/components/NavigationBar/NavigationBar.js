import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import './NavigationBar.css';
import logo from './logo.svg';


import { connect } from 'react-redux';
import { logoutUserAction } from '../../actions/AuthUserAction';

class NavigationBar extends Component {

  logoutHandler = (event) => {
    event.preventDefault();
    this.props.dispatch(logoutUserAction());
  }

  render() {
    let { authedUser } = this.props;
    return (
      <div className='nav-bar'>
        <div className='nav-list-left'>
          <img src={logo} className="nav-logo" alt="logo" />
          <ul className='nav-list'>
            <li className='nav-item'>
              <NavLink exact className='nav-item-text' to='/'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink exact className='nav-item-text' to='/add'>New Question</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink exact className='nav-item-text' to='/leaderboard'>Leader Board</NavLink>
            </li>
          </ul>
        </div>
        <div className='nav-list-right'>
          {
            authedUser === null ?
              <div></div> : this.generateLoggedInNav(authedUser)
          }
        </div>
      </div>
    )
  }

  generateLoggedInNav(authedUser) {
    return (
      <ul className='nav-list'>
        <li className='nav-item-welcome'>
          <span>Hello, {authedUser.name}</span>
        </li>
        <li className='nav-item'>
          <span className='nav-item-text logout-btn' onClick={this.logoutHandler}>Logout</span>
        </li>
      </ul>
    )
  };

  generateLoggedOutNav = (authedUser) => (
    <div>
      <ul>
        <li>
          <span>Signout</span>
        </li>
      </ul>
    </div>
  );
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser: users.hasOwnProperty(authedUser) ? users[authedUser] : null
  }
}

export default connect(mapStateToProps)(NavigationBar);