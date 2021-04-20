import React from "react";

//import { Card, Button, Tooltip, Icon } from "react-native-elements";
import { Segment, Button, Form } from "semantic-ui-react";

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

  //const nameRef = useRef();
  //const manufacturerRef = useRef();
  //const timedControllerRef = useRef();

  const kilnTypes = [
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

  const timed_enabled = watch(
    "timed_controller",
    initialValues.timed_controller
  );

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
