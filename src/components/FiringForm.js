import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

import { Field, reduxForm } from "redux-form";
import { Input } from "../helpers/formHelpers";

class FiringForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      //  <Form error onSubmit={this.props.handleSubmit(this.onSubmit)}>
      //        <Card fluid color="red">
      //          <Card.Header>
      <div>
        <Card>
          <Field name="name" component={Input} label="Firing Name" />
        </Card>
        <Card>
          <Button onClick={this.props.handleSubmit}>Update</Button>
        </Card>
      </div>
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
