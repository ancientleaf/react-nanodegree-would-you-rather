import React, { Component } from 'react';
import { connect } from 'react-redux';

import './LeaderBoard.css'

class LeaderBoard extends Component {
  render() {
    const { usersSummary } = this.props;

    return (
      <div className='leaderboard-container'>
        <div className='leaderboard-header'>Leader Board</div>
        {
          usersSummary.map( (user, index) => (
            <div key={user.id} className='leaderboard-content-container-wrapper'>
              <div
                className={`leaderboard-ranking ${ this.getRankingColorClass(index + 1)}` }><span>{index + 1}</span></div>
              <div className='leaderboard-content-container'  >
                <img className='leaderboard-avatar' src={user.avatarURL} alt="logo" />
                <div className='leaderboard-user-summary-container'>
                  <h3 className='leaderboard-user-summary-name'>{user.name}</h3>
                  <div className='leaderboard-question-summary-container'>
                    <span> Answered Questions </span>
                    <span> { user.totalAnswered } </span>
                  </div>
                  <div className='horizontal-divider'></div>
                  <div className='leaderboard-question-summary-container'>
                    <span> Created Questions </span>
                    <span> { user.totalCreated } </span>
                  </div>
                </div>
                <div className='leaderboard-score-container'>
                  <div className='leaderboard-score-container-header'>Score</div>
                  <div className='leaderboard-score'>
                    <span>{ user.totalAnswered + user.totalCreated }</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        }

      </div>
    );
  }

  getRankingColorClass(rank) {
    switch (rank) {
      case 1:
        return 'rank-gold';
      case 2:
        return 'rank-silver';
      case 3:
        return 'rank-bronze';
      default:
        return 'rank-other';
    }
  }
}

function mapStateToProps(state, ownProps) {
  const { users } = state;
  let usersSummary = [];
  for (const [userId, userObj] of Object.entries(users)) {
    usersSummary.push({
      id: userId,
      avatarURL: userObj.avatarURL,
      name: userObj.name,
      totalAnswered: Object.keys(userObj.answers).length,
      totalCreated: userObj.questions.length
    });
  }

  usersSummary.sort(function (a, b) {
    return (b.totalAnswered + b.totalCreated) - (a.totalAnswered + a.totalCreated)
  });

  return {
    usersSummary
  };
}

export default connect(mapStateToProps)(LeaderBoard);