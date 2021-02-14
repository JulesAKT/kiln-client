import React, { Component } from "react";
import { connect } from "react-redux";
import { attemptLogin } from "../actions";
import { Container, Header, Button, Divider } from "semantic-ui-react";

import LoginForm from "./LoginForm";
import { signInWithGoogle } from "../api/firebase";
import { signInWithApple } from "../api/firebase";

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
          <Button onClick={signInWithGoogle}>Sign In With Google</Button>
          <Button onClick={signInWithApple}>Sign In With Apple</Button>
          <Header as="h3">
            New to KilnHelper? Download the KilnHelper app on the Apple App
            Store or Google Play Store to create an account.
          </Header>
          <a href="https://apps.apple.com/gb/app/kiln-helper/id1506041444">
            <img
              src={require("../assets/app_store_download.svg").default}
              alt="Download on the App Store"
              height={50}
            />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.mrtickle.kiln&utm_source=kiln-web&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
            <img
              src={require("../assets/google-play-badge-cropped.png").default}
              alt="Get it on Google Play"
              height={50}
              style={{ marginLeft: "10px" }}
            />
          </a>

          {/*<Header as="h3">
            Forgotten your password?{" "}
            <Link to="/reset-user">Reset Password</Link>
    </Header>*/}
          <Divider />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = null;

export default connect(mapStateToProps, { attemptLogin })(LoginPage);
