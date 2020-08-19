import React, { Component } from "react";
import { connect } from "react-redux";
import { attemptLogin } from "../actions";
import { Container, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { signInWithGoogle } from "../api/firebase";

class LoginPage extends Component {
  onSubmit = (formValues) => {
    this.props.attemptLogin(formValues);
  };

  render() {
    return (
      <div>
        <Container text={true}>
          <Header as="h1">KilnHelper</Header>
          <LoginForm onSubmit={this.onSubmit} />
          <Header as="h3">
            New to HomeHub? <Link to="/signup">Sign Up</Link>
          </Header>
          <Header as="h3">
            Forgotten your password?{" "}
            <Link to="/reset-user">Reset Password</Link>
          </Header>
          <Button onClick={signInWithGoogle}>Sign In With Google</Button>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = null;

export default connect(mapStateToProps, { attemptLogin })(LoginPage);
