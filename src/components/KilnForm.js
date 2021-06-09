import React from "react";

//import { Card, Button, Tooltip, Icon } from "react-native-elements";
import { Segment, Button, Form, Header } from "semantic-ui-react";

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
    controller: yup.string().required(),
    controller_username: yup.string().when("controller", {
      is: (controller) => controller === "bartlett_genesis",
      then: yup.string().required("Field is required"),
    }),
    controller_password: yup.string().when("controller", {
      is: (controller) => controller === "bartlett_genesis",
      then: yup.string().required("Field is required"),
    }),
    controller_serial: yup.string().when("controller", {
      is: (controller) => controller === "bartlett_genesis",
      then: yup.string().required("Field is required"),
    }),
  });

  const { control, handleSubmit, errors, formState, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  //const nameRef = useRef();
  //const manufacturerRef = useRef();
  //const timedControllerRef = useRef();

  const kilnTypes = [
    { label: "Cone Art", value: "Cone Art" },
    { label: "Cress", value: "Cress" },
    { label: "Cromartie", value: "Cromartie" },
    { label: "Evenheat", value: "Evenheat" },
    { label: "Jen-Ken", value: "Jen-Ken" },
    { label: "Kilncare", value: "Kilncare" },
    { label: "Nabertherm", value: "Nabertherm" },
    { label: "Northern", value: "Northern" },
    { label: "Olympic", value: "Olympic" },
    { label: "Paragon", value: "Paragon" },
    { label: "Skutt", value: "Skutt" },
    { label: "Rohde", value: "Rohde" },
  ];

  const controllerTypes = [
    { label: "Built-In/Default", value: "dumb" },
    { label: "Bartlett Genesis", value: "bartlett_genesis" },
  ];

  const timed_enabled = watch(
    "timed_controller",
    initialValues.timed_controller
  );

  const controller_watch = watch("controller", initialValues.controller);

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
        <Select
          control={control}
          errors={errors}
          defaultValue={initialValues.controller}
          name="controller"
          label="Controller"
          errorMessage={errors.controller && "This field is required"}
          items={controllerTypes}
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
        {controller_watch === "bartlett_genesis" && (
          <>
            <Header size="small">
              Intelligent Controller Selected. Please Provide Additional
              Information:
            </Header>
            <Input
              control={control}
              errors={errors}
              defaultValue={initialValues.controller_username}
              name="controller_username"
              label="Bartlett Username"
              errorMessage={
                errors.controller_username && "This Field is Required"
              }
            />
            <Input
              control={control}
              errors={errors}
              defaultValue={initialValues.controller_password}
              name="controller_password"
              label="Bartlett Password"
              type="password"
              errorMessage={
                errors.controller_password && "This Field is Required"
              }
            />
            <Input
              control={control}
              errors={errors}
              defaultValue={initialValues.controller_serial}
              name="controller_serial"
              label="Genesis Controller Serial Number"
              errorMessage={
                errors.controller_serial && "This Field is Required"
              }
            />
            <i>
              Find the Serial Number for your kiln by pressing Menu &gt; Data
              Menu &gt; Kiln Info and enter them above.
            </i>
            <p />
          </>
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
