import React, { useRef } from "react";
import { Segment, Button, Form, List, Card, Image } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { glassImage, kilnLogo } from "../helpers/logoHelpers";
import { correctlySizedPhoto } from "../helpers/photoHelpers";
import * as yup from "yup";

//import { Field, FieldArray, reduxForm } from "redux-form";
import useFirebaseKilns from "../hooks/useFirebaseKilns";
import {
  HookInput as Input,
  renderFieldArray,
  HookSelect as Select,
  HookStars as Stars,
  renderStars,
  TextArea,
  HookImageInput as ImageInput,
} from "../helpers/formHelpers";
import { findSuitablePhoto } from "../helpers/photoHelpers";

const ProjectForm = (props) => {
  const kilns = useFirebaseKilns();

  const schema = yup.object().shape({
    name: yup.string().required(),
    //width: yup.string().required(),
    //depth: yup.string().required(),
    thickness: yup.string().required(),
  });

  const initialValues = props.initialValues;
  console.log(props);
  const { register, control, handleSubmit, errors, formState, watch } = useForm(
    {
      resolver: yupResolver(schema),
    }
  );
  const currentUnit = watch("length_unit") || initialValues.length_unit || "mm";
  console.log(currentUnit);
  const glassType = watch("glass") || initialValues.glass;
  const kiln = watch("kiln");

  const nameRef = useRef();
  const widthRef = useRef();
  const depthRef = useRef();
  const thicknessRef = useRef();
  const starsRef = useRef();
  const kilnRef = useRef();
  const glassRef = useRef();
  const notesRef = useRef();
  const lengthUnitRef = useRef();

  if (!kilns) {
    return <div>Loading...</div>;
  }

  const kiln_array = Object.values(kilns);

  const kiln_selections = kiln_array.map((kiln) => {
    return { label: kiln.name, value: kiln.id };
  });
  //console.log("Kiln Selections:");
  //console.log(kiln_selections);

  const glasstypes = [
    { label: "Bullseye", value: "Bullseye" },
    { label: "Spectrum", value: "Spectrum" },
    { label: "Bottle", value: "Bottle" },
    { label: "Float", value: "Float" },
  ];

  return (
    <>
      <Form onSubmit={handleSubmit(props.onSubmit)}>
        <div>
          <Segment>
            <Input
              control={control}
              errors={errors}
              defaultValue={initialValues.name}
              name="name"
              label="Project Name"
              fieldRef={nameRef}
              nextFieldRef={widthRef}
            />
            <Form.Group inline>
              <Input
                control={control}
                errors={errors}
                defaultValue={initialValues.width}
                name="width"
                label={`Width (${currentUnit})`}
                keyboardType="number-pad"
                fieldRef={widthRef}
                nextFieldRef={depthRef}
              />
              <Input
                control={control}
                errors={errors}
                defaultValue={initialValues.depth}
                name="depth"
                label={`Height (${currentUnit})`}
                keyboardType="number-pad"
                fieldRef={depthRef}
                nextFieldRef={thicknessRef}
              />
              <Input
                control={control}
                errors={errors}
                defaultValue={initialValues.thickness}
                name="thickness"
                label={`Thickness (${currentUnit})`}
                keyboardType="number-pad"
                fieldRef={thicknessRef}

                //nextFieldRef={kilnRef}
              />
            </Form.Group>
            <Stars
              control={control}
              errors={errors}
              name="stars"
              label="Stars"
              defaultValue={initialValues.stars}
              fieldRef={starsRef}
            />
            <Select
              control={control}
              errors={errors}
              name="length_unit"
              label="Sizes are in"
              defaultValue={initialValues.length_unit}
              items={[
                { label: "Millimetres", value: "mm" },
                { label: "Inches", value: "in" },
              ]}
              fieldRef={lengthUnitRef}
            />
            <Form.Group inline>
              <Select
                control={control}
                errors={errors}
                defaultValue={initialValues.kiln}
                name="kiln"
                label="Kiln"
                items={kiln_selections}
                fieldRef={kilnRef}
              />
              <span>
                <Image avatar src={kilnLogo(kilns[kiln]?.manufacturer)} />
              </span>
            </Form.Group>

            <Form.Group inline>
              <Select
                control={control}
                errors={errors}
                defaultValue={initialValues.glass}
                name="glass"
                label="Glass Type"
                items={glasstypes}
                fieldRef={glassRef}
              />

              <span>
                <Image avatar src={glassImage(glassType)} />
              </span>
            </Form.Group>

            <Input
              control={control}
              errors={errors}
              defaultValue={initialValues.notes}
              name="notes"
              label="Notes"
              multiline={true}
              numberOfLines={8}
              fieldRef={notesRef}
              //submitOnReturn={handleSubmit(onSubmit)}
            />
          </Segment>
        </div>
        <Button type="submit">Update</Button>
      </Form>
    </>
  );
};
/*
const renderImageField = (member, index, fields) => (
  <List.Item key={index}>
    <Field name={`${member}.photo`} component={ImageInput} />

    <List.Content>
      <Field
        name={`${member}.type`}
        component={Select}
        items={[
          { label: "Before", value: "Before" },
          { label: "During", value: "During" },
          { label: "After", value: "After" },
        ]}
      />
      <button type="button" onClick={() => fields.remove(index)}>
        Delete
      </button>
    </List.Content>
  </List.Item>
);
*/
export default ProjectForm;

/* 
const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Required";
  }
  // Todo: Add additional validation.
  return errors;
};
*/

/* 

            
            <Field
              name="name"
              component={Input}
              label="Project Name"
              keyboardType="default"
            />
            <Field
              name="width"
              component={Input}
              label="Width (mm)"
              keyboardType="number-pad"
            />
            <Field
              name="depth"
              component={Input}
              label="Height (mm)"
              keyboardType="number-pad"
            />
            <Field
              name="thickness"
              component={Input}
              label="Thickness (mm)"
              keyboardType="number-pad"
            />
            <Field name="stars" component={renderStars} label="Stars" />

            <Field
              name="kiln"
              component={Select}
              label="Kiln"
              items={kiln_selections}
            />

            <Field
              name="glass"
              component={Select}
              label="Glass Type"
              items={glasstypes}
            />
            {/*}          <Field
            name="photo"
            component={ImageInput}
            type="file"
            label="Photo"
          />
  
  <FieldArray
  name="photos"
  component={renderFieldArray}
  innerComponent={renderImageField}
/>

<Field name="notes" component={TextArea} label="Notes" />

<Button type="submit">Update</Button>
*/
