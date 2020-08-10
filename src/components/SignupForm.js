import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../helpers/formHelpers";

class SignupForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="email" component={Input} label="Email Address" />
        <Field
          name="password"
          type="password"
          component={Input}
          label="Password"
        />
        <ul>
          <li>
            Your password can't be too similar to your other personal
            information.
          </li>
          <li>Your password must contain at least 8 characters</li>
          <li>Your password can't be a commonly used password</li>
          <li>Your password can't be entirely numeric</li>
        </ul>
        <Field
          name="password2"
          type="password"
          component={Input}
          label="Password confirmation"
        />

        <button className="ui button primary" type="submit">
          Sign Up
        </button>
      </form>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "Required";
  }
  if (!formValues.email) {
    errors.email = "Required";
  }
  if (!formValues.password) {
    errors.password = "Required";
  }
  if (formValues.password !== formValues.password2) {
    errors.password = "Passwords must match";
  }
  return errors;
};

export default reduxForm({ form: "signupForm", validate })(SignupForm);
