import React, { Component } from "react";

import { Field, reduxForm } from "redux-form";
import { Form, Button } from "semantic-ui-react";
import { tinyRenderInput, TextArea } from "../helpers/formHelpers";

class FiringForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form error onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="name" component={tinyRenderInput} label="Firing Name" />
        <Field name="notes" component={TextArea} label="Notes" />
        <Button type="submit">Update</Button>
      </Form>
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
