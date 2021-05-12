import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Button, Form, Segment, Icon } from "semantic-ui-react";
import useFirebaseGlassData from "../hooks/useFirebaseGlassData";
import { getHexColor } from "../helpers/glassHelpers";

import {
  HookInput as Input,
  HookDropdown as Dropdown,
} from "../helpers/formHelpers";

const myRenderLabel = (item) => {
  console.log("RenderItem");
  console.log(item);
  return { content: `<>!!!{item.text}</>` };
};

const getGlassDataDropdownOptionsFromInventory = (inventory) => {
  console.log(inventory);
  if (!inventory)
    return [{ key: "unknown", text: "No Glass Inventory Found", value: "" }];
  //console.log(inventory);
  return Object.keys(inventory).map((key) => {
    //console.log(inventory[key]);
    const { color, multicolored, description, type } = inventory[key];
    return {
      key: key,
      text: `${key} - ${description}:${type}`,
      value: `${key}`,
      color: getHexColor(color.rgb),
      content: (
        <>
          <span style={{ color: getHexColor(color.rgb) }}>
            <Icon name="square full" />
          </span>
          {`${key} - ${description}: ${type}`}
        </>
      ),
    };
  });
};

const MaterialForm = ({ initialValues, onSubmit, glass_type }) => {
  const schema = yup.object().shape({});

  const { control, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });
  console.log(`Glasstype: ${glass_type}`);
  const glass_data = useFirebaseGlassData(glass_type);
  //console.log(glass_data);
  /* if (!glass_data) {
    return <div>Loading...</div>;
  } */
  const options = getGlassDataDropdownOptionsFromInventory(
    glass_data?.inventory
  );
  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          errors={errors}
          name="description"
          label="Description"
        />
        <Dropdown
          control={control}
          errors={errors}
          name="glass_reference"
          label={`${glass_type} Glass Reference`}
          defaultValue={initialValues.glass_reference}
          search
          clearable
          options={options}
          placeholder={`Select a ${glass_type} item`}
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

export default MaterialForm;

/* Old Options: 

{[
            {
              key: "AAAA",
              text: "AAAA Arctic Blue",
              value: "AAAA Arctic Blue",
            },
            { key: "BBBB", text: "BBBB Bronze", value: "BBBB Bronze" },
          ]}

*/
