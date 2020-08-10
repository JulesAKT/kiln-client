import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

class SignedupPage extends Component {
  render() {
    return (
      <div>
        <Container text={true}>
          <Header as="h1">Signup Successful</Header>
          You have successfully signed up. In order to log in, you will need to
          verify the email address that you have provided. Please check your
          email (including any Spam folders), and click on the link provided.
          Once that's done, then please click <Link to="/login">Here</Link> to
          login.
        </Container>
      </div>
    );
  }
}

export default SignedupPage;
