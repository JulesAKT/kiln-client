import React from "react";
//import { Text, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { createKiln } from "../actions";
import KilnForm from "./KilnForm";

const KilnCreatePage = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (formValues) => {
    dispatch(createKiln(formValues));
  };

  return (
    <div>
      <KilnForm
        onSubmit={handleSubmit}
        initialValues={{
          manufacturer: "Paragon",
          name: "",
          timed_controller: false,
          controller: "dumb",
          ambient_temperature: "16",
          controller_username: "",
          controller_password: "",
          controller_serial: "",
        }}
      />
    </div>
  );
};

export default KilnCreatePage;
