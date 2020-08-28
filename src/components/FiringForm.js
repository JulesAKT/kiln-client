import React, { Component } from "react";
import { Card, Button, Form } from "semantic-ui-react";

import { Field, reduxForm } from "redux-form";
import { Input, TextArea } from "../helpers/formHelpers";

class FiringForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form error onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Card>
          <Field name="name" component={Input} label="Firing Name" />
        </Card>
        <Card>
          <Field name="notes" component={TextArea} label="Notes" />
        </Card>
        <Card>
          <Button type="submit">Update</Button>
        </Card>
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
