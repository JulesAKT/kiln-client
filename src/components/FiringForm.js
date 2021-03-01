import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Card, Button, Form, Segment } from "semantic-ui-react";

import { Field, reduxForm } from "redux-form";
import { HookInput as Input, DatePicker } from "../helpers/formHelpers";

const FiringForm = ({ initialValues, onSubmit }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  const { control, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          errors={errors}
          name="name"
          label="Firing Name"
          errorMessage={errors.name && "This field is required"}
        />
        <DatePicker
          control={control}
          error={errors}
          name="date"
          label="Firing Date"
          errorMessage={errors.date}
        />
        <Input
          control={control}
          errors={errors}
          name="notes"
          label="Notes"
          errorMessage={errors.name && "This field is required"}
          multiline={true}
          numberOfLines={8}
        />
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

export default FiringForm;
