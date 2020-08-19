import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../actions";
import { isLoaded } from "react-redux-firebase";
import { isEmpty } from "lodash";

class LoginButton extends Component {
  attemptSignOut = () => {
    this.props.signOut();
  };

  render() {
    if (
      isLoaded(this.props.auth) &&
      !isEmpty(this.props.auth) &&
      this.props.auth.uid
    ) {
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

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps, { signOut })(LoginButton);
