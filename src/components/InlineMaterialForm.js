import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Button, Form, Icon } from "semantic-ui-react";
import useFirebaseGlassData from "../hooks/useFirebaseGlassData";
import { getHexColor, glasstypes } from "../helpers/glassHelpers";

import {
  HookInput as Input,
  HookDropdown as Dropdown,
  HookSelect as Select,
} from "../helpers/formHelpers";

/* const myRenderLabel = (item) => {
  console.log("RenderItem");
  console.log(item);
  return { content: `<>!!!{item.text}</>` };
};
*/

const getGlassDataDropdownOptionsFromInventory = (inventory) => {
  //console.log(inventory);
  if (!inventory)
    return [{ key: "unknown", text: "No Glass Inventory Found", value: "" }];
  //console.log(inventory);
  return Object.keys(inventory).map((key) => {
    //console.log(inventory[key]);
    const { color, description, type } = inventory[key];
    return {
      key: key,
      text: `${key} - ${description}:${type}`,
      value: `${key}`,
      color: color?.rgb && getHexColor(color.rgb),
      content: (
        <>
          <span style={color?.rgb && { color: getHexColor(color.rgb) }}>
            <Icon name="square full" />
          </span>
          {`${key} - ${description}: ${type}`}
        </>
      ),
    };
  });
};

const InlineMaterialForm = ({ initialValues, onSubmit }) => {
  const schema = yup.object().shape({
    glass_type: yup.string().required(),
    count: yup.number().required().positive().integer(),
  });

  const { control, handleSubmit, errors, formState, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const glass_type = watch("glass_type", initialValues.glass_type);
  const glass_data = useFirebaseGlassData(glass_type);
  console.log(`Glasstype: ${glass_type}`);
  //console.log(glass_data);
  /* if (!glass_data) {
    return <div>Loading...</div>;
  } */
  const options = getGlassDataDropdownOptionsFromInventory(
    glass_data?.inventory
  );
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Select
          control={control}
          errors={errors}
          name="glass_type"
          label="Manufacturer"
          defaultValue={initialValues.manufacturer}
          items={glasstypes}
        />
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
        <Input
          control={control}
          errors={errors}
          name="count"
          label="Number of Items"
          defaultValue={initialValues.count}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!formState.isDirty || formState.isSubmitting}
          loading={formState.isSubmitting}
        >
          Add
        </Button>
      </Form>
    </div>
  );
};

export default InlineMaterialForm;
