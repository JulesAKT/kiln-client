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
        initialValues={{ manufacturer: "Paragon" }}
      />
    </div>
  );
};

export default KilnCreatePage;
