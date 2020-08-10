import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../actions";

class LoginButton extends Component {
  attemptSignOut = () => {
    this.props.signOut();
  };

  render() {
    if (this.props.loggedIn) {
      return (
        <button className="ui button negative" onClick={this.attemptSignOut}>
          Logout
        </button>
      );
    } else {
      return (
        <Link to="/login">
          <button className="ui button primary">Login</button>
        </Link>
      );
    }
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.auth.loggedIn };
};

export default connect(mapStateToProps, { signOut })(LoginButton);
