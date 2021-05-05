import React, { useRef } from "react";
import { Segment, Button, Form, Image } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { glassIcon, kilnLogo } from "../helpers/logoHelpers";
import * as yup from "yup";

import useFirebaseKilns from "../hooks/useFirebaseKilns";
import {
  HookInput as Input,
  HookSelect as Select,
  HookStars as Stars,
} from "../helpers/formHelpers";

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
  const { control, handleSubmit, errors, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const currentUnit = watch("length_unit", initialValues.length_unit) || "mm";
  console.log(currentUnit);
  const glassType = watch("glass", initialValues.glass);
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
    console.log(kiln);
    return { label: kiln?.name, value: kiln?.id };
  });
  //console.log("Kiln Selections:");
  //console.log(kiln_selections);

  const glasstypes = [
    { label: "Bullseye", value: "Bullseye" },
    { label: "Spectrum", value: "Spectrum" },
    { label: "Wissmach", value: "Wissmach" },
    { label: "Baoili COE 85", value: "Baoli COE 85" },
    { label: "Baoili COE 90", value: "Baoli COE 90" },
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
                label={`Width`}
                rightLabel={currentUnit}
                keyboardType="number-pad"
                fieldRef={widthRef}
                nextFieldRef={depthRef}
              />
              <Input
                control={control}
                errors={errors}
                defaultValue={initialValues.depth}
                name="depth"
                label={`Height`}
                rightLabel={currentUnit}
                keyboardType="number-pad"
                fieldRef={depthRef}
                nextFieldRef={thicknessRef}
              />
              <Input
                control={control}
                errors={errors}
                defaultValue={initialValues.thickness}
                name="thickness"
                label={`Thickness`}
                rightLabel={currentUnit}
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
                labelStyle={{ width: "75px" }}
                selectStyle={{ width: "200px" }}
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
                labelStyle={{ width: "75px" }}
                selectStyle={{ width: "200px" }}
              />

              <span>{glassIcon(glassType)}</span>
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

export default ProjectForm;
