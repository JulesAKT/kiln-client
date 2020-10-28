import React from "react";
import { Segment, Button, Form, List } from "semantic-ui-react";

import { Field, FieldArray, reduxForm } from "redux-form";
import useFirebaseKilns from "../hooks/useFirebaseKilns";
import {
  Input,
  renderFieldArray,
  Select,
  renderStars,
  TextArea,
  ImageInput,
} from "../helpers/formHelpers";

const ProjectForm = (props) => {
  const kilns = useFirebaseKilns();
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
  ];

  return (
    <>
      <Form error onSubmit={props.handleSubmit}>
        <div>
          <Segment>
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
              label="Depth (mm)"
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
  */}
            <FieldArray
              name="photos"
              component={renderFieldArray}
              innerComponent={renderImageField}
            />

            <Field name="notes" component={TextArea} label="Notes" />

            <Button type="submit">Update</Button>
          </Segment>
        </div>
      </Form>
    </>
  );
};

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

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Required";
  }
  // Todo: Add additional validation.
  return errors;
};

export default reduxForm({ form: "projectForm", validate })(ProjectForm);
