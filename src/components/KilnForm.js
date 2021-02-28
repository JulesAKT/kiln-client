import React, { useRef } from "react";

//import { Card, Button, Tooltip, Icon } from "react-native-elements";
import { Segment, Button, Form, Icon, Popup } from "semantic-ui-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import {
  HookInput as Input,
  HookSelect as Select,
  CheckBox,
} from "../helpers/formHelpers";

const KilnForm = ({ initialValues, onSubmit }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    manufacturer: yup.string().required(),
  });

  const { control, handleSubmit, errors, formState, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const nameRef = useRef();
  const manufacturerRef = useRef();
  const timedControllerRef = useRef();

  const kilnTypes = [
    { label: "Paragon", value: "Paragon" },
    { label: "Olympic", value: "Olympic" },
    { label: "Kilncare", value: "Kilncare" },
    { label: "Nabertherm", value: "Nabertherm" },
    { label: "Skutt", value: "Skutt" },
    { label: "Northern", value: "Northern" },
    { label: "Evenheat", value: "Evenheat" },
    { label: "Rohde", value: "Rohde" },
    { label: "Jen-Ken", value: "Jen-Ken" },
    { label: "Cress", value: "Cress" },
  ];
  const timed_enabled = watch("timed_controller");

  console.log(timed_enabled);
  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          errors={errors}
          defaultValue={initialValues.name}
          name="name"
          label="Kiln Name"
          errorMessage={errors.name && "This Field is required"}
        />
        <Select
          control={control}
          errors={errors}
          defaultValue={initialValues.manufacturer}
          name="manufacturer"
          label="Manufacturer"
          errorMessage={errors.manufacturer && "This field is required"}
          items={kilnTypes}
        />
        <CheckBox
          control={control}
          errors={errors}
          defaultValue={initialValues.timed_controller}
          name="timed_controller"
          label="Use time rather than target temperature"
        />
        {timed_enabled && (
          <Input
            control={control}
            errors={errors}
            defaultValue={initialValues.ambient_temperature}
            name="ambient_temperature"
            label="Ambient Temperature"
            errorMessage={
              errors.ambient_temperature && "This Field is required"
            }
          />
        )}
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!formState.isDirty || formState.isSubmitting}
          loading={formState.isSubmitting}
        >
          Update
        </Button>
      </Form>
    </Segment>
  );
};

export default KilnForm;

/*

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
      { label: "Nabertherm", value: "Nabertherm" },
      { label: "Northern", value: "Northern" },
      { label: "Olympic", value: "Olympic" },
      { label: "Paragon", value: "Paragon" },
      { label: "Skutt", value: "Skutt" },
      { label: "Rohde", value: "Rohde" },
      { label: "Jen-Ken", value: "Jen-Ken" },
      { label: "Cress", value: "Cress" },
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
 */
