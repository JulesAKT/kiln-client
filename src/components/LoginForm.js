import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../helpers/formHelpers";

class LoginForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="email" component={Input} label="Email" />
        <Field
          name="password"
          type="password"
          component={Input}
          label="Password"
        />
        <button className="ui button primary" type="submit">
          Login
        </button>
      </form>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "Required";
  }
  // eslint-disable-next-line
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(formValues.email) === false) {
    errors.email = "Invalid Email Address";
  }

  if (!formValues.password) {
    errors.password = "Required";
  }
  return errors;
};

export default reduxForm({ form: "loginForm", validate })(LoginForm);
