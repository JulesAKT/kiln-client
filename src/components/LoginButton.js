import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
//import { signOut } from "../actions";
import { isLoaded } from "react-redux-firebase";
import { isEmpty } from "lodash";
import UserMenu from "./UserMenu";
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
      return <UserMenu trigger={<Icon name="user" />} />;
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

export default connect(mapStateToProps)(LoginButton);
