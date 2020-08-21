import React, { Component } from "react";

import { Field, reduxForm } from "redux-form";
import { tinyRenderInput } from "../helpers/formHelpers";

class FiringForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="name" component={tinyRenderInput} label="Firing Name" />
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Required";
  }
  // Todo: Add additional validation.
  return errors;
};

export default reduxForm({ form: "firingForm", validate })(FiringForm);
