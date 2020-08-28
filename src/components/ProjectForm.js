import React from "react";
import { Card, Button, Form } from "semantic-ui-react";

import { Field, reduxForm } from "redux-form";
import useFirebaseKilns from "../hooks/useFirebaseKilns";
import {
  Input,
  FileInput,
  Select,
  renderStars,
  TextArea,
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
    <Form error onSubmit={props.handleSubmit}>
      <div>
        <Card>
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
          <Field name="photo" component={FileInput} type="file" label="Photo" />
          <Field name="notes" component={TextArea} label="Notes" />
        </Card>
        <Card>
          <Button type="submit">Update</Button>
        </Card>
      </div>
    </Form>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Required";
  }
  // Todo: Add additional validation.
  return errors;
};

export default reduxForm({ form: "projectForm", validate })(ProjectForm);
