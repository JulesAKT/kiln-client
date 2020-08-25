import React from "react";
import { useDispatch } from "react-redux";
import KilnForm from "./KilnForm";
import { editKiln } from "../actions";

import useFirebaseKiln from "../hooks/useFirebaseKiln";

const KilnEditPage = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const handleSubmit = (formValues) => {
    dispatch(editKiln(id, formValues));
  };

  const kiln = useFirebaseKiln(id);
  if (!kiln) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <KilnForm onSubmit={handleSubmit} initialValues={kiln} />
    </div>
  );
};

export default KilnEditPage;