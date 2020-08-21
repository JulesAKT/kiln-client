import React, { Component } from "react";
/* import {
  Card,
  Grid,
  Message,
  Icon,
  Image,
  Form,
  Button
} from "semantic-ui-react";
*/
import { Card, Button, Form } from "semantic-ui-react";

import { Field, reduxForm } from "redux-form";

import { Input, Select } from "../helpers/formHelpers";

class KilnForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    const kilnTypes = [
      { label: "Evenheat", value: "Evenheat" },
      { label: "Kilncare", value: "Kilncare" },
      { label: "Nabatherm", value: "Nabatherm" },
      { label: "Northern", value: "Northern" },
      { label: "Olympic", value: "Olympic" },
      { label: "Paragon", value: "Paragon" },
      { label: "Skutt", value: "Skutt" },
    ];

    //console.log("kilnTypes = ");
    //console.log(kilnTypes);

    return (
      <Form error onSubmit={this.props.handleSubmit}>
        <div>
          <Card>
            <Field name="name" component={Input} label="Kiln Name" />
          </Card>
          <Card>
            <Field
              name="manufacturer"
              component={Select}
              label="Manufacturer"
              items={kilnTypes}
            />
          </Card>
          <Card>
            <Button type="submit">Update</Button>
          </Card>
        </div>
      </Form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  //console.log("Validating Kiln Form");
  if (!formValues.name) {
    errors.name = "Required";
    //console.log("Threw error - name is required");
  }
  // Todo: Add additional validation.
  return errors;
};

export default reduxForm({ form: "kilnForm", validate })(KilnForm);
