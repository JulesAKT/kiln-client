import React, { Component } from "react";
import { connect } from "react-redux";
import { attemptSignup } from "../actions";
import { Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";

class SignupPage extends Component {
  onSubmit = (formValues) => {
    this.props.attemptSignup(formValues);
  };

  render() {
    return (
      <div>
        <Container text={true}>
          <Header as="h1">KilnHelper Signup</Header>
          <SignupForm onSubmit={this.onSubmit} />
          <Header as="h3">
            Existing User? <Link to="/login">Login</Link>
          </Header>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = null;

export default connect(mapStateToProps, { attemptSignup })(SignupPage);
