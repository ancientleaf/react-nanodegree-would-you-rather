import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Page Not Found</h1>
          <p>
            Go back to <NavLink to={'/'}>Homepage</NavLink>
          </p>
      </div>
    )
  }
}

export default NotFound;