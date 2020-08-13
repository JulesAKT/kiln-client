import React, { Component } from "react";
import { Card, Button, Form } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../helpers/formHelpers";

class SegmentForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    //let segment = this.props;
    return (
      <div>
        <Form error onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Card>
            <Field
              name="name"
              component={Input}
              label="Segment Name"
              keyboardType="default"
            />
            <Field
              name="rate"
              component={Input}
              label="Rate"
              keyboardType="number-pad"
            />
            <Field
              name="temperature"
              component={Input}
              label="Temperature"
              keyboardType="number-pad"
            />
            <Field
              name="hold"
              component={Input}
              label="Hold Time (mins)"
              keyboardType="number-pad"
            />
          </Card>
          <Card>
            <Button type="submit">Update</Button>
          </Card>
        </Form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Required";
  }
  if (!formValues.rate) {
    errors.rate = "Required";
  }
  if (!formValues.temperature) {
    errors.temperature = "Required";
  }
  if (!formValues.hold) {
    errors.hold = "Required";
  }
  // Todo: Add additional validation.
  return errors;
};

export default reduxForm({ form: "segmentForm", validate })(SegmentForm);
